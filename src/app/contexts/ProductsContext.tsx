import React, { createContext, useContext, useState } from 'react';
import { Product, products as defaultProducts } from '../data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  editProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = 'eugenia_products';

function loadProducts(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(loadProducts);

  const addProduct = (data: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...data,
      id: `product-${Date.now()}`,
    };
    setProducts((prev) => {
      const updated = [...prev, newProduct];
      saveProducts(updated);
      return updated;
    });
  };

  const editProduct = (id: string, data: Omit<Product, 'id'>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...data, id } : p));
      saveProducts(updated);
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProducts(updated);
      return updated;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
};
