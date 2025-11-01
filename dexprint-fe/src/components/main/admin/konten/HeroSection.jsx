/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiSave, FiUpload, FiTrash2, FiPlus } from "react-icons/fi";

export default function HeroSectionManager() {
  const [hero, setHero] = useState({
    tagline: "Cetak Kualitas Terbaik, Untuk Setiap Kebutuhan Anda.",
    subtext: "Percetakan profesional dengan hasil cepat, rapi, dan presisi.",
    banners: [
      "/assets/banner1.jpg",
      "/assets/banner2.jpg",
      "/assets/banner3.jpg",
    ],
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const fileInputs = useRef([]);

  const handleEdit = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const handleSave = (field) => {
    setHero({ ...hero, [field]: tempValue });
    setEditField(null);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      const updatedBanners = [...hero.banners];
      updatedBanners[index] = imageURL;
      setHero({ ...hero, banners: updatedBanners });
    }
  };

  const triggerFileInput = (index) => {
    fileInputs.current[index].click();
  };

  const handleDeleteBanner = (index) => {
    const updatedBanners = hero.banners.filter((_, i) => i !== index);
    setHero({ ...hero, banners: updatedBanners });
  };

  const handleAddBanner = () => {
    setHero({
      ...hero,
      banners: [...hero.banners, "/assets/default-banner.jpg"],
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100 w-full max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Hero Section</h2>
        <button
          onClick={handleAddBanner}
          className="flex items-center gap-2 bg-orange-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-all"
        >
          <FiPlus size={16} /> Tambah Banner
        </button>
      </div>

      {/* Banner Images */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
          Banner Images
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnimatePresence>
            {hero.banners.map((banner, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden group shadow-sm"
              >
                <img
                  src={banner}
                  alt={`Banner ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Edit / Upload */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => triggerFileInput(i)}
                    className="bg-white/90 hover:bg-orange-500 hover:text-white text-gray-700 p-2 rounded-full shadow"
                    title="Ganti Gambar"
                  >
                    <FiUpload size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(i)}
                    className="bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 p-2 rounded-full shadow"
                    title="Hapus Gambar"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => (fileInputs.current[i] = el)}
                  onChange={(e) => handleImageChange(e, i)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Tagline */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase mb-1 font-semibold">
          Tagline
        </p>
        {editField === "tagline" ? (
          <div className="flex items-center gap-2">
            <input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            />
            <button
              onClick={() => handleSave("tagline")}
              className="bg-orange-500 text-white px-3 py-1.5 rounded-lg"
            >
              <FiSave size={16} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{hero.tagline}</p>
            <button
              onClick={() => handleEdit("tagline", hero.tagline)}
              className="text-gray-400 hover:text-orange-500"
            >
              <FiEdit2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Sub Description */}
      <div>
        <p className="text-xs text-gray-400 uppercase mb-1 font-semibold">
          Sub Description
        </p>
        {editField === "subtext" ? (
          <div className="flex items-center gap-2">
            <input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            />
            <button
              onClick={() => handleSave("subtext")}
              className="bg-orange-500 text-white px-3 py-1.5 rounded-lg"
            >
              <FiSave size={16} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{hero.subtext}</p>
            <button
              onClick={() => handleEdit("subtext", hero.subtext)}
              className="text-gray-400 hover:text-orange-500"
            >
              <FiEdit2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
