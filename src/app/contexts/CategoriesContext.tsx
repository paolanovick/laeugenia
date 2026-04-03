import React, { createContext, useContext, useState, useEffect } from 'react';
import { categories as fallbackCategories } from '../data/products';

export interface Category {
  id: string;
  name: string;
  icon: string;
  hidden: boolean;
  order: number;
  description: string;
}

interface CategoriesContextType {
  categories: Category[];
  visibleCategories: Category[];
  saveCategory: (cat: Category) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(
    fallbackCategories.map((c, i) => ({ ...c, hidden: (c as any).hidden ?? false, order: i, description: (c as any).description ?? '' }))
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

  const saveCategory = async (cat: Category) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cat),
    });
    if (!res.ok) throw new Error('Error al guardar categoría');
    setCategories((prev) =>
      prev.some((c) => c.id === cat.id)
        ? prev.map((c) => (c.id === cat.id ? cat : c))
        : [...prev, cat]
    );
  };

  const visibleCategories = categories.filter((c) => !c.hidden);

  return (
    <CategoriesContext.Provider value={{ categories, visibleCategories, saveCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error('useCategories must be used within a CategoriesProvider');
  return context;
};
