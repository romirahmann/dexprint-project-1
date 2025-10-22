/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#ff9a3e] to-[#ff6a00] text-center text-white relative overflow-hidden">
      {/* Background Accent */}
      <motion.div
        className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Siap Cetak Ide Hebatmu?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-orange-50 leading-relaxed">
          Konsultasikan kebutuhan printing kamu sekarang. Kami bantu wujudkan
          hasil terbaik untuk bisnis, event, atau brand-mu dengan harga
          bersahabat.
        </p>

        <motion.a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-white text-[#ff6a00] font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <FaWhatsapp className="text-2xl" />
          Chat via WhatsApp
        </motion.a>
      </motion.div>

      {/* Decorative motion elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full blur-2xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-16 w-20 h-20 bg-white/10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
    </section>
  );
}
