import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PageConfig {
  tickerMessages: string[];
  tickerEnabled: boolean;
  promoImage: string;
  promoEnabled: boolean;
  shippingText: string;
  whatsappNumber: string;
  bannerEnabled: boolean;
  bannerEmoji: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCtaText: string;
  bannerCtaLink: string;
  bannerColor: 'red' | 'green' | 'gold' | 'purple' | 'blue';
  heroImage: string;
}

interface PageConfigContextType {
  config: PageConfig;
  loading: boolean;
  saveConfig: (c: PageConfig) => Promise<void>;
  resetConfig: () => void;
}

const DEFAULT_CONFIG: PageConfig = {
  tickerMessages: [
    '🧉 Envíos a todo el país',
    'Pagá en efectivo y llevate un 10% de descuento',
    '🌿 Yerba mate 100% natural y artesanal',
    '⭐ Nuevos productos disponibles',
  ],
  tickerEnabled: true,
  promoImage: '',
  promoEnabled: false,
  shippingText: '',
  whatsappNumber: '5491135811888',
  bannerEnabled: false,
  bannerEmoji: '🎁',
  bannerTitle: '',
  bannerSubtitle: '',
  bannerCtaText: 'banner-ofertas',
  bannerCtaLink: '/category/publicidad',
  bannerColor: 'red',
  heroImage: '',
};

const API = '/api/config';

const PageConfigContext = createContext<PageConfigContextType | undefined>(undefined);

export const PageConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PageConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then((data: Partial<PageConfig>) => {
        if (data && Object.keys(data).length > 0) {
          setConfig({
            ...DEFAULT_CONFIG,
            ...data,
            tickerMessages:
              Array.isArray(data.tickerMessages) && data.tickerMessages.length > 0
                ? data.tickerMessages
                : DEFAULT_CONFIG.tickerMessages,
          });
        }
      })
      .catch(() => {/* usa DEFAULT_CONFIG */})
      .finally(() => setLoading(false));
  }, []);

  const saveConfig = async (c: PageConfig) => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    setConfig(c);
  };

  const resetConfig = () => setConfig(DEFAULT_CONFIG);

  return (
    <PageConfigContext.Provider value={{ config, loading, saveConfig, resetConfig }}>
      {children}
    </PageConfigContext.Provider>
  );
};

export const usePageConfig = () => {
  const ctx = useContext(PageConfigContext);
  if (!ctx) throw new Error('usePageConfig must be used within PageConfigProvider');
  return ctx;
};
