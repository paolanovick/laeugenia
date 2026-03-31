import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Eye } from 'lucide-react';
import { categories } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { useCart } from '../contexts/CartContext';
import { usePageConfig } from '../contexts/PageConfigContext';
import { resolveImageUrl } from '../utils/image';
import { toast } from 'sonner';

const categoryDescriptions: Record<string, string> = {
  mates: 'Descubrí nuestra colección de mates artesanales, elaborados con materiales de primera calidad.',
  yerba: 'Explorá nuestros blends exclusivos y yerba mate premium seleccionada.',
  bombillas: 'Encontrá la bombilla perfecta entre nuestra selección de alpaca y acero inoxidable.',
  articulos: 'Todo lo que necesitás para disfrutar tu mate al máximo.',
  combos: 'Combos armados y regalos especiales para los amantes del mate.',
};

export const Category = () => {
  const { categoryId } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { config } = usePageConfig();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl text-white mb-4">Categoría no encontrada</h1>
          <Link
            to="/"
            className="text-[#c8945a] hover:text-white inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] via-[#7B1F0F] to-[#120505] pt-24 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c8945a] transition-colors mb-10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm tracking-wide">Volver al inicio</span>
          </motion.div>
        </Link>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-end gap-4 mb-3">
            <span className="text-5xl leading-none">{category.icon}</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-none">
              {category.name}
            </h1>
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-[#c8945a] to-transparent mb-4" />
          <p className="text-white/50 text-sm font-light">
            {categoryDescriptions[category.id]}
          </p>
        </motion.div>

        {/* Product count */}
        <p className="text-white/30 text-xs tracking-widest uppercase mb-6">
          {categoryProducts.length} {categoryProducts.length === 1 ? 'producto' : 'productos'}
        </p>

        {/* Products — lista vertical */}
        <div className="space-y-4">
          {categoryProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-2xl overflow-hidden hover:border-[#c8945a]/30 transition-colors"
            >
              <div className="flex gap-0">
                {/* Image */}
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-[#1a0a0a] overflow-hidden">
                    <motion.img
                      src={resolveImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 px-5 py-4 flex flex-col justify-between min-w-0">
                  <div>
                    {product.featured && (
                      <span className="inline-block text-xs text-[#c8945a] border border-[#c8945a]/40 rounded-full px-2 py-0.5 mb-2">
                        Destacado
                      </span>
                    )}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-serif font-semibold text-white text-lg leading-snug hover:text-[#c8945a] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-white/45 text-xs mt-1 line-clamp-2 font-light">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 gap-3">
                    <div>
                      <p className="text-xl font-bold text-[#c8945a]">
                        ${product.price.toLocaleString('es-AR')}
                      </p>
                      {config.shippingText && (
                        <p className="text-xs text-white/30">{config.shippingText}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          addToCart(product);
                          toast.success(`${product.name} agregado al carrito`, { icon: '🧉' });
                        }}
                        className="relative overflow-hidden border border-[#c8945a] text-[#c8945a] px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 group/btn"
                      >
                        <span className="absolute inset-0 bg-[#c8945a] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                        <ShoppingCart className="w-3.5 h-3.5 relative z-10 group-hover/btn:text-[#0e0b08] transition-colors duration-300" />
                        <span className="relative z-10 group-hover/btn:text-[#0e0b08] transition-colors duration-300 hidden sm:inline">Agregar</span>
                      </motion.button>

                      <Link to={`/product/${product.id}`}>
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className="relative overflow-hidden border border-white/20 text-white/50 px-3 py-2 rounded-lg flex items-center justify-center group/eye"
                        >
                          <span className="absolute inset-0 bg-white/90 translate-y-full group-hover/eye:translate-y-0 transition-transform duration-300 ease-out" />
                          <Eye className="w-3.5 h-3.5 relative z-10 group-hover/eye:text-[#7B1F0F] transition-colors duration-300" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/50 text-xl">
              No hay productos en esta categoría
            </p>
          </motion.div>
        )}

        {/* Back to home — bottom */}
        <div className="mt-12 text-center">
          <Link to="/">
            <motion.span
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-white/40 hover:text-[#c8945a] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
};
