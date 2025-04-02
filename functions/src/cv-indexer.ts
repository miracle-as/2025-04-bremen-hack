/* eslint-disable max-len */
// Import Firebase Admin initialization first
import "./firebase-admin";

// Import the Genkit core libraries and plugins.
import {genkit, z} from "genkit";
import {googleAI, textEmbedding004} from "@genkit-ai/googleai";
import {getStorage} from "firebase-admin/storage";
import {FieldValue, getFirestore} from "firebase-admin/firestore";
import {Document} from "genkit/retriever";
import {chunk} from 'llm-chunk';
import pdf from 'pdf-parse';

import {onCallGenkit} from "firebase-functions/https";
import {defineSecret} from "firebase-functions/params";
import {logger} from "firebase-functions/v2";
import {defineFirestoreRetriever} from "@genkit-ai/firebase";

// Get Firestore instance (Firebase Admin already initialized)
const db = getFirestore();

const apiKey = defineSecret("GOOGLE_GENAI_API_KEY");

const chunkingConfig = {
    minLength: 1000,
    maxLength: 2000,
    splitter: 'sentence',
    overlap: 100,
    delimiters: '',
  } as any;

const indexConfig = {
    collection: 'cv-embeddings',
    contentField: 'text',
    vectorField: 'embedding',
    embedder: textEmbedding004,
}

const ai = genkit({
  plugins: [
    googleAI(),
  ],
});

const retriever = defineFirestoreRetriever(ai, {
  name: 'exampleRetriever',
  firestore: db,
  distanceResultField: 'distance',
  collection: 'documents',
  contentField: 'text', // Field containing document content
  vectorField: 'embedding', // Field containing vector embeddings
  embedder: textEmbedding004, // Embedder to generate embeddings
  distanceMeasure: 'COSINE', // Default is 'COSINE'; other options: 'EUCLIDEAN', 'DOT_PRODUCT'
});

// Define the indexer using Firestore
const cvIndexer = ai.defineIndexer(
  {
    name: 'cv-indexer',
    embedderInfo: {
      label: 'CV Embeddings',
      supports: {
        input: ['text'],
        multilingual: true,
      },
    },
  },
  async (docs) => {
    // Embed documents using Gemini and store in Firestore
    await Promise.all(
      docs.map(async (doc) => {
        const embedding = (await ai.embed({
            embedder: indexConfig.embedder,
            content: doc.text,
        }))[0].embedding;
        // const embedding = await gemini15Flash.embed(doc.text);
        // Store in Firestore
        await db.collection(indexConfig.collection).add({
          name: doc.metadata?.name,
          email: doc.metadata?.email,
          fileName: doc.metadata?.fileName,
          uploadDate: doc.metadata?.uploadDate,
          [indexConfig.vectorField]: FieldValue.vector(embedding),
          [indexConfig.contentField]: doc.text,
        })
      })
    );
  }
);

async function extractTextFromPdf(input: Buffer) {
  const data = await pdf(input);
  return data.text;
}

export const indexCVFlow = ai.defineFlow(
  {
    name: 'indexCVFlow',
    inputSchema: z.object({
      name: z.any().describe('Name of the cv'),
      email: z.any().describe('Email of the cv'),
      fileName: z.any().describe('File name of the cv'),
      fileUrl: z.any().describe('File URL of the cv'),
      uploadDate: z.any().describe('Upload date of the cv'),
    }),
    // inputSchema: z.string().describe('PDF file path'),
    outputSchema: z.void(),
  },
  async (employeeData: any) => {
    const storage = getStorage();
    const bucket = storage.bucket();
    
    // Download the file
    const file = bucket.file(`uploads/${employeeData.fileName}`);
    const [fileContent] = await file.download();

    // Read the pdf.
    const pdfTxt = await ai.run('extract-text', () =>
      extractTextFromPdf(fileContent)
    );

    // Divide the pdf text into segments.
    const chunks = await ai.run('chunk-it', async () =>
      chunk(pdfTxt, chunkingConfig)
    );

    // Convert chunks of text into documents to store in the index.
    const documents = chunks.map((text: string) => {
      return Document.fromText(text, { name: employeeData.name, email: employeeData.email, fileName: employeeData.fileName, uploadDate: employeeData.uploadDate });
    });

    logger.info(`Indexing ${documents.length} documents`, documents.map((doc) => doc.toJSON()));

    // Add documents to the Firestore index.
    await ai.index({
      indexer: cvIndexer,
      documents,
    });
  }
);

export const searchCVFlow = ai.defineFlow(
  {
    name: 'searchCVFlow',
    inputSchema: z.string().describe('Search query'),
    outputSchema: z.void(),
  },
  async (query: string) => {
    const docs = await ai.retrieve({
      retriever,
      query: query,
      options: {
        limit: 5, // Options: Return up to 5 documents
        // where: { category: 'example' }, // Optional: Filter by field-value pairs
        collection: 'cv-embeddings', // Optional: Override default collection
      },
    });
    logger.info(`Found ${docs.length} documents`, docs.map((doc) => doc.toJSON()));
  }
);

export const indexCV = onCallGenkit(
  {
    secrets: [apiKey],
  },
  indexCVFlow
);

export const searchCV = onCallGenkit(
  {
    secrets: [apiKey],
  },
  searchCVFlow
);