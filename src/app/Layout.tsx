import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { AnnouncementTicker } from './components/AnnouncementTicker';
import { PromoModal } from './components/PromoModal';
import { Toaster } from './components/ui/sonner';
import { HeroSection } from './components/HeroSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useEntry } from './contexts/EntryContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export const Layout = () => {
  const { entered, enter } = useEntry();

  const handleEnter = () => {
    enter();
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
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementTicker />
        <Navbar />
      </header>
      <main className="pt-[132px]">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
      <CookieBanner />
      <PromoModal />
      <WhatsAppButton />
    </div>
  );
};
