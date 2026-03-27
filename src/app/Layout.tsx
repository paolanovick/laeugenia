import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { AnnouncementTicker } from './components/AnnouncementTicker';
import { PromoModal } from './components/PromoModal';
import { Toaster } from './components/ui/sonner';
import { HeroSection } from './components/HeroSection';
import { useEntry } from './contexts/EntryContext';

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
      <AnnouncementTicker />
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
      <CookieBanner />
      <PromoModal />
    </div>
  );
};
