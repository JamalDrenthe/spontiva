import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, TGCApplication, DocumentItem, InvoiceItem, AnalysisReport } from './types';
import { 
  auth, 
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
import { DEMO_ACCOUNTS, getAllApplications, getAllInvoices, getAllReports } from './demoData';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, company: string) => Promise<void>;
  loginWithDemo: (demoId: string) => void;
  logout: () => Promise<void>;
  applications: TGCApplication[];
  userApplications: TGCApplication[];
  documents: DocumentItem[];
  invoices: InvoiceItem[];
  userInvoices: InvoiceItem[];
  reports: AnalysisReport[];
  userReports: AnalysisReport[];
  addApplication: (app: Omit<TGCApplication, 'id' | 'userId' | 'userEmail' | 'companyName' | 'submittedAt' | 'updatedAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: TGCApplication['status'], feedback?: string, approvedAmount?: number) => void;
  addDocument: (name: string, type: string, size: string) => void;
  addInvoice: (inv: Omit<InvoiceItem, 'id' | 'userId'>) => void;
  bridgeInvoice: (invoiceId: string, methodCode: string) => void;
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

  // Initialize applications state
  const [applications, setApplications] = useState<TGCApplication[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_APPS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return getAllApplications();
  });

  // Initialize documents state
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

  // Initialize invoices state
  const [invoices, setInvoices] = useState<InvoiceItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_INVOICES_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return getAllInvoices();
  });

  // Initialize analysis reports state
  const [reports, setReports] = useState<AnalysisReport[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return getAllReports();
  });

  // Save applications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DOCS_KEY, JSON.stringify(documents));
    } catch (e) {
      console.error(e);
    }
  }, [documents]);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INVOICES_KEY, JSON.stringify(invoices));
    } catch (e) {
      console.error(e);
    }
  }, [invoices]);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }, [reports]);

  // Save currentUser to localStorage
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

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // If logged in via Firebase, convert to our UserProfile
        const email = firebaseUser.email || '';
        const isEmailAdmin = isUserAdmin(email);
        
        const userProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: email,
          displayName: firebaseUser.displayName || email.split('@')[0],
          companyName: isEmailAdmin ? 'Spontiva Admin Directie' : 'Mijn Bedrijf',
          role: isEmailAdmin ? 'admin' : 'user',
          photoURL: firebaseUser.photoURL || undefined,
          isDemo: false,
          createdAt: new Date().toISOString()
        };
        setCurrentUser(userProfile);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = currentUser ? (currentUser.role === 'admin' || isUserAdmin(currentUser.email)) : false;

  // Google OAuth Login
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email || '';
      const isEmailAdmin = isUserAdmin(email);

      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: email,
        displayName: result.user.displayName || email.split('@')[0],
        companyName: isEmailAdmin ? 'Spontiva Hoofdkantoor' : 'Onderneming B.V.',
        role: isEmailAdmin ? 'admin' : 'user',
        photoURL: result.user.photoURL || undefined,
        isDemo: false,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(userProfile);
    } catch (error: any) {
      console.error('Google Sign-in error:', error);
      // If error is popup blocked or configuration issue in non-authorized domain, give clean feedback
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email / Password Login
  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const userEmail = result.user.email || email;
      const isEmailAdmin = isUserAdmin(userEmail);

      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: userEmail,
        displayName: result.user.displayName || userEmail.split('@')[0],
        companyName: isEmailAdmin ? 'Spontiva Admin Directie' : 'Mijn Onderneming',
        role: isEmailAdmin ? 'admin' : 'user',
        isDemo: false,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(userProfile);
    } catch (error: any) {
      console.error('Email sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register with Email
  const registerWithEmail = async (email: string, pass: string, name: string, company: string) => {
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
        role: isEmailAdmin ? 'admin' : 'user',
        isDemo: false,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(userProfile);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Demo Login (Instant switch to demo account)
  const loginWithDemo = (demoId: string) => {
    const demo = DEMO_ACCOUNTS.find(d => d.id === demoId);
    if (!demo) return;

    const profile: UserProfile = {
      uid: demo.id,
      email: demo.email,
      displayName: demo.name,
      companyName: demo.companyName,
      kvkNumber: demo.kvkNumber,
      iban: demo.iban,
      role: demo.isAdmin ? 'admin' : 'user',
      isDemo: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(profile);
  };

  // Logout
  const logout = async () => {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  // Add application
  const addApplication = (appData: Omit<TGCApplication, 'id' | 'userId' | 'userEmail' | 'companyName' | 'submittedAt' | 'updatedAt' | 'status'>) => {
    if (!currentUser) return;

    const newApp: TGCApplication = {
      ...appData,
      id: `TGC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      companyName: currentUser.companyName,
      status: 'nieuw',
      submittedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);
  };

  // Update application status (Admin feature)
  const updateApplicationStatus = (
    id: string, 
    status: TGCApplication['status'], 
    feedback?: string, 
    approvedAmount?: number
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          adminFeedback: feedback !== undefined ? feedback : app.adminFeedback,
          approvedAmount: approvedAmount !== undefined ? approvedAmount : app.approvedAmount,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    }));
  };

  // Add document
  const addDocument = (name: string, type: string, size: string) => {
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
  };

  // Add invoice
  const addInvoice = (invData: Omit<InvoiceItem, 'id' | 'userId'>) => {
    if (!currentUser) return;
    const newInvoice: InvoiceItem = {
      ...invData,
      id: `inv-${Date.now()}`,
      userId: currentUser.uid
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  // Bridge invoice directly with a TGC Method (Route 2 quick action)
  const bridgeInvoice = (invoiceId: string, methodCode: string) => {
    if (!currentUser) return;
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    // Update invoice status
    setInvoices(prev => prev.map(i => {
      if (i.id === invoiceId) {
        return { ...i, status: 'overbrugd', linkedMethodId: methodCode };
      }
      return i;
    }));

    // Also auto-create a TGC application
    const newApp: TGCApplication = {
      id: `TGC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      companyName: currentUser.companyName,
      type: 'aanvraag',
      amount: inv.amount,
      timeGapDays: inv.timeGapDays,
      status: 'actief',
      invoiceDescription: `TGC Overbrugging factuur ${inv.invoiceNumber} (${inv.counterparty})`,
      counterparty: inv.counterparty,
      submittedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      approvedAmount: inv.amount,
      recommendedMethod: methodCode,
      adminFeedback: `Direct geactiveerd via Facturen Kalender op basis van methode ${methodCode}. Automatische beëindiging zodra betaling ontvangen is.`
    };
    setApplications(prev => [newApp, ...prev]);
  };

  // Filter applications for current user (unless admin, admin sees all or user sees theirs)
  const userApplications = currentUser
    ? (isAdmin ? applications : applications.filter(a => a.userId === currentUser.uid || a.userEmail === currentUser.email))
    : [];

  // Filter invoices for current user
  const userInvoices = currentUser
    ? (isAdmin ? invoices : invoices.filter(i => i.userId === currentUser.uid))
    : [];

  // Filter reports for current user
  const userReports = currentUser
    ? (isAdmin ? reports : reports.filter(r => r.userId === currentUser.uid))
    : [];

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAdmin,
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      loginWithDemo,
      logout,
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
      bridgeInvoice
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
