/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export function PortfolioSection() {
  const portfolios = [
    {
      img: "https://images.unsplash.com/photo-1607083208693-cc2a9af8f3b4?auto=format&fit=crop&w=800&q=80",
      title: "Banner Outdoor Café",
      category: "Banner & Sign",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Poster Event Kampus",
      category: "Marketing Materials",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Kartu Nama Minimalis",
      category: "Office And Stationery",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Billboard Toko Retail",
      category: "Reklame And Advertising",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Souvenir Custom Logo",
      category: "Souvenir",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Ballpoint Stainless Eksklusif",
      category: "Ballpoint Stainless",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Tumbler Insert Paper Premium",
      category: "Drinkware",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Mug Printing Custom",
      category: "Mug",
    },
    {
      img: "https://images.unsplash.com/photo-1513863323776-7ea81f962ca4?auto=format&fit=crop&w=800&q=80",
      title: "Agenda Kulit Elegan",
      category: "Agenda",
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
        Portofolio Terbaik Kami
      </motion.h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Inilah beberapa hasil karya unggulan dari berbagai kategori — mulai dari
        banner, stationery, souvenir, hingga merchandise custom.
      </p>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.slice(0, 9).map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-md group"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-orange-300 text-sm font-medium">
                {item.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button to full portfolio */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          className="bg-[#ff9a3e] hover:bg-[#ff7f11] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
          onClick={() => (window.location.href = "/portfolio")}
        >
          Lihat Semua Portofolio
        </button>
      </motion.div>
    </section>
  );
}
