/* eslint-disable max-len */
// Import the Genkit core libraries and plugins.
import {genkit, z} from "genkit";
import {googleAI, textEmbedding004} from "@genkit-ai/googleai";
import {getStorage} from "firebase-admin/storage";
import {FieldValue, getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";
import { Document } from "genkit/retriever";
import { chunk } from 'llm-chunk';
import pdf from 'pdf-parse';

import {onCallGenkit} from "firebase-functions/https";
import {defineSecret} from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import { defineFirestoreRetriever } from "@genkit-ai/firebase";

// Initialize Firebase Admin
const app = initializeApp();

// Initialize Firestore
const db = getFirestore(app);


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
    inputSchema: z.string().describe('PDF file path'),
    outputSchema: z.void(),
  },
  async (filePath: string) => {
    const storage = getStorage();
    const bucket = storage.bucket();
    
    // Download the file
    const file = bucket.file(filePath);
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
      return Document.fromText(text, { filePath });
    });

    logger.info(`Indexing ${documents.length} documents`, documents);

    // Add documents to the Firestore index.
    await ai.index({
      indexer: cvIndexer,
      documents,
    });
  }
);

const basicCVSchema = z.object({
  name: z.string().describe('Name of the person'),
  email: z.string().describe('Email of the person'),
  phone: z.string().describe('Phone number of the person'),
  address: z.string().describe('Address of the person'),
  education: z.string().describe('Education of the person'),
  experience: z.string().describe('Experience of the person'),
  skills: z.string().describe('Skills of the person'),
});

export const searchCVFlow = ai.defineFlow(
  {
    name: 'searchCVFlow',
    inputSchema: z.string().describe('Search query'),
    outputSchema: z.void(),
    // outputSchema: z.array(basicCVSchema),
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
    logger.info(`Found ${docs.length} documents`, docs.map((doc) => ({
      content: doc.text,
      metadata: doc.metadata
    })));
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