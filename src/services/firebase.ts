/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  type Firestore 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  type FirebaseStorage 
} from 'firebase/storage';
import { PortfolioData, ContactMessage } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialPortfolioData';

const LOCAL_STORAGE_PORTFOLIO_KEY = 'zza_portfolio_data_v1';
const LOCAL_STORAGE_MESSAGES_KEY = 'zza_contact_messages_v1';

function getFirebaseConfig() {
  const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  if (envApiKey && envProjectId) {
    return {
      apiKey: envApiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${envProjectId}.firebaseapp.com`,
      projectId: envProjectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${envProjectId}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    };
  }
  return null;
}

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

function initFirebaseServices() {
  const config = getFirebaseConfig();
  if (!config) return null;

  try {
    if (getApps().length === 0) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApp();
    }
    dbInstance = getFirestore(appInstance);
    storageInstance = getStorage(appInstance);
    return { app: appInstance, db: dbInstance, storage: storageInstance };
  } catch (err) {
    console.warn('Firebase initialization note:', err);
    return null;
  }
}

initFirebaseServices();

export async function getPortfolioData(): Promise<PortfolioData> {
  // Always prioritize LocalStorage for direct edits in AI Studio environment
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_PORTFOLIO_KEY);
    if (stored) {
      return { ...initialPortfolioData, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Error reading from localStorage', e);
  }

  // Fallback to initial authentic data
  return initialPortfolioData;
}

export async function submitContactMessage(msg: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  const timestamp = new Date().toISOString();
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const messageRecord: ContactMessage = {
    id,
    ...msg,
    subject: 'Contact Form Inquiry',
    timestamp,
    read: false
  };

  // 1. Try Firestore if configured
  if (dbInstance) {
    try {
      const docRef = await addDoc(collection(dbInstance, 'messages'), messageRecord);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn('Could not post to Firestore', err);
    }
  }

  // 2. Fallback to localStorage queue
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
    const list: ContactMessage[] = existingRaw ? JSON.parse(existingRaw) : [];
    list.unshift(messageRecord);
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(list));
    return { success: true, id };
  } catch (e) {
    console.error('Failed to store message locally', e);
    throw new Error('Unable to store message.');
  }
}
