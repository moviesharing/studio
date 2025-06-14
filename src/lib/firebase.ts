
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Define the config structure for clarity
interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log the configuration to the console for debugging BEFORE any checks
console.log("Firebase Module: Raw environment variables as read by Next.js:", {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
console.log("Firebase Module: Constructed firebaseConfig object to be used for initialization:", firebaseConfig);

// CRITICAL CHECK FOR API KEY
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.trim() === "") {
  const errorMessage =
    "CRITICAL FIREBASE CONFIGURATION ERROR: NEXT_PUBLIC_FIREBASE_API_KEY is MISSING, UNDEFINED, or an EMPTY STRING. " +
    "Firebase cannot initialize without a valid API Key. " +
    "Please check your .env.local file in the project root directory. It should contain a line like: \n" +
    "NEXT_PUBLIC_FIREBASE_API_KEY=\"YOUR_ACTUAL_API_KEY_HERE\"\n" +
    "Ensure the variable name is correct, the value is your actual API key from the Firebase console, " +
    "and that you have FULLY RESTARTED your Next.js development server (e.g., Ctrl+C and then 'npm run dev') after any changes to the .env.local file.";
  console.error(errorMessage);
  // Explicitly throw an error to halt execution here if the key is missing.
  // This will be the error you see if the .env.local file is not set up correctly.
  throw new Error(errorMessage);
}

let app: FirebaseApp;

// This part will now only be reached if the API key check above passes.
if (!getApps().length) {
  try {
    console.log("Firebase Module: No existing Firebase apps detected by getApps(). Attempting to initialize a new app with the (now verified to have an API key) config...");
    app = initializeApp(firebaseConfig);
    console.log("Firebase Module: Firebase app initialized successfully via initializeApp().");
  } catch (error) {
    console.error("Firebase Module: Error during initializeApp(firebaseConfig) even after API key presence was checked (this could be other invalid config values):", error);
    // Re-throw to ensure Next.js catches and displays it.
    throw error;
  }
} else {
  console.log("Firebase Module: Existing Firebase app detected by getApps(). Retrieving it via getApp()...");
  app = getApp();
  console.log("Firebase Module: Existing Firebase app retrieved successfully via getApp().");
}

const auth: Auth = getAuth(app);

export { app, auth };
