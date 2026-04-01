import { motion } from 'motion/react';
import { Link } from 'react-router';
import { InfiniteCarousel } from '../components/InfiniteCarousel';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { PromoBanner } from '../components/PromoBanner';
import { useProducts } from '../contexts/ProductsContext';
import { getCategories } from '../data/products';
import { useCategories } from '../contexts/CategoriesContext';
import { usePageConfig } from '../contexts/PageConfigContext';

export const Home = () => {
  const { products } = useProducts();
  const { visibleCategories: categories } = useCategories();
  const { config } = usePageConfig();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] via-[#7B1F0F] to-[#120505]">
      {/* Productos destacados - Carrusel infinito */}
      {featuredProducts.length > 0 && (
        <section id="productos" className="mb-28 pt-20 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xs font-sans tracking-[0.25em] uppercase text-[#c8945a] mb-3">Selección especial</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Productos Destacados
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c8945a] to-transparent mx-auto mt-4" />
            </motion.div>
          </div>
          <InfiniteCarousel products={featuredProducts} />
        </section>
      )}

      {/* Banner de oferta */}
      <PromoBanner />

      {/* Secciones por categoría */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 pb-28">
        {categories.map((category, categoryIndex) => {
          const categoryProducts = products.filter(
            (p) => getCategories(p).includes(category.id)
          );

          if (categoryProducts.length === 0) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.15 }}
              className="mb-24"
            >
              <div className="mb-10">
                <div className="flex items-end gap-5 mb-3">
                  <motion.span
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: categoryIndex * 0.4 }}
                    className="text-4xl leading-none"
                  >
                    {category.icon}
                  </motion.span>
                  <div>
                    <Link to={`/category/${category.id}`}>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-none hover:text-[#c8945a] transition-colors cursor-pointer">
                        {category.name}
                      </h2>
                    </Link>
                  </div>
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-[#c8945a] to-transparent mb-4" />
                <p className="text-white/50 max-w-2xl text-sm font-light tracking-wide">
                  {category.id === 'mates' && 'Mates artesanales seleccionados, curados con cariño y tradición.'}
                  {category.id === 'yerba' && 'Blends exclusivos y yerba mate premium para cada momento del día.'}
                  {category.id === 'bombillas' && 'Bombillas de primera calidad en alpaca y acero inoxidable.'}
                  {category.id === 'articulos' && 'Todo lo que necesitás para disfrutar tu mate al máximo.'}
                  {category.id === 'combos' && 'Combos armados y regalos especiales para los amantes del mate.'}
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
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl mb-8"
            >
              🧉
            </motion.div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              ¿Listo para tu próximo mate?
            </h2>
            <p className="text-white/70 mb-10 text-base max-w-xl mx-auto font-light tracking-wide">
              Consultanos por WhatsApp y hacé tu pedido. Envíos a todo el país.
            </p>
            <a
              href={`https://wa.me/${config.whatsappNumber || '5491135811888'}?text=Hola!%20Quiero%20consultar%20por%20productos`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 overflow-hidden border-2 border-[#25D366] text-[#25D366] px-8 py-4 rounded-full font-semibold text-base tracking-wide group"
            >
              <span className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <svg className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
