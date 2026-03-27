import { motion } from 'motion/react';
import { InfiniteCarousel } from '../components/InfiniteCarousel';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { useProducts } from '../contexts/ProductsContext';
import { categories } from '../data/products';

export const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] via-[#7B1F0F] to-[#120505]">
      {/* Productos destacados - Carrusel infinito */}
      {featuredProducts.length > 0 && (
        <section id="productos" className="mb-20 pt-40">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide uppercase">
                ⭐ Productos Destacados
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#F5C080] to-transparent rounded-full mx-auto mt-3" />
            </motion.div>
          </div>
          <InfiniteCarousel products={featuredProducts} />
        </section>
      )}

      {/* Secciones por categoría */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 pb-20">
        {categories.map((category, categoryIndex) => {
          const categoryProducts = products.filter(
            (p) => p.category === category.id
          );

          if (categoryProducts.length === 0) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="mb-16"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.3 }}
                    className="text-5xl"
                  >
                    {category.icon}
                  </motion.span>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {category.name}
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#F5C080] to-transparent rounded-full mt-2" />
                  </div>
                </div>
                <p className="text-white/60 max-w-2xl">
                  {category.id === 'mates' && 'Mates artesanales seleccionados, curados con cariño y tradición.'}
                  {category.id === 'yerba' && 'Blends exclusivos y yerba mate premium para cada momento del día.'}
                  {category.id === 'bombillas' && 'Bombillas de primera calidad en alpaca y acero inoxidable.'}
                </p>
              </div>

              <CategoryCarousel products={categoryProducts} category={category.id} />
            </motion.div>
          );
        })}
      </section>

      {/* CTA WhatsApp */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 pb-20"
      >
        <div className="relative bg-gradient-to-br from-[#C4351A] to-[#7B1F0F] rounded-3xl p-12 md:p-16 overflow-hidden border border-white/10">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>
          <div className="relative z-10 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🧉
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para tu próximo mate?
            </h2>
            <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
              Consultanos por WhatsApp y hacé tu pedido. Envíos a todo el país.
            </p>
            <motion.a
              href="https://wa.me/5491234567890?text=Hola!%20Quiero%20consultar%20por%20productos"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contactar por WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
