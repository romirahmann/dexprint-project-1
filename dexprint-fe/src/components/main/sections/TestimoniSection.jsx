/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Dewi Anjani",
      role: "Owner Dewa Craft",
      message:
        "Pelayanan cepat dan hasil cetak sangat memuaskan! PrintEase membantu kemasan produk saya terlihat lebih profesional.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Rizky Maulana",
      role: "Desainer Grafis Freelance",
      message:
        "Suka banget dengan hasil warna dan ketepatan cetaknya. Proses order juga mudah, cocok banget buat kreator muda.",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328a40f7?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Sari Putri",
      role: "UMKM Snack Lokal",
      message:
        "PrintEase bantu banget buat kemasan snack saya tampil lebih menarik dan eksklusif. Recommended banget!",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-4 text-[#ff9a3e]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Apa Kata Pelanggan Kami
      </motion.h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Kami berkomitmen memberikan kualitas terbaik dan pengalaman cetak yang
        menyenangkan untuk semua pelanggan kami.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg relative flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <FaQuoteLeft className="text-[#ff9a3e] text-3xl absolute top-4 left-4 opacity-30" />
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#ff9a3e]/40"
            />
            <p className="text-gray-700 italic mb-4 leading-relaxed">
              “{item.message}”
            </p>
            <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
            <span className="text-sm text-gray-500">{item.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
