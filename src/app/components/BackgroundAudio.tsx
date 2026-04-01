import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const unlockedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.muted = true;

    // Intentar autoplay muted (siempre permitido)
    audio.play().catch(() => {});

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      audio.muted = false;
      audio.play().catch(() => {});
      ['click', 'scroll', 'touchstart', 'keydown'].forEach((e) =>
        document.removeEventListener(e, unlock)
      );
    };

    ['click', 'scroll', 'touchstart', 'keydown'].forEach((e) =>
      document.addEventListener(e, unlock, { once: false, passive: true })
    );

    return () => {
      ['click', 'scroll', 'touchstart', 'keydown'].forEach((e) =>
        document.removeEventListener(e, unlock)
      );
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    if (!next) audio.play().catch(() => {});
    setMuted(next);
  };

  return (
    <>
      <audio ref={audioRef} src="/background.mp3" loop preload="auto" />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-black/50 border border-[#c8945a]/40 backdrop-blur-sm flex items-center justify-center text-lg shadow-lg"
        title={muted ? 'Activar música' : 'Silenciar música'}
      >
        {muted ? '🔇' : '🎵'}
      </motion.button>
    </>
  );
};
