import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useCategories } from '../contexts/CategoriesContext';
import { useProducts } from '../contexts/ProductsContext';
import { usePageConfig } from '../contexts/PageConfigContext';
import { getCategories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

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
  const [sort, setSort] = useState<SortKey>('default');
  const category = categories.find((c) => c.id === categoryId);

  const rawProducts = products.filter((p) => getCategories(p).includes(categoryId!));
  const categoryProducts = [...rawProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'name-asc') return a.name.localeCompare(b.name, 'es');
    return 0;
  });

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
            <span className="text-5xl leading-none">{categoryId === 'publicidad' && config.bannerEmoji ? config.bannerEmoji : category.icon}</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-none">
              {categoryId === 'publicidad' && config.bannerTitle ? config.bannerTitle : category.name}
            </h1>
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-[#c8945a] to-transparent mb-4" />
          <p className="text-white/50 text-sm font-light max-w-2xl">
            {categoryDescriptions[category.id]}
          </p>
          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
            <p className="text-white/30 text-xs tracking-widest uppercase">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'producto' : 'productos'}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-[#2a0a0a] text-white text-xs border border-white/20 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#c8945a] cursor-pointer"
            >
              <option value="default" className="bg-[#2a0a0a] text-white">Orden por defecto</option>
              <option value="price-asc" className="bg-[#2a0a0a] text-white">Precio: menor a mayor</option>
              <option value="price-desc" className="bg-[#2a0a0a] text-white">Precio: mayor a menor</option>
              <option value="name-asc" className="bg-[#2a0a0a] text-white">Nombre A→Z</option>
            </select>
          </div>
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
