/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";

export function CompanySection() {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const fetchById = async () => {
      try {
        const res = await api.get("/master/profile/1");
        setCompanyInfo(res.data.data);
      } catch (error) {
        console.log("Error fetching company profile:", error);
      }
    };
    fetchById();
  }, []);

  if (!companyInfo) {
    return (
      <section className="py-20 bg-white text-center">
        <p className="text-gray-500 animate-pulse">Memuat data perusahaan...</p>
      </section>
    );
  }

  return (
    <section
      id="company"
      className="py-20 bg-white text-center md:text-left px-6 md:px-16 flex flex-col md:flex-row items-center gap-12"
    >
      {/* Gambar atau Ilustrasi */}
      <motion.img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        alt={companyInfo.companyName}
        className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Info Perusahaan */}
      <div className="md:w-1/2 space-y-5">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-2 text-[#ff9a3e]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tentang {companyInfo.companyName}
        </motion.h2>

        {/* Deskripsi */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {companyInfo.description}
        </p>

        {/* Visi & Misi */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#ff9a3e] mb-2">Visi</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {companyInfo.vision}
          </p>

          <h3 className="text-2xl font-semibold text-[#ff9a3e] mt-6 mb-2">
            Misi
          </h3>
          <p className="text-gray-700 whitespace-pre-line">
            {companyInfo.mission}
          </p>
        </div>
      </div>
    </section>
  );
}
