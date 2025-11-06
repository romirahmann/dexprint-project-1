/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";
import { baseApi } from "../../../services/api.service";

export function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get("/master/products");
        console.log(res.data.data);
        const data = res.data.data;

        console.log(`${baseApi}master/image/`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProduct();
  }, []);

  return (
    <section id="products" className="py-24 bg-white text-center px-6 md:px-16">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-[#ff9a3e] mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Produk Percetakan Unggulan
      </motion.h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Temukan berbagai produk cetak berkualitas — mulai dari kartu nama,
        kemasan, hingga souvenir custom untuk kebutuhan bisnis Anda.
      </p>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-md group bg-white"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={`${baseApi}master/image/${item.productIMG}`}
              alt={item.productName}
              className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
            />

            {/* Overlay info */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              <h3 className="text-lg font-semibold mb-1">{item.productName}</h3>
              <p className="text-orange-300 text-sm font-medium">
                {item.categoryName}
              </p>
              <p className="text-sm mt-2 max-w-xs text-center opacity-90">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button to all products */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          className="bg-[#ff9a3e] hover:bg-[#ff7f11] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
          onClick={() => (window.location.href = "/products")}
        >
          Lihat Semua Produk
        </button>
      </motion.div>
    </section>
  );
}
