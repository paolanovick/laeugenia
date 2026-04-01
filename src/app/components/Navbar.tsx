import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, ShoppingCart, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { useEntry } from '../contexts/EntryContext';
import { useProducts } from '../contexts/ProductsContext';
import { useCategories } from '../contexts/CategoriesContext';
import { resolveImageUrl } from '../utils/image';

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartBounced, setCartBounced] = useState(false);
  const { getCartCount } = useCart();
  const { reset } = useEntry();
  const { products } = useProducts();
  const { visibleCategories } = useCategories();
  const cartCount = getCartCount();
  const prevCartCount = useRef(cartCount);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Bounce cart icon cuando se agrega un ítem
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartBounced(true);
      setTimeout(() => setCartBounced(false), 500);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  // Focus al input cuando abre la búsqueda
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  const searchResults =
    searchQuery.trim().length >= 2
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5)
      : [];

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Overlay transparente para cerrar búsqueda al hacer click afuera */}
      {searchOpen && (
        <div className="fixed inset-0 z-30" onClick={closeSearch} />
      )}

      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative w-full bg-black/75 backdrop-blur-md border-b border-white/10 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={reset}>
              <motion.img
                src="/logoSF.png"
                alt="La Eugenia & Flia."
                whileHover={{ scale: 1.05 }}
                className="h-24 w-auto drop-shadow-lg"
              />
            </Link>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {searchOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Search className="w-6 h-6 text-white" />
                )}
              </motion.button>

              {/* Cart Button */}
              <Link to="/cart">
                <motion.div
                  animate={
                    cartBounced
                      ? { scale: [1, 1.35, 0.85, 1.1, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.45 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6 text-white" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#F5C080] text-[#7B1F0F] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Panel */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#120505]/95 backdrop-blur-md border-b border-white/10 px-4 py-4 z-40"
            >
              <div className="max-w-7xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                    placeholder="Buscar mates, yerbas, bombillas..."
                    className="w-full bg-white/10 text-white placeholder-white/40 pl-12 pr-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#F5C080] transition-colors"
                  />
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={closeSearch}
                      >
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#1a0a0a] flex-shrink-0">
                            <img
                              src={resolveImageUrl(product.images[0])}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">
                              {product.name}
                            </p>
                            <p className="text-white/50 text-xs">
                              ${product.price.toLocaleString('es-AR')}
                            </p>
                          </div>
                          <span className="text-xl">
                            {product.category === 'mates' && '🧉'}
                            {product.category === 'yerba' && '🌿'}
                            {product.category === 'bombillas' && '✨'}
                            {product.category === 'articulos' && '🪔'}
                            {product.category === 'combos' && '🎁'}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}

                {searchQuery.trim().length >= 2 &&
                  searchResults.length === 0 && (
                    <p className="text-white/50 text-sm mt-3 px-3">
                      No se encontraron productos para &quot;{searchQuery}&quot;
                    </p>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-b from-[#7B1F0F] to-[#120505] z-50 shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="/logoSF.png"
                      alt="La Eugenia & Flia."
                      className="h-14 w-auto drop-shadow-lg"
                    />
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-6 space-y-2">
                <Link
                  to="/"
                  onClick={() => {
                    setSidebarOpen(false);
                    reset();
                  }}
                  className="block"
                >
                  <motion.div
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <span className="text-white font-medium">🏠 Inicio</span>
                  </motion.div>
                </Link>

                <div className="pt-4 pb-2">
                  <p className="text-xs uppercase tracking-wider text-white/40 px-4 mb-2">
                    Categorías
                  </p>
                </div>

                {visibleCategories.map((category, index) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <span className="text-white font-medium">
                        {category.icon} {category.name}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/20">
                <p className="text-xs text-white/60 text-center">
                  © 2026 La Eugenia & Flia.
                  <br />
                  Tradición Argentina
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
