// Import Firebase Admin initialization first
import "./firebase-admin";

import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {getFirestore} from "firebase-admin/firestore";

// Get Firestore instance (Firebase Admin already initialized)
const db = getFirestore();

// Function to store employee data in Firestore
export const storeEmployeeDataFlow = onCall(async (request) => {
  try {
    const {employeeName, employeeEmail, fileName, fileUrl} = request.data;
    
    if (!employeeName || !employeeEmail || !fileName || !fileUrl) {
      throw new Error("Missing required fields");
    }
    
    const employeeData = {
      name: employeeName,
      email: employeeEmail,
      fileName: fileName,
      fileUrl: fileUrl,
      uploadDate: new Date(),
    };
    
    const docRef = await db.collection("employees").add(employeeData);
    
    logger.info("Employee data stored successfully", {
      employeeId: docRef.id,
      employeeName,
      fileName,
    });
    
    return {
      success: true,
      employeeId: docRef.id,
    };
  } catch (error) {
    logger.error("Error storing employee data", error);
    throw new Error(`Failed to store employee data: ${(error as Error).message}`);
  }
}); 