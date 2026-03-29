import { motion } from 'motion/react';

export const Shipping = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Envíos y Devoluciones</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-[#F5C080] to-transparent rounded-full mb-8" />

        <div className="space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Envíos</h2>
            <p>Realizamos envíos a todo el país a través de correo argentino y servicios de mensajería. El costo y el tiempo de entrega varían según la localidad de destino y se informan al momento de confirmar el pedido.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Envío gratis</h2>
            <p>Ofrecemos envío sin cargo para compras que superen el monto mínimo vigente, el cual se informa en el sitio. Consultanos por WhatsApp o mail para conocer la promoción activa.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Tiempos de entrega</h2>
            <p>Una vez confirmado y acreditado el pago, preparamos tu pedido en 1 a 2 días hábiles. Los tiempos de tránsito dependen del destino: entre 3 y 10 días hábiles para el interior del país, y entre 1 y 3 días para Buenos Aires y GBA.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Seguimiento del pedido</h2>
            <p>Una vez despachado tu paquete, te enviamos el número de seguimiento para que puedas rastrear tu envío en tiempo real.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Devoluciones y cambios</h2>
            <p>Si recibís un producto con defecto o diferente al solicitado, tenés hasta 10 días corridos desde la recepción para comunicarte con nosotros. El cambio o reembolso se gestiona sin costo adicional para vos.</p>
            <p className="mt-2">Para iniciar una devolución, escribinos a{' '}
              <a href="mailto:claudiavivianamikikiuk@yahoo.com.ar" className="text-[#F5C080] hover:underline">
                claudiavivianamikikiuk@yahoo.com.ar
              </a>{' '}
              con tu número de pedido y una descripción del problema.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Productos no aptos para devolución</h2>
            <p>Por razones de higiene, no se aceptan devoluciones de yerbas y blends una vez abiertos el packaging original.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
