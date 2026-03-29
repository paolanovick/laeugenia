import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { ProductCard } from '../components/ProductCard';

export const Category = () => {
  const { categoryId } = useParams();
  const { products } = useProducts();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl text-white mb-4">Categoría no encontrada</h1>
          <Link
            to="/"
            className="text-[#F5C080] hover:text-[#D07030] inline-flex items-center gap-2"
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
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#F5C080] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </motion.div>
        </Link>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl inline-block mb-4"
          >
            {category.icon}
          </motion.span>
          <h1 className="text-5xl font-bold text-white mb-4">{category.name}</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#F5C080] to-transparent rounded-full mx-auto mb-4" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {category.id === 'mates' &&
              'Descubrí nuestra colección de mates artesanales, elaborados con materiales de primera calidad.'}
            {category.id === 'yerba' &&
              'Explorá nuestros blends exclusivos y yerba mate premium seleccionada.'}
            {category.id === 'bombillas' &&
              'Encontrá la bombilla perfecta entre nuestra selección de alpaca y acero inoxidable.'}
            {category.id === 'articulos' &&
              'Todo lo que necesitás para disfrutar tu mate al máximo.'}
            {category.id === 'combos' &&
              'Combos armados y regalos especiales para los amantes del mate.'}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <p className="text-white/50 text-xl">
              No hay productos en esta categoría
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
