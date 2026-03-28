import { Link } from 'react-router';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#7B1F0F] to-[#120505] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🧉</span>
              <div>
                <h3 className="text-xl font-bold">
                  Mate<span className="text-[#F5C080]">Cultura</span>
                </h3>
                <p className="text-xs text-white/60">Tradición en cada mate</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Mates artesanales, yerba premium y bombillas de calidad.
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
            <h4 className="font-semibold text-lg mb-4">Seguinos</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center space-x-3 text-white/70 hover:text-[#F5C080] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#F5C080]/20 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Instagram</span>
                </motion.div>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center space-x-3 text-white/70 hover:text-[#F5C080] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#F5C080]/20 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Facebook</span>
                </motion.div>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center space-x-3 text-white/70 hover:text-[#F5C080] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#F5C080]/20 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Twitter</span>
                </motion.div>
              </a>

              <a href="mailto:info@matecultura.com" className="group">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center space-x-3 text-white/70 hover:text-[#F5C080] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#F5C080]/20 transition-colors">
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
            <h4 className="font-semibold text-lg mb-4">Información Legal</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/terms">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="text-sm text-white/70 hover:text-[#F5C080] transition-colors inline-block"
                >
                  Términos y Condiciones
                </motion.div>
              </Link>
              <Link to="/privacy">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="text-sm text-white/70 hover:text-[#F5C080] transition-colors inline-block"
                >
                  Política de Privacidad
                </motion.div>
              </Link>
              <Link to="/shipping">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="text-sm text-white/70 hover:text-[#F5C080] transition-colors inline-block"
                >
                  Envíos y Devoluciones
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="text-sm text-white/70 hover:text-[#F5C080] transition-colors inline-block"
                >
                  Contacto
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-white/50">
              © 2026 La Eugenia & Flia.. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-white/50">Powered by</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-red-400"
              >
                ❤️
              </motion.span>
              <a href="https://www.concodigoart.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors">con Código ART</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
