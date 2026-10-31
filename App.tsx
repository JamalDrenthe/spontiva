import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EcosystemLogos from './components/EcosystemLogos';
import Services from './components/Services';
import Process from './components/Process';
import Segments from './components/Segments';
import Simulation from './components/Simulation';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Chatbot from './components/Chatbot';
import AuthModal from './components/AuthModal';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import About from './components/About';
import ContactPage from './components/ContactPage';
import ScrollProgress from './components/ScrollProgress';
import { PageView } from './types';
import { AuthProvider, useAuth } from './AuthContext';

const getPageFromUrl = (): PageView => {
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');
  const validPages: PageView[] = ['home', 'privacy', 'terms', 'dashboard', 'about', 'contact'];
  if (pageParam && validPages.includes(pageParam as PageView)) {
    return pageParam as PageView;
  }
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (hash && validPages.includes(hash as PageView)) {
    return hash as PageView;
  }
  return 'home';
};

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(getPageFromUrl);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'demo'>('login');
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(getPageFromUrl());
      const params = new URLSearchParams(window.location.search);
      const auth = params.get('auth');
      if (auth === 'login' || auth === 'register' || auth === 'demo') {
        setAuthModalMode(auth);
        setAuthModalOpen(true);
      }
    };
    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const navigateToPage = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register' | 'demo' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = () => {
    navigateToPage('dashboard');
  };

  // If on Dashboard page, show the complete Dashboard Portal
  if (currentPage === 'dashboard') {
    return (
      <>
        <DashboardLayout onBackToHome={() => navigateToPage('home')} />
        <Chatbot />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top 3D Interactive Scroll Progress Bar */}
      <ScrollProgress />

      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateToPage} 
        onSectionClick={navigateToSection}
        onOpenAuth={handleOpenAuth}
      />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero 
              onSectionClick={navigateToSection} 
              onOpenAuth={handleOpenAuth}
            />
            <EcosystemLogos />
            <Services onSectionClick={navigateToSection} />
            <Process />
            <Segments />
            <Simulation />
            <FAQ />
            <ContactForm />
          </>
        )}
        {currentPage === 'about' && (
          <About 
            onNavigate={navigateToPage} 
            onOpenAuth={handleOpenAuth} 
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigateToPage} 
            onOpenAuth={handleOpenAuth} 
          />
        )}
        {currentPage === 'privacy' && <Privacy />}
        {currentPage === 'terms' && <Terms />}
      </main>

      <Footer onNavigate={navigateToPage} onSectionClick={navigateToSection} />
      <Chatbot />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;