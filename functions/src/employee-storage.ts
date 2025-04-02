// Import Firebase Admin initialization first
import './firebase-admin';

import {onCall} from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { indexCVFlow } from './cv-indexer';
import { defineSecret } from 'firebase-functions/params';

const apiKey = defineSecret('GOOGLE_GENAI_API_KEY');

// Function to store employee data in Firestore
export const storeEmployeeData = onCall(
  {
    secrets: [apiKey],
  },
  async (request) => {
    try {
      const {employeeName, employeeEmail, fileName, fileUrl} = request.data;
      
      if (!employeeName || !employeeEmail || !fileName || !fileUrl) {
        throw new Error('Missing required fields');
      }
      
      const employeeData = {
        name: employeeName,
        email: employeeEmail,
        fileName: fileName,
        fileUrl: fileUrl,
        uploadDate: new Date().toISOString(),
      };
  
      await indexCVFlow(employeeData);
      
      logger.info('Employee data stored successfully', {
        employeeName,
        fileName,
      });
    } catch (error) {
      logger.error('Error storing employee data', error);
      throw new Error(`Failed to store employee data: ${(error as Error).message}`);
    }
  });