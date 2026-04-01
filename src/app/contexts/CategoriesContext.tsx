import React, { createContext, useContext, useState, useEffect } from 'react';
import { categories as fallbackCategories } from '../data/products';

export interface Category {
  id: string;
  name: string;
  icon: string;
  hidden: boolean;
}

interface CategoriesContextType {
  categories: Category[];
  visibleCategories: Category[];
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(
    fallbackCategories.map((c) => ({ ...c, hidden: (c as any).hidden ?? false }))
  );

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => {
        if (!r.ok) throw new Error('API error');
        return r.json();
      })
      .then((data: Category[]) => setCategories(data))
      .catch(() => {});
  }, []);

  const visibleCategories = categories.filter((c) => !c.hidden);

  return (
    <CategoriesContext.Provider value={{ categories, visibleCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error('useCategories must be used within a CategoriesProvider');
  return context;
};
