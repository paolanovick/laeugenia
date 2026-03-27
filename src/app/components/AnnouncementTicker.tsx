import { usePageConfig } from '../contexts/PageConfigContext';

export const AnnouncementTicker = () => {
  const { config } = usePageConfig();

  if (!config.tickerEnabled || config.tickerMessages.length === 0) return null;

  // Triplicamos los mensajes para el loop infinito
  const msgs = [...config.tickerMessages, ...config.tickerMessages, ...config.tickerMessages];

  return (
    <div className="w-full bg-[#7B1F0F] overflow-hidden py-2 z-40">
      <div className="flex whitespace-nowrap animate-ticker">
        {msgs.map((msg, i) => (
          <span key={i} className="text-sm font-semibold text-[#F5C080] mx-10">
            {msg}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
