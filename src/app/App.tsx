import { RouterProvider } from 'react-router';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { EntryProvider } from './contexts/EntryContext';
import { PageConfigProvider } from './contexts/PageConfigContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { router } from './routes';

export default function App() {
  return (
    <PageConfigProvider>
      <EntryProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </EntryProvider>
    </PageConfigProvider>
  );
}
