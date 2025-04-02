/**
 * This file initializes Firebase Admin SDK once for the entire application
 * It should be imported first in any file that needs Firebase Admin services
 */
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

// Initialize Firebase Admin app once for the entire application
let app;
try {
  app = admin.initializeApp();
  logger.info("Firebase Admin initialized successfully");
} catch (error) {
  // If already initialized, that's fine - we'll use the existing app
  app = admin.app();
  logger.debug("Firebase Admin was already initialized, using existing app");
}

// Export the initialized app for any module that needs explicit access
export { app }; 