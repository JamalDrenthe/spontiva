import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
import { PageView } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const navigateToPage = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const navigateToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Delay scrolling to allow render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar onNavigate={navigateToPage} onSectionClick={navigateToSection} />
      
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onSectionClick={navigateToSection} />
            <Services onSectionClick={navigateToSection} />
            <Process />
            <Segments />
            <Simulation />
            <FAQ />
            <ContactForm />
          </>
        )}
        {currentPage === 'privacy' && <Privacy />}
        {currentPage === 'terms' && <Terms />}
      </main>

      <Footer onNavigate={navigateToPage} onSectionClick={navigateToSection} />
      <Chatbot />
    </div>
  );
};

export default App;