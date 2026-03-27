import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} eliminado del carrito`);
  };

  const handleCheckoutWhatsApp = () => {
    const message = `Hola! Quiero realizar el siguiente pedido:\n\n${cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n')}\n\nTotal: $${getCartTotal().toLocaleString()}`;

    window.open(
      `https://wa.me/5491234567890?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <ShoppingBag className="w-24 h-24 text-white/30 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-white/60 mb-8">
            Explorá nuestros productos y agregá los que más te gusten
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#F5C080] hover:bg-[#D07030] text-[#7B1F0F] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a la tienda
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <motion.div
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-white/70 hover:text-[#F5C080] transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Seguir comprando</span>
            </motion.div>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Carrito de Compras
          </motion.h1>
          <p className="text-white/60">
            {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu
            carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-[#C4351A]/20 to-[#7B1F0F]/20">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-white hover:text-[#F5C080] transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-white/50 text-sm">
                          {item.category === 'mates' && '🧉 Mates'}
                          {item.category === 'yerba' && '🌿 Yerba & Blends'}
                          {item.category === 'bombillas' && '✨ Bombillas'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-5 h-5 text-white/50 group-hover:text-red-400 transition-colors" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#F5C080]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-white/50">
                          ${item.price.toLocaleString()} c/u
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: cart.length * 0.1 }}
              onClick={() => {
                clearCart();
                toast.success('Carrito vaciado');
              }}
              className="w-full py-3 text-white/50 hover:text-red-400 transition-colors text-sm"
            >
              Vaciar carrito
            </motion.button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-gradient-to-br from-[#C4351A]/30 to-[#7B1F0F]/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Resumen</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Envío</span>
                  <span className="text-[#F5C080] font-semibold">GRATIS</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-white">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-[#F5C080]">
                      ${getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-colors mb-4"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Finalizar por WhatsApp
              </motion.button>

              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F5C080] rounded-full" />
                  <span>Envío gratis a todo el país</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F5C080] rounded-full" />
                  <span>Pago seguro por WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F5C080] rounded-full" />
                  <span>Garantía en todos los productos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
