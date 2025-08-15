import { useState, useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { PrizesSection } from "./components/PrizesSection";
import { SponsorsSection } from "./components/SponsorsSection";
import { FAQSection } from "./components/FAQSection";
import { ApplicationPage } from "./components/ApplicationPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'apply'>('main');

  useEffect(() => {
    // Check if we're on the application page using hash
    if (window.location.hash === '#/apply') {
      setCurrentPage('apply');
    }
  }, []);

  const handleNavigateToApply = () => {
    setCurrentPage('apply');
    window.location.hash = '#/apply';
  };

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/apply') {
        setCurrentPage('apply');
      } else {
        setCurrentPage('main');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'apply') {
    return <ApplicationPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onRegisterClick={handleNavigateToApply} />
      <AboutSection />
      <PrizesSection />
      <SponsorsSection />
      <FAQSection />
    </div>
  );
}