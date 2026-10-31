import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  UserProfile, 
  TGCApplication, 
  DocumentItem, 
  InvoiceItem, 
  AnalysisReport,
  AccountType 
} from './types';
import { 
  auth, 
  db,
  googleProvider, 
  signInWithPopup, 
  firebaseSignOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  isUserAdmin,
  ADMIN_EMAIL
} from './firebaseConfig';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { DEMO_ACCOUNTS, getAllApplications, getAllInvoices, getAllReports } from './demoData';

export interface ContactRequestPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  formType: string;
  message: string;
  amount?: string | number;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  syncStatus: 'synced' | 'syncing' | 'offline';
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, company: string, accountType?: AccountType) => Promise<void>;
  loginWithDemo: (demoId: string) => void;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  applications: TGCApplication[];
  userApplications: TGCApplication[];
  documents: DocumentItem[];
  invoices: InvoiceItem[];
  userInvoices: InvoiceItem[];
  reports: AnalysisReport[];
  userReports: AnalysisReport[];
  addApplication: (app: Omit<TGCApplication, 'id' | 'userId' | 'userEmail' | 'companyName' | 'submittedAt' | 'updatedAt' | 'status'>) => Promise<void>;
  updateApplicationStatus: (id: string, status: TGCApplication['status'], feedback?: string, approvedAmount?: number) => Promise<void>;
  addDocument: (name: string, type: string, size: string) => Promise<void>;
  addInvoice: (inv: Omit<InvoiceItem, 'id' | 'userId'>) => Promise<void>;
  bridgeInvoice: (invoiceId: string, methodCode: string) => Promise<void>;
  submitContactRequest: (payload: ContactRequestPayload) => Promise<void>;
  seedFirestoreWithDemoData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'spontiva_active_user';
