import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-8xl mb-6"
        >
          🧉
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold text-white mb-4"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/60 mb-8"
        >
          Página no encontrada
        </motion.p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F5C080] hover:bg-[#D07030] text-[#7B1F0F] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </motion.button>
        </Link>
      </div>
    </div>
  );
};
