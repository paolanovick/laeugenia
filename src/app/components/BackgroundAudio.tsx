import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.muted = true;

    const tryPlay = () => {
      audio.play()
        .then(() => setStarted(true))
        .catch(() => {});
    };

    tryPlay();

    const unlockOnInteraction = () => {
      if (!started) {
        audio.play()
          .then(() => setStarted(true))
          .catch(() => {});
      }
      document.removeEventListener('click', unlockOnInteraction);
    };
    document.addEventListener('click', unlockOnInteraction);

    return () => {
      document.removeEventListener('click', unlockOnInteraction);
    };
  }, [started]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
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
