/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { 
  initializeFirestore,
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocFromServer,
  setLogLevel,
  type Firestore 
} from 'firebase/firestore';
import { 
  getAuth,
  type Auth
} from 'firebase/auth';
import { 
  getStorage, 
  type FirebaseStorage 
} from 'firebase/storage';
import { PortfolioData, ContactMessage } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialPortfolioData';
import firebaseConfig from '../../firebase-applet-config.json';

// Silence Firestore connectivity warnings in sandbox environments
setLogLevel('error');

const LOCAL_STORAGE_PORTFOLIO_KEY = 'zza_portfolio_data_v1';
const LOCAL_STORAGE_MESSAGES_KEY = 'zza_contact_messages_v1';

// Initialize Firebase App
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with provisioned firestoreDatabaseId and reliable transport
export const db: Firestore = (() => {
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
    }, firebaseConfig.firestoreDatabaseId);
  } catch {
    return getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
})();
export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);

// Operation types for Firestore ABAC and error tracking
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Handles Firestore errors with structured metadata conforming to FirestoreErrorInfo
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Validate Firestore connection on boot using getDocFromServer
 */
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'portfolio', 'main'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.log("Firestore: Client is operating in local cache mode (temporary).");
    }
  }
}
testConnection();

/**
 * Fetch portfolio data from Firestore with graceful fallback to localStorage and initial dataset
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const path = 'portfolio/main';
  try {
    const docSnap = await getDoc(doc(db, 'portfolio', 'main'));
    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<PortfolioData>;
      return { ...initialPortfolioData, ...data };
    }
  } catch (error) {
    console.warn('Could not read portfolio directly from Firestore, falling back to local store:', error);
  }

  // Check LocalStorage for client-side persistence
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_PORTFOLIO_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure projects array always retains interactive properties
      const projects = initialPortfolioData.projects.map(initProj => {
        const found = parsed.projects?.find((p: any) => p && p.id === initProj.id);
        return found 
          ? { ...initProj, ...found, isInteractive: true, interactiveType: initProj.interactiveType || found.interactiveType } 
          : initProj;
      });
      return { ...initialPortfolioData, ...parsed, projects };
    }
  } catch (e) {
    console.warn('Error reading from localStorage', e);
  }

  // Fallback to initial authentic data
  return initialPortfolioData;
}

/**
 * Submits contact message to Firestore collection '/messages' with schema verification
 */
export async function submitContactMessage(msg: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  const timestamp = new Date().toISOString();
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const messageRecord: ContactMessage = {
    id,
    name: msg.name.trim(),
    email: msg.email.trim(),
    subject: msg.subject?.trim() || 'Contact Form Inquiry',
    message: msg.message.trim(),
    timestamp,
    read: false
  };

  const path = 'messages';
  try {
    const docRef = await addDoc(collection(db, path), {
      name: messageRecord.name,
      email: messageRecord.email,
      subject: messageRecord.subject,
      message: messageRecord.message,
      timestamp: messageRecord.timestamp
    });

    // Also persist locally as a backup
    try {
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
      const list: ContactMessage[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift({ ...messageRecord, id: docRef.id });
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(list));
    } catch {
      // Non-critical local storage cache failure
    }

    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn('Firestore write error, catching and logging:', err);
    try {
      handleFirestoreError(err, OperationType.CREATE, path);
    } catch (rethrown) {
      // Local fallback in case user is offline or permissions issue
      try {
        const existingRaw = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
        const list: ContactMessage[] = existingRaw ? JSON.parse(existingRaw) : [];
        list.unshift(messageRecord);
        localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(list));
      } catch (localErr) {
        console.warn('Local storage fallback failed:', localErr);
      }
      throw rethrown;
    }
  }
}
