import { motion } from 'motion/react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`, {
      icon: '🧉',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          whileHover={{ y: -8 }}
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#C4351A]/20 to-[#7B1F0F]/20">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Featured Badge */}
            {product.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 right-4 bg-[#F5C080] text-[#7B1F0F] px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                ⭐ Destacado
              </motion.div>
            )}

            {/* Quick Actions */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 bg-[#F5C080] hover:bg-[#D07030] text-[#7B1F0F] px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 hover:bg-white px-4 py-2 rounded-lg flex items-center justify-center shadow-lg"
              >
                <Eye className="w-4 h-4 text-[#7B1F0F]" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-semibold text-white text-lg mb-2 line-clamp-1 group-hover:text-[#F5C080] transition-colors">
              {product.name}
            </h3>
            <p className="text-white/60 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-[#F5C080]">
                  ${product.price.toLocaleString()}
                </p>
                <p className="text-xs text-white/40">Envío gratis</p>
              </div>

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity"
              >
                {product.category === 'mates' && '🧉'}
                {product.category === 'yerba' && '🌿'}
                {product.category === 'bombillas' && '✨'}
              </motion.div>
            </div>
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background:
                'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
