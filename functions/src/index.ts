 
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Import Firebase Admin initialization first
import './firebase-admin';

import {onRequest} from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import {menuSuggestion} from './genkit-sample';
import {indexCV, searchCV} from './cv-indexer';
import {storeEmployeeData} from './employee-storage';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

// export const getMenuSuggestion = onCallGenkit(async (request, response) => {
//   const {subject} = request.data;
//   const result = await menuSuggestion(subject, response);
//   return result;
// });

export const example = menuSuggestion;

export const CVIndexer = indexCV;

export const CVSearch = searchCV;

export const storeEmployee = storeEmployeeData;
