import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeFirestore,
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  Firestore,
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

let dbInstance: Firestore | null = null;
let isInitialized = false;

export function getFirebaseFirestore(): Firestore | null {
  if (isInitialized) return dbInstance;
  isInitialized = true;

  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      console.warn('[Firebase] Config file firebase-applet-config.json not found');
      return null;
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
    };

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

    // Initialize with the provisioned firestore database ID
    const databaseId = config.firestoreDatabaseId || '(default)';
    dbInstance = initializeFirestore(app, {}, databaseId);
    console.log(`[Firebase] Firestore successfully initialized with database ID: ${databaseId}`);
    return dbInstance;
  } catch (error) {
    console.error('[Firebase] Error initializing Firestore:', error);
    return null;
  }
}

export {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
};
