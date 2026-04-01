import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useCategories } from '../contexts/CategoriesContext';
import { useProducts } from '../contexts/ProductsContext';
import { usePageConfig } from '../contexts/PageConfigContext';
import { getCategories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const categoryDescriptions: Record<string, string> = {
  mates: 'Descubrí nuestra colección de mates artesanales, elaborados con materiales de primera calidad.',
  yerba: 'Explorá nuestros blends exclusivos y yerba mate premium seleccionada.',
  bombillas: 'Encontrá la bombilla perfecta entre nuestra selección de alpaca y acero inoxidable.',
  articulos: 'Todo lo que necesitás para disfrutar tu mate al máximo.',
  combos: 'Combos armados y regalos especiales para los amantes del mate.',
  publicidad: 'Ofertas y productos especiales por tiempo limitado.',
};

export const Category = () => {
  const { categoryId } = useParams();
  const { products } = useProducts();
  const { categories } = useCategories();
  const { config } = usePageConfig();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => getCategories(p).includes(categoryId!));

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl text-white mb-4">Categoría no encontrada</h1>
          <Link to="/" className="text-[#c8945a] hover:text-white inline-flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] via-[#7B1F0F] to-[#120505] pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
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
              {categoryId === 'publicidad' && config.bannerTitle ? config.bannerTitle : category.name}
            </h1>
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-[#c8945a] to-transparent mb-4" />
          <p className="text-white/50 text-sm font-light max-w-2xl">
            {categoryDescriptions[category.id]}
          </p>
          <p className="text-white/30 text-xs tracking-widest uppercase mt-3">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </motion.div>

        {/* Products — mismas tarjetas que el carrusel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/50 text-xl">No hay productos en esta categoría</p>
          </motion.div>
        )}

        {/* Volver al inicio — bottom */}
        <div className="mt-14 text-center">
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
