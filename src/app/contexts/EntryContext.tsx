import React, { createContext, useContext, useState } from 'react';

const ENTRY_KEY = 'eugenia_entered';

interface EntryContextType {
  entered: boolean;
  enter: () => void;
  reset: () => void;
}

const EntryContext = createContext<EntryContextType | undefined>(undefined);

export const EntryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entered, setEntered] = useState(() => localStorage.getItem(ENTRY_KEY) === 'true');

  const enter = () => {
    localStorage.setItem(ENTRY_KEY, 'true');
    setEntered(true);
  };

  const reset = () => {
    localStorage.removeItem(ENTRY_KEY);
    setEntered(false);
  };

  return (
    <EntryContext.Provider value={{ entered, enter, reset }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntry = () => {
  const ctx = useContext(EntryContext);
  if (!ctx) throw new Error('useEntry must be used within EntryProvider');
  return ctx;
};
