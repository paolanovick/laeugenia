import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePageConfig } from '../contexts/PageConfigContext';
import { resolveImageUrl } from '../utils/image';

const SHOWN_KEY = 'eugenia_promo_shown';

export const PromoModal = () => {
  const { config } = usePageConfig();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!config.promoEnabled || !config.promoImage) return;

    const alreadyShown = sessionStorage.getItem(SHOWN_KEY);
    if (alreadyShown) return;

    // Mostrar 800ms después de ingresar
    const t = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SHOWN_KEY, 'true');

      // Cerrar automáticamente a los 3 segundos
      setTimeout(() => setVisible(false), 3000);
    }, 800);

    return () => clearTimeout(t);
  }, [config.promoEnabled, config.promoImage]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-[90%]"
          >
            <img
              src={resolveImageUrl(config.promoImage)}
              alt="Promoción"
              className="w-full rounded-2xl shadow-2xl"
            />
            {/* Barra de progreso */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-[#F5C080] rounded-b-2xl"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
            />
            <button
              onClick={() => setVisible(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
