/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export function CompanySection() {
  return (
    <section
      id="company"
      className="py-20 bg-white text-center md:text-left px-6 md:px-16 flex flex-col md:flex-row items-center gap-12"
    >
      <motion.img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        alt="Company"
        className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />
      <div className="md:w-1/2">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-4 text-[#ff9a3e]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tentang PrintEase
        </motion.h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Kami adalah solusi printing modern yang berfokus membantu UMKM dan
          kreator muda mencetak ide mereka jadi nyata. Dari kemasan, banner,
          hingga merchandise — kami siap mendukung kreativitas Anda dengan hasil
          terbaik.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Dengan teknologi cetak terkini dan tim profesional, kami memastikan
          setiap detail produk mencerminkan kualitas tinggi dan kepuasan
          pelanggan.
        </p>
      </div>
    </section>
  );
}
