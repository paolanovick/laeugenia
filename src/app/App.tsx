import { RouterProvider } from 'react-router';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { EntryProvider } from './contexts/EntryContext';
import { router } from './routes';

export default function App() {
  return (
    <EntryProvider>
      <ProductsProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductsProvider>
    </EntryProvider>
  );
}
