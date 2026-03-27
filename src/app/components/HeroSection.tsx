import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ShoppingBag, ChevronDown } from 'lucide-react';

const HERO_IMAGE =
  'https://i.ibb.co/pjCr7n1q/imagen1.jpg';

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGE}
          alt="La Eugenia Mates"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#120505]" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 bg-[#F5C080]/20 border border-[#F5C080]/40 rounded-full px-6 py-2 mb-6"
        >
          <span className="text-[#F5C080] text-sm font-medium tracking-widest uppercase">
            Artesanal · Argentino · Premium
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight"
        >
          La Eugenia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-white/70 mb-10 max-w-xl"
        >
          Mates, yerbas y bombillas con tradición en cada sorbo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/#productos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-[#F5C080] hover:bg-[#D07030] text-[#7B1F0F] px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver productos
            </motion.button>
          </Link>

          <a
            href="https://wa.me/5491234567890?text=Hola!%20Quiero%20consultar%20sobre%20sus%20productos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-colors"
            >
              Consultar por WhatsApp
            </motion.button>
          </a>
        </motion.div>
      </div>

      {/* Flecha scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};
