import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseProjectID = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY || '';

// Clean the private key (replace literal \n with actual newlines)
if (firebasePrivateKey) {
  // If the key starts and ends with double quotes from env parse, remove them
  if (firebasePrivateKey.startsWith('"') && firebasePrivateKey.endsWith('"')) {
    firebasePrivateKey = firebasePrivateKey.substring(1, firebasePrivateKey.length - 1);
  }
  firebasePrivateKey = firebasePrivateKey.replace(/\\n/g, '\n');
}

if (getApps().length === 0) {
  try {
    initializeApp({
      credential: cert({
        projectId: firebaseProjectID,
        clientEmail: firebaseClientEmail,
        privateKey: firebasePrivateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export const db = getFirestore();
