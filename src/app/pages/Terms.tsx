import { motion } from 'motion/react';

export const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Términos y Condiciones</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-[#F5C080] to-transparent rounded-full mb-8" />

        <div className="space-y-6 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Aceptación de los términos</h2>
            <p>Al acceder y utilizar este sitio web, aceptás cumplir y quedar vinculado por los presentes Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestro sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Productos y precios</h2>
            <p>Todos los precios publicados en el sitio están expresados en pesos argentinos (ARS) e incluyen IVA. La Eugenia & Flia. se reserva el derecho de modificar los precios sin previo aviso. Los pedidos confirmados y pagados se respetan al precio vigente al momento de la compra.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Compra y pago</h2>
            <p>Los pedidos se coordinan a través de WhatsApp o por correo electrónico. La confirmación de la compra se realiza una vez acreditado el pago. Aceptamos transferencia bancaria y otros medios acordados con el comprador.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Disponibilidad de stock</h2>
            <p>La disponibilidad de los productos está sujeta al stock existente. En caso de que un artículo no esté disponible al momento de confirmar la compra, nos comunicaremos con vos para ofrecerte una alternativa o proceder con el reembolso correspondiente.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Propiedad intelectual</h2>
            <p>Todo el contenido de este sitio (imágenes, textos, logotipos y diseño) es propiedad de La Eugenia & Flia. y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción sin autorización expresa.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Contacto</h2>
            <p>Para consultas sobre estos términos podés escribirnos a{' '}
              <a href="mailto:claudiavivianamikikiuk@yahoo.com.ar" className="text-[#F5C080] hover:underline">
                claudiavivianamikikiuk@yahoo.com.ar
              </a>.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
