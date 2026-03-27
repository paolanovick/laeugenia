import { useState } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { Toaster } from './components/ui/sonner';
import { HeroSection } from './components/HeroSection';

const ENTRY_KEY = 'eugenia_entered';

export const Layout = () => {
  const [entered, setEntered] = useState(() => {
    return localStorage.getItem(ENTRY_KEY) === 'true';
  });

  const handleEnter = () => {
    localStorage.setItem(ENTRY_KEY, 'true');
    setEntered(true);
    setTimeout(() => {
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!entered) {
    return (
      <>
        <HeroSection onEnter={handleEnter} />
        <CookieBanner />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
      <CookieBanner />
    </div>
  );
};
