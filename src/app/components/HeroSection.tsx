import { motion } from 'motion/react';

const HERO_IMAGE = 'https://i.ibb.co/pjCr7n1q/imagen1.jpg';

interface Props {
  onEnter: () => void;
}

export const HeroSection = ({ onEnter }: Props) => {
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Logo */}
        <motion.img
          src="/logoSF.png"
          alt="La Eugenia"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-40 md:w-52 mb-6 drop-shadow-2xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white/70 text-lg md:text-xl mb-10 max-w-md"
        >
          Mates, yerbas, bombillas, artículos materos y combos especiales.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="bg-[#F5C080] hover:bg-[#D07030] text-[#7B1F0F] px-12 py-4 rounded-full font-bold text-xl shadow-2xl transition-colors"
        >
          Ingresar
        </motion.button>
      </div>
    </section>
  );
};
