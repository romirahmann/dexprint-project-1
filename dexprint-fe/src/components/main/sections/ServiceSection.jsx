/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaBoxOpen, FaPrint, FaTshirt, FaIdCard } from "react-icons/fa";

export function ServiceSection() {
  const services = [
    {
      icon: <FaBoxOpen className="text-[#ff9a3e] text-4xl mb-4" />,
      title: "Cetak Kemasan Produk",
      desc: "Kemasan menarik dan profesional yang meningkatkan nilai jual brand Anda.",
      img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaPrint className="text-[#ff9a3e] text-4xl mb-4" />,
      title: "Digital & Offset Printing",
      desc: "Dari brosur, flyer, hingga banner — hasil cetak tajam dengan warna akurat.",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaTshirt className="text-[#ff9a3e] text-4xl mb-4" />,
      title: "Merchandise Custom",
      desc: "T-shirt, tote bag, dan berbagai produk custom untuk promosi usaha Anda.",
      img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaIdCard className="text-[#ff9a3e] text-4xl mb-4" />,
      title: "Kartu Nama & Undangan",
      desc: "Cetak kartu nama, undangan, dan stationery bisnis dengan desain elegan.",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-white to-orange-50 text-center"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-[#ff9a3e] mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Layanan Kami
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            {/* Gambar background */}
            <div className="h-48 overflow-hidden">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Konten */}
            <div className="p-6">
              {service.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
