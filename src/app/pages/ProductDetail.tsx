import { useState } from 'react';
import { getCategories } from '../data/products';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  Truck,
  Shield,
  Package,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { resolveImageUrl } from '../utils/image';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';
import { usePageConfig } from '../contexts/PageConfigContext';
import { toast } from 'sonner';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { config } = usePageConfig();
  const product = products.find((p) => p.id === id);
  const { addToCart, updateQuantity: updateCartQuantity, cart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);

  // Quantity is derived from cart so the navbar updates in real time
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem?.quantity ?? 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl text-white mb-4">Producto no encontrado</h1>
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

  const productCats = getCategories(product).filter((c) => c !== 'publicidad');
  const relatedProducts = products
    .filter((p) => p.id !== product.id && getCategories(p).some((c) => productCats.includes(c)))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`, {
      icon: '🧉',
    });
  };

  const handleBuyWhatsApp = () => {
    const qty = Math.max(1, quantity);
    const unitStr = qty === 1 ? 'unidad' : 'unidades';
    const message = `¡Hola! 😊 Me interesa comprar en *La Eugenia & Flia.*:\n\n🧉 *${product.name}*\nCantidad: ${qty} ${unitStr}\nPrecio: $${(product.price * qty).toLocaleString('es-AR')}\n\n¡Quedo a la espera, muchas gracias! 🙏`;
    const number = config.whatsappNumber || '5491135811888';
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] via-[#7B1F0F] to-[#120505] pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#F5C080] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative bg-[#1a0a0a] rounded-2xl overflow-hidden border border-white/20 aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={resolveImageUrl(product.images[selectedImage])}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain p-4"
                />
              </AnimatePresence>

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-4 right-4 bg-[#F5C080] text-[#7B1F0F] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Destacado
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#F5C080] ring-2 ring-[#F5C080]/50'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={resolveImageUrl(image)}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-[#C4351A]/30 border border-[#C4351A] rounded-full text-sm text-white/80 mb-4">
                {(() => {
                  const labels: Record<string, string> = { mates: '🧉 Mates', yerba: '🌿 Yerba & Blends', bombillas: '✨ Bombillas', articulos: '🪔 Artículos Materos', combos: '🎁 Combos y Regalos' };
                  return getCategories(product).filter((c) => c !== 'publicidad').map((c) => labels[c]).filter(Boolean).join(' · ');
                })()}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>


              {/* Price */}
              <div className="mb-8">
                <p className="text-5xl font-bold text-[#F5C080] mb-2">
                  ${product.price.toLocaleString('es-AR')}
                </p>
                {config.shippingText && <p className="text-white/60">{config.shippingText}</p>}
              </div>

              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#F5C080]" />
                  Especificaciones
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specs.map((spec, index) => (
                    <div key={index}>
                      <p className="text-white/50 text-sm">{spec.label}</p>
                      <p className="text-white font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector — operates directly on cart */}
              <div className="mb-8">
                <label className="block text-white mb-2 font-medium">
                  Cantidad en carrito
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    disabled={quantity === 0}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg border border-white/20 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-[#F5C080] hover:bg-[#D07030] text-[#7B1F0F] px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Agregar al Carrito
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Comprar por WhatsApp
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <Truck className="w-6 h-6 text-[#F5C080] mx-auto mb-2" />
                  <p className="text-xs text-white/70">Envío Gratis</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <Shield className="w-6 h-6 text-[#F5C080] mx-auto mb-2" />
                  <p className="text-xs text-white/70">Garantía</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <Package className="w-6 h-6 text-[#F5C080] mx-auto mb-2" />
                  <p className="text-xs text-white/70">Envío Seguro</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Productos Relacionados
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#F5C080] to-transparent rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};
