/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export function PartnerSection() {
  const partners = [
    {
      name: "Tokopedia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tokopedia.svg",
    },
    {
      name: "Shopee",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Shopee.svg",
    },
    {
      name: "Grab",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Grab_logo.svg",
    },
    {
      name: "Gojek",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Gojek_logo_2021.svg",
    },
    {
      name: "Bukalapak",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Bukalapak_logo.svg",
    },
  ];

  // Gandakan array supaya animasi terasa seamless
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-3 text-[#ff9a3e]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dipercaya Oleh Banyak Brand
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          PrintEase telah dipercaya oleh berbagai brand dan pelaku UMKM dalam
          mencetak dan memproduksi kebutuhan bisnis mereka.
        </p>
      </div>

      {/* Container marquee */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-16 md:gap-24 px-8 md:px-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {duplicatedPartners.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-28 md:w-36 grayscale hover:grayscale-0 transition duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="object-contain w-full h-12"
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient fade di kanan & kiri agar lebih halus */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
