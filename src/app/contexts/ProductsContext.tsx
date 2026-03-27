import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as defaultProducts } from '../data/products';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  editProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const API = '/api/products';

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data: Product[]) => {
        // Si la base está vacía, mostramos los productos por defecto del código
        setProducts(data.length > 0 ? data : defaultProducts);
      })
      .catch(() => {
        // Sin conexión a la API: fallback a localStorage o defaults
        try {
          const saved = localStorage.getItem('eugenia_products');
          setProducts(saved ? JSON.parse(saved) : defaultProducts);
        } catch {
          setProducts(defaultProducts);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const addProduct = async (data: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...data, id: `product-${Date.now()}` };
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) throw new Error('Error al guardar producto');
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = async (id: string, data: Omit<Product, 'id'>) => {
    const updated = { ...data, id };
    const res = await fetch(`/api/product/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error('Error al editar producto');
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const deleteProduct = async (id: string) => {
    // Actualizar UI inmediatamente
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Intentar borrar de MongoDB (puede no estar si era producto de ejemplo)
    await fetch(`/api/product/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  return (
    <ProductsContext.Provider value={{ products, loading, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
};
