import { motion } from 'motion/react';

export const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Política de Privacidad</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-[#F5C080] to-transparent rounded-full mb-8" />

        <div className="space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Información que recopilamos</h2>
            <p>Cuando realizás una compra o nos contactás, podemos recopilar datos personales como nombre, dirección de correo electrónico, número de teléfono y dirección de entrega. Esta información es utilizada exclusivamente para procesar tu pedido y brindarte atención.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Uso de la información</h2>
            <p>Los datos personales que nos proporcionás se utilizan para: procesar y enviar tus pedidos, comunicarnos con vos sobre el estado de tu compra, mejorar nuestros productos y servicios, y enviarte información sobre novedades y promociones (solo si nos diste tu consentimiento).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Protección de datos</h2>
            <p>Tu información personal es tratada con estricta confidencialidad. No vendemos, alquilamos ni compartimos tus datos con terceros, salvo que sea necesario para completar tu pedido (por ejemplo, con servicios de envío).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Cookies</h2>
            <p>Este sitio puede utilizar cookies para mejorar tu experiencia de navegación. Podés configurar tu navegador para rechazar las cookies, aunque esto podría afectar algunas funcionalidades del sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Tus derechos</h2>
            <p>Tenés derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contactanos en{' '}
              <a href="mailto:claudiavivianamikikiuk@yahoo.com.ar" className="text-[#F5C080] hover:underline">
                claudiavivianamikikiuk@yahoo.com.ar
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Cambios en esta política</h2>
            <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios importantes publicando la nueva versión en este sitio.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
