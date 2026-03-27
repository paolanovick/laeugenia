import { useState, useEffect } from 'react';

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('eugenia_cookie_consent');
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAceptar = () => {
    localStorage.setItem('eugenia_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleRechazar = () => {
    localStorage.setItem('eugenia_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] flex justify-center px-4 pb-4">
      <div className="w-full max-w-2xl bg-[#120505]/95 border border-white/20 rounded-2xl shadow-2xl p-5 text-white backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#F5C080] mb-1">
              Usamos cookies
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia. No compartimos tu información con terceros.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleRechazar}
              className="px-4 py-2 rounded-full text-xs font-semibold border border-white/30 text-white/70 hover:bg-white/10 transition"
            >
              Rechazar
            </button>
            <button
              onClick={handleAceptar}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#C4351A] hover:bg-[#7B1F0F] text-white shadow-lg transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
