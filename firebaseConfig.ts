import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration from Google Cloud / Firebase project spontiva-dev
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBnASxV_pVxzHNrO4xFU5JpwZc-xp0US5E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "spontiva-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "spontiva-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "spontiva-dev.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "477207398104",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:477207398104:web:8c9c9bf7230f179137f9ad"
};

// Initialize Firebase safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google OAuth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Admin email check as requested
export const ADMIN_EMAIL = 'info@spontiva.nl';
export const ADMIN_EMAILS = ['info@spontiva.nl', 'info@jamaldrenthe.com'];

export const isUserAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return ADMIN_EMAILS.some(a => a.toLowerCase() === cleanEmail);
};

export {
  signInWithPopup,
  signInWithRedirect,
  firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
};