const LOCAL_STORAGE_APPS_KEY = 'spontiva_applications_db';
const LOCAL_STORAGE_DOCS_KEY = 'spontiva_documents_db';
const LOCAL_STORAGE_INVOICES_KEY = 'spontiva_invoices_db';
const LOCAL_STORAGE_REPORTS_KEY = 'spontiva_reports_db';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

  // Local state initialized with fallback
  const [applications, setApplications] = useState<TGCApplication[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_APPS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return getAllApplications();
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_DOCS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    const allDocs: DocumentItem[] = [];
    DEMO_ACCOUNTS.forEach(a => allDocs.push(...a.documents));
    return allDocs;
  });

  const [invoices, setInvoices] = useState<InvoiceItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_INVOICES_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return getAllInvoices();
  });

  const [reports, setReports] = useState<AnalysisReport[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return getAllReports();
  });

  // Track firestore listener unsubscribes
  const unsubscribesRef = useRef<Unsubscribe[]>([]);

  const cleanupListeners = () => {
    unsubscribesRef.current.forEach(unsub => unsub());
    unsubscribesRef.current = [];
  };

  // Sync to localStorage as local cache
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DOCS_KEY, JSON.stringify(documents));
    } catch (e) {
      console.error(e);
    }
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INVOICES_KEY, JSON.stringify(invoices));
    } catch (e) {
      console.error(e);
    }
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const isAdmin = currentUser ? (currentUser.role === 'admin' || isUserAdmin(currentUser.email)) : false;

  // -------------------------------------------------------------
  // Firestore Realtime Synchronization Engine
  // -------------------------------------------------------------
  useEffect(() => {
    cleanupListeners();

    if (!currentUser) {
      setSyncStatus('synced');
      return;
    }

    // If demo account, keep demo data and sync with local storage
    if (currentUser.isDemo) {
      setSyncStatus('synced');
      return;
    }

    setSyncStatus('syncing');

    try {
      // 1. Applications Listener
      const appsQuery = isAdmin 
        ? collection(db, 'applications')
        : query(collection(db, 'applications'), where('userId', '==', currentUser.uid));

      const unsubApps = onSnapshot(appsQuery, (snapshot) => {
        const firestoreApps: TGCApplication[] = [];
        snapshot.forEach(docSnap => {
          firestoreApps.push(docSnap.data() as TGCApplication);
        });

        if (firestoreApps.length > 0) {
          setApplications(prev => {
            // Merge with admin/prev so we don't drop items if filtered
            if (isAdmin) return firestoreApps;
            const otherUsersApps = prev.filter(p => p.userId !== currentUser.uid);
            return [...firestoreApps, ...otherUsersApps];
          });
        }
        setSyncStatus('synced');
      }, (err) => {
        console.warn('Firestore applications listener fallback:', err);
        setSyncStatus('offline');
      });
      unsubscribesRef.current.push(unsubApps);

      // 2. Invoices Listener
      const invoicesQuery = isAdmin 
        ? collection(db, 'invoices')
        : query(collection(db, 'invoices'), where('userId', '==', currentUser.uid));

      const unsubInvoices = onSnapshot(invoicesQuery, (snapshot) => {
        const firestoreInvoices: InvoiceItem[] = [];
        snapshot.forEach(docSnap => {
          firestoreInvoices.push(docSnap.data() as InvoiceItem);
        });

        if (firestoreInvoices.length > 0) {
          setInvoices(prev => {
            if (isAdmin) return firestoreInvoices;
            const other = prev.filter(i => i.userId !== currentUser.uid);
            return [...firestoreInvoices, ...other];
          });
        }
      }, (err) => {
        console.warn('Firestore invoices listener fallback:', err);
      });
      unsubscribesRef.current.push(unsubInvoices);

      // 3. Documents Listener
      const docsQuery = isAdmin 
        ? collection(db, 'documents')
        : query(collection(db, 'documents'), where('userId', '==', currentUser.uid));

      const unsubDocs = onSnapshot(docsQuery, (snapshot) => {
        const firestoreDocs: DocumentItem[] = [];
        snapshot.forEach(docSnap => {
          firestoreDocs.push(docSnap.data() as DocumentItem);
        });

        if (firestoreDocs.length > 0) {
          setDocuments(prev => {
            if (isAdmin) return firestoreDocs;
            const other = prev.filter(d => d.userId !== currentUser.uid);
            return [...firestoreDocs, ...other];
          });
        }
      }, (err) => {
        console.warn('Firestore documents listener fallback:', err);
      });
      unsubscribesRef.current.push(unsubDocs);

      // 4. User Profile Listener
      const userDocRef = doc(db, 'users', currentUser.uid);
      const unsubUser = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const remoteData = docSnap.data() as UserProfile;
          setCurrentUser(prev => prev ? { ...prev, ...remoteData } : remoteData);
        }
      }, (err) => {
        console.warn('Firestore user doc listener fallback:', err);
      });
      unsubscribesRef.current.push(unsubUser);

    } catch (error) {
      console.error('Error attaching Firestore listeners:', error);
      setSyncStatus('offline');
    }

    return () => {
      cleanupListeners();
    };
  }, [currentUser?.uid, currentUser?.isDemo, isAdmin]);

  // -------------------------------------------------------------
  // Firebase Auth State Listener
  // -------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        const isEmailAdmin = isUserAdmin(email);

        // Try reading existing profile from Firestore
        let userProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: email,
          displayName: firebaseUser.displayName || email.split('@')[0],
          companyName: isEmailAdmin ? 'Spontiva Admin Directie' : 'Mijn Onderneming B.V.',
          accountType: isEmailAdmin ? 'admin' : 'mkb',
          role: isEmailAdmin ? 'admin' : 'user',
          photoURL: firebaseUser.photoURL || undefined,
          isDemo: false,
          createdAt: new Date().toISOString()
        };

        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            userProfile = {
              ...userProfile,
              ...snap.data() as UserProfile,
              role: isEmailAdmin ? 'admin' : (snap.data().role || 'user')
            };
          } else {
            // First time login - save profile in Firestore
            await setDoc(userRef, userProfile, { merge: true });
          }
        } catch (e) {
          console.warn('Could not sync user profile to Firestore, falling back to local state:', e);
        }

        setCurrentUser(userProfile);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -------------------------------------------------------------
  // Google OAuth Login
  // -------------------------------------------------------------
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email || '';
      const isEmailAdmin = isUserAdmin(email);

      let userProfile: UserProfile = {
        uid: result.user.uid,
        email: email,
        displayName: result.user.displayName || email.split('@')[0],
        companyName: isEmailAdmin ? 'Spontiva Hoofdkantoor' : 'Onderneming B.V.',
        accountType: isEmailAdmin ? 'admin' : 'mkb',
        role: isEmailAdmin ? 'admin' : 'user',
        photoURL: result.user.photoURL || undefined,
        isDemo: false,
        createdAt: new Date().toISOString()
      };

      try {
        const userRef = doc(db, 'users', result.user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          userProfile = { ...userProfile, ...snap.data() as UserProfile };
        } else {
          await setDoc(userRef, userProfile, { merge: true });
        }
      } catch (err) {
        console.warn('Firestore write warning on Google login:', err);
      }

      setCurrentUser(userProfile);
    } catch (error: any) {
      console.error('Google Sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Email / Password Login
  // -------------------------------------------------------------
  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const userEmail = result.user.email || email;
      const isEmailAdmin = isUserAdmin(userEmail);

      let userProfile: UserProfile = {
        uid: result.user.uid,
        email: userEmail,
        displayName: result.user.displayName || userEmail.split('@')[0],
        companyName: isEmailAdmin ? 'Spontiva Admin Directie' : 'Mijn Onderneming',
        accountType: isEmailAdmin ? 'admin' : 'mkb',
        role: isEmailAdmin ? 'admin' : 'user',
        isDemo: false,
        createdAt: new Date().toISOString()
      };

      try {
        const userRef = doc(db, 'users', result.user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          userProfile = { ...userProfile, ...snap.data() as UserProfile };
        } else {
          await setDoc(userRef, userProfile, { merge: true });
        }
      } catch (err) {
        console.warn('Firestore user fetch on email login:', err);
      }

      setCurrentUser(userProfile);
    } catch (error: any) {
      console.error('Email sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Register with Email & Account Type
  // -------------------------------------------------------------
  const registerWithEmail = async (
    email: string, 
    pass: string, 
    name: string, 
    company: string, 
    accountType: AccountType = 'mkb'
  ) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(result.user, { displayName: name });
      
      const isEmailAdmin = isUserAdmin(email);
      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: email,
        displayName: name,
        companyName: company || 'Mijn Bedrijf B.V.',
        accountType: isEmailAdmin ? 'admin' : accountType,
        role: isEmailAdmin ? 'admin' : 'user',
        isDemo: false,
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', result.user.uid), userProfile);
      } catch (err) {
        console.warn('Could not write user profile to Firestore during registration:', err);
      }

      setCurrentUser(userProfile);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Demo Login (Instant switch to demo account)
  // -------------------------------------------------------------
  const loginWithDemo = (demoId: string) => {
    const demo = DEMO_ACCOUNTS.find(d => d.id === demoId);
    if (!demo) return;

    const profile: UserProfile = {
      uid: demo.id,
      email: demo.email,
      displayName: demo.name,
      companyName: demo.companyName,
      accountType: demo.accountType || (demo.isAdmin ? 'admin' : 'mkb'),
      kvkNumber: demo.kvkNumber,
      iban: demo.iban,
      role: demo.isAdmin ? 'admin' : 'user',
      isDemo: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(profile);
  };

  // -------------------------------------------------------------
  // Logout
  // -------------------------------------------------------------
  const logout = async () => {
    cleanupListeners();
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  // -------------------------------------------------------------
  // Update User Profile (Writes to Firestore & Local State)
  // -------------------------------------------------------------
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) return;

    const updatedProfile: UserProfile = {
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    setCurrentUser(updatedProfile);

    if (!currentUser.isDemo) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), updatedProfile, { merge: true });
      } catch (err) {
        console.error('Failed to update user profile in Firestore:', err);
      }
    }
  };

  // -------------------------------------------------------------
  // Add Application (Writes to Firestore & Local State)
  // -------------------------------------------------------------
  const addApplication = async (appData: Omit<TGCApplication, 'id' | 'userId' | 'userEmail' | 'companyName' | 'submittedAt' | 'updatedAt' | 'status'>) => {
    if (!currentUser) return;

    const newApp: TGCApplication = {
      ...appData,
      id: `TGC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      companyName: currentUser.companyName,
      accountType: currentUser.accountType,
      status: 'nieuw',
      submittedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // Optimistic local state update
    setApplications(prev => [newApp, ...prev]);

    // Write to Firestore
    try {
      await setDoc(doc(db, 'applications', newApp.id), newApp);
    } catch (err) {
      console.warn('Failed to write application to Firestore, stored in local cache:', err);
    }
  };

  // -------------------------------------------------------------
  // Update Application Status (Admin Feature - Syncs to Firestore)
  // -------------------------------------------------------------
  const updateApplicationStatus = async (
    id: string, 
    status: TGCApplication['status'], 
    feedback?: string, 
    approvedAmount?: number
  ) => {
    const today = new Date().toISOString().split('T')[0];

    // Optimistic local state update
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          adminFeedback: feedback !== undefined ? feedback : app.adminFeedback,
          approvedAmount: approvedAmount !== undefined ? approvedAmount : app.approvedAmount,
          updatedAt: today
        };
      }
      return app;
    }));

    // Update in Firestore
    try {
      const updatePayload: Record<string, any> = {
        status,
        updatedAt: today
      };
      if (feedback !== undefined) updatePayload.adminFeedback = feedback;
      if (approvedAmount !== undefined) updatePayload.approvedAmount = approvedAmount;

      await updateDoc(doc(db, 'applications', id), updatePayload);
    } catch (err) {
      console.warn('Failed to update application status in Firestore:', err);
    }
  };

  // -------------------------------------------------------------
  // Add Document (Syncs to Firestore)
  // -------------------------------------------------------------
  const addDocument = async (name: string, type: string, size: string) => {
    if (!currentUser) return;

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      userId: currentUser.uid,
      name,
      type,
      size,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'in_beoordeling'
    };

    setDocuments(prev => [newDoc, ...prev]);

    try {
      await setDoc(doc(db, 'documents', newDoc.id), newDoc);
    } catch (err) {
      console.warn('Failed to write document metadata to Firestore:', err);
    }
  };

  // -------------------------------------------------------------
  // Add Invoice (Syncs to Firestore)
  // -------------------------------------------------------------
  const addInvoice = async (invData: Omit<InvoiceItem, 'id' | 'userId'>) => {
    if (!currentUser) return;

    const newInvoice: InvoiceItem = {
      ...invData,
      id: `inv-${Date.now()}`,
      userId: currentUser.uid
    };

    setInvoices(prev => [newInvoice, ...prev]);

    try {
      await setDoc(doc(db, 'invoices', newInvoice.id), newInvoice);
    } catch (err) {
      console.warn('Failed to write invoice to Firestore:', err);
    }
  };

  // -------------------------------------------------------------
  // Bridge Invoice (Direct TGC Interventie Route 2)
  // -------------------------------------------------------------
  const bridgeInvoice = async (invoiceId: string, methodCode: string) => {
    if (!currentUser) return;
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const today = new Date().toISOString().split('T')[0];

    // 1. Update invoice
    setInvoices(prev => prev.map(i => {
      if (i.id === invoiceId) {
        return { ...i, status: 'overbrugd', linkedMethodId: methodCode };
      }
      return i;
    }));

    try {
      await updateDoc(doc(db, 'invoices', invoiceId), {
        status: 'overbrugd',
        linkedMethodId: methodCode
      });
    } catch (err) {
      console.warn('Failed to update invoice in Firestore:', err);
    }

    // 2. Create TGC Application
    const newApp: TGCApplication = {
      id: `TGC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      companyName: currentUser.companyName,
      accountType: currentUser.accountType,
      type: 'aanvraag',
      amount: inv.amount,
      timeGapDays: inv.timeGapDays,
      status: 'actief',
      invoiceDescription: `TGC Overbrugging factuur ${inv.invoiceNumber} (${inv.counterparty})`,
      counterparty: inv.counterparty,
      submittedAt: today,
      updatedAt: today,
      approvedAmount: inv.amount,
      recommendedMethod: methodCode,
      adminFeedback: `Direct geactiveerd via Facturen Kalender op basis van methode ${methodCode}. Automatische beëindiging zodra betaling ontvangen is.`
    };

    setApplications(prev => [newApp, ...prev]);

    try {
      await setDoc(doc(db, 'applications', newApp.id), newApp);
    } catch (err) {
      console.warn('Failed to write bridged application to Firestore:', err);
    }
  };

  // -------------------------------------------------------------
  // Submit Contact Request / Lead to Firestore
  // -------------------------------------------------------------
  const submitContactRequest = async (payload: ContactRequestPayload) => {
    const id = `lead-${Date.now()}`;
    const docData = {
      id,
      ...payload,
      createdAt: new Date().toISOString(),
      status: 'nieuw'
    };

    try {
      await setDoc(doc(db, 'contact_requests', id), docData);
    } catch (err) {
      console.warn('Failed to write contact request to Firestore, logged locally:', err);
    }
  };

  // -------------------------------------------------------------
  // Admin Seed: Populate Firestore with initial baseline data
  // -------------------------------------------------------------
  const seedFirestoreWithDemoData = async () => {
    if (!isAdmin) return;
    setSyncStatus('syncing');

    try {
      for (const account of DEMO_ACCOUNTS) {
        // Save user profile
        await setDoc(doc(db, 'users', account.id), {
          uid: account.id,
          email: account.email,
          displayName: account.name,
          companyName: account.companyName,
          accountType: account.accountType || (account.isAdmin ? 'admin' : 'mkb'),
          kvkNumber: account.kvkNumber,
          iban: account.iban,
          role: account.isAdmin ? 'admin' : 'user',
          isDemo: true,
          createdAt: new Date().toISOString()
        }, { merge: true });

        // Save applications
        for (const app of account.applications) {
          await setDoc(doc(db, 'applications', app.id), {
            ...app,
            accountType: account.accountType
          }, { merge: true });
        }

        // Save invoices
        if (account.invoices) {
          for (const inv of account.invoices) {
            await setDoc(doc(db, 'invoices', inv.id), inv, { merge: true });
          }
        }

        // Save documents
        for (const d of account.documents) {
          await setDoc(doc(db, 'documents', d.id), d, { merge: true });
        }

        // Save reports
        if (account.reports) {
          for (const r of account.reports) {
            await setDoc(doc(db, 'reports', r.id), r, { merge: true });
          }
        }
      }
      setSyncStatus('synced');
    } catch (err) {
      console.error('Failed to seed Firestore:', err);
      setSyncStatus('offline');
    }
  };

  // Filter applications for current user (admin sees all, user sees their own)
  const userApplications = currentUser
    ? (isAdmin ? applications : applications.filter(a => a.userId === currentUser.uid || a.userEmail === currentUser.email))
    : [];

  const userInvoices = currentUser
    ? (isAdmin ? invoices : invoices.filter(i => i.userId === currentUser.uid))
    : [];

  const userReports = currentUser
    ? (isAdmin ? reports : reports.filter(r => r.userId === currentUser.uid))
    : [];

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAdmin,
      syncStatus,
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      loginWithDemo,
      logout,
      updateUserProfile,
      applications,
      userApplications,
      documents,
      invoices,
      userInvoices,
      reports,
      userReports,
      addApplication,
      updateApplicationStatus,
      addDocument,
      addInvoice,
      bridgeInvoice,
      submitContactRequest,
      seedFirestoreWithDemoData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
