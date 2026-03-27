import React, { createContext, useContext, useState } from 'react';

export interface PageConfig {
  tickerMessages: string[];
  tickerEnabled: boolean;
  promoImage: string;
  promoEnabled: boolean;
}

interface PageConfigContextType {
  config: PageConfig;
  saveConfig: (c: PageConfig) => void;
}

const DEFAULT_CONFIG: PageConfig = {
  tickerMessages: [
    '🧉 Envíos a todo el país',
    '💳 Pagá en efectivo y llevate un 10% de descuento',
    '🌿 Yerba mate 100% natural y artesanal',
    '⭐ Nuevos productos disponibles',
  ],
  tickerEnabled: true,
  promoImage: '',
  promoEnabled: false,
};

const STORAGE_KEY = 'eugenia_page_config';

function load(): PageConfig {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? { ...DEFAULT_CONFIG, ...JSON.parse(s) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

const PageConfigContext = createContext<PageConfigContextType | undefined>(undefined);

export const PageConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PageConfig>(load);

  const saveConfig = (c: PageConfig) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    setConfig(c);
  };

  return (
    <PageConfigContext.Provider value={{ config, saveConfig }}>
      {children}
    </PageConfigContext.Provider>
  );
};

export const usePageConfig = () => {
  const ctx = useContext(PageConfigContext);
  if (!ctx) throw new Error('usePageConfig must be used within PageConfigProvider');
  return ctx;
};
