import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { categories } from '../data/products';

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-md border-b border-white/10"
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
            <Link to="/" className="flex items-center">
              <motion.img
                src="/logoSF.png"
                alt="La Eugenia"
                whileHover={{ scale: 1.05 }}
                className="h-24 w-auto drop-shadow-lg"
              />
            </Link>

            {/* Cart Button */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <motion.span
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
                    <img src="/logoSF.png" alt="La Eugenia" className="h-14 w-auto drop-shadow-lg" />
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
                  onClick={() => setSidebarOpen(false)}
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

                {categories.map((category, index) => (
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
