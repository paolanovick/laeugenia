import { Link } from 'react-router';
import { Mail } from 'lucide-react';
import { motion } from 'motion/react';

const IconInstagram = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const IconFacebook = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#7B1F0F] to-[#0e0b08] text-white mt-28">
      {/* Editorial tagline */}
      <div className="border-b border-[#c8945a]/20 py-14 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl text-white/90 font-normal italic tracking-tight"
        >
          "Te proponemos una experiencia que toca el alma dejando huellas."
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <img src="/logoSF.png" alt="La Eugenia & Flia." className="h-20 w-auto drop-shadow-lg" />
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Mates artesanales, yerba premium, bombillas, artículos materos y combos especiales.
              Llevamos la tradición argentina a tu hogar con productos
              seleccionados por expertos.
            </p>
          </motion.div>

          {/* Column 2: Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-sans font-semibold text-sm tracking-[0.15em] uppercase text-white/50 mb-5">Seguinos</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/laeugenia.flia/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-3 text-white/60 hover:text-[#c8945a] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#c8945a]/15 transition-colors">
                    <IconInstagram />
                  </div>
                  <span className="text-sm">Instagram</span>
                </motion.div>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61551953244438"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-3 text-white/60 hover:text-[#c8945a] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#c8945a]/15 transition-colors">
                    <IconFacebook />
                  </div>
                  <span className="text-sm">Facebook</span>
                </motion.div>
              </a>

              <a href="mailto:claudiavivianamikikiuk@yahoo.com.ar" className="group">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-3 text-white/60 hover:text-[#c8945a] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#c8945a]/15 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Email</span>
                </motion.div>
              </a>
            </div>
          </motion.div>

          {/* Column 3: Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-sans font-semibold text-sm tracking-[0.15em] uppercase text-white/50 mb-5">Información</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/terms">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="text-sm text-white/60 hover:text-[#c8945a] transition-colors inline-block"
                >
                  Términos y Condiciones
                </motion.div>
              </Link>
              <Link to="/privacy">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="text-sm text-white/60 hover:text-[#c8945a] transition-colors inline-block"
                >
                  Política de Privacidad
                </motion.div>
              </Link>
              <Link to="/shipping">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="text-sm text-white/60 hover:text-[#c8945a] transition-colors inline-block"
                >
                  Envíos y Devoluciones
                </motion.div>
              </Link>
              <a href="mailto:claudiavivianamikikiuk@yahoo.com.ar">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="text-sm text-white/60 hover:text-[#c8945a] transition-colors inline-block"
                >
                  Contacto
                </motion.div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-white/30 font-light tracking-wide">
              © 2026 La Eugenia & Flia. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-white/30">Hecho con</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-red-400/70"
              >
                ❤️
              </motion.span>
              <a href="https://www.concodigoart.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-[#c8945a] transition-colors">con Código ART</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
