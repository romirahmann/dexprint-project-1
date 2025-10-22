/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export function PortfolioSection() {
  const portfolios = [
    {
      img: "https://images.unsplash.com/photo-1607083208693-cc2a9af8f3b4?auto=format&fit=crop&w=800&q=80",
      title: "Kemasan Produk UMKM",
      category: "Packaging Design",
    },
    {
      img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
      title: "Cetak Banner Promosi",
      category: "Large Format",
    },
    {
      img: "https://images.unsplash.com/photo-1629904853693-6a495b5b3d91?auto=format&fit=crop&w=800&q=80",
      title: "Kartu Nama Premium",
      category: "Stationery",
    },
    {
      img: "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
      title: "Merchandise Custom",
      category: "Merch",
    },
    {
      img: "https://images.unsplash.com/photo-1626285098973-18e37e9862d7?auto=format&fit=crop&w=800&q=80",
      title: "Undangan Elegant",
      category: "Invitation",
    },
    {
      img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=80",
      title: "Poster Event",
      category: "Promotional Print",
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-24 bg-white text-center px-6 md:px-16"
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-[#ff9a3e] mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Portofolio Kami
      </motion.h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Lihat beberapa hasil karya cetak yang telah kami buat untuk brand, UMKM,
        dan kreator muda. Kualitas tinggi, warna tajam, hasil memukau.
      </p>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-md group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Gambar */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
            />

            {/* Overlay */}
            <motion.div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-xl font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-orange-300 text-sm font-medium">
                {item.category}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
