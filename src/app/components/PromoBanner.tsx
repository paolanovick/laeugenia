import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { usePageConfig } from '../contexts/PageConfigContext';

const COLOR_SCHEMES = {
  red: {
    bg: 'from-[#C4351A] via-[#8B1A0A] to-[#C4351A]',
    border: 'border-[#F5C080]/30',
    cta: 'bg-white text-[#C4351A] hover:bg-[#F5C080]',
    glow: 'shadow-[0_0_60px_rgba(196,53,26,0.4)]',
  },
  green: {
    bg: 'from-[#1a6b2a] via-[#0f4019] to-[#1a6b2a]',
    border: 'border-green-300/30',
    cta: 'bg-white text-[#1a6b2a] hover:bg-green-100',
    glow: 'shadow-[0_0_60px_rgba(26,107,42,0.4)]',
  },
  gold: {
    bg: 'from-[#7B4A00] via-[#4A2C00] to-[#7B4A00]',
    border: 'border-[#F5C080]/40',
    cta: 'bg-[#F5C080] text-[#4A2C00] hover:bg-[#D07030]',
    glow: 'shadow-[0_0_60px_rgba(245,192,128,0.3)]',
  },
  purple: {
    bg: 'from-[#4B1D8A] via-[#2D1155] to-[#4B1D8A]',
    border: 'border-purple-300/30',
    cta: 'bg-white text-[#4B1D8A] hover:bg-purple-100',
    glow: 'shadow-[0_0_60px_rgba(75,29,138,0.4)]',
  },
  blue: {
    bg: 'from-[#0f3460] via-[#0a1f3d] to-[#0f3460]',
    border: 'border-blue-300/30',
    cta: 'bg-white text-[#0f3460] hover:bg-blue-100',
    glow: 'shadow-[0_0_60px_rgba(15,52,96,0.4)]',
  },
};

export const PromoBanner = () => {
  const { config } = usePageConfig();

  if (!config.bannerEnabled || !config.bannerTitle) return null;

  const scheme = COLOR_SCHEMES[config.bannerColor] ?? COLOR_SCHEMES.red;
  const isExternal = config.bannerCtaLink.startsWith('http');

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 mb-12"
      >
        <div
          className={`relative bg-gradient-to-r ${scheme.bg} rounded-3xl overflow-hidden border ${scheme.border} ${scheme.glow}`}
        >
          {/* Patrón de fondo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          {/* Destellos decorativos */}
          <motion.div
            animate={{ x: ['0%', '100%'], opacity: [0, 0.15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 px-8 py-10 md:py-8 text-center md:text-left">
            {/* Emoji */}
            {config.bannerEmoji && (
              <motion.span
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl md:text-7xl flex-shrink-0 select-none"
              >
                {config.bannerEmoji}
              </motion.span>
            )}

            {/* Texto */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide leading-tight"
              >
                {config.bannerTitle}
              </motion.h2>
              {config.bannerSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-white/80 text-lg mt-2"
                >
                  {config.bannerSubtitle}
                </motion.p>
              )}
            </div>

            {/* CTA */}
            {config.bannerCtaText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="flex-shrink-0"
              >
                {isExternal ? (
                  <a
                    href={config.bannerCtaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.span
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      className={`inline-block ${scheme.cta} px-7 py-3 rounded-full font-bold text-base shadow-lg transition-colors cursor-pointer`}
                    >
                      {config.bannerCtaText} →
                    </motion.span>
                  </a>
                ) : (
                  <Link to={config.bannerCtaLink}>
                    <motion.span
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      className={`inline-block ${scheme.cta} px-7 py-3 rounded-full font-bold text-base shadow-lg transition-colors cursor-pointer`}
                    >
                      {config.bannerCtaText} →
                    </motion.span>
                  </Link>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
