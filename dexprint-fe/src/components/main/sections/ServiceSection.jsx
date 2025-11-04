/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaComments, FaPencilRuler, FaPrint } from "react-icons/fa";

export function ServiceSection() {
  const services = [
    {
      icon: <FaComments className="text-brand-orange text-4xl mb-4" />,
      title: "Layanan Konsultasi",
      desc: "Layanan konsultasi produk cetak atau digital visual dengan tim ahli terbaik.",
      img: "https://images.unsplash.com/photo-1522202222206-1d55b87b2a1e?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaPencilRuler className="text-brand-orange text-4xl mb-4" />,
      title: "Desain Kreatif",
      desc: "Kami bantu wujudkan identitas visual brand Anda dengan desain yang menarik dan profesional.",
      img: "Layanan desain grafis untuk kebutuhan cetak atau visual digital. Dikerjakan oleh tim graphic designer kreatif terbaik.",
    },
    {
      icon: <FaPrint className="text-brand-orange text-4xl mb-4" />,
      title: "Printing Berkualitas",
      desc: "Layanan cetak terlengkap untuk kebutuhan branding promosi, acara, personal, operasional.",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-linear-to-b from-white to-orange-50 text-center"
    >
      {/* Judul */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Layanan Kami
      </motion.h2>

      {/* Grid layanan */}
      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-16 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            {/* Konten */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
