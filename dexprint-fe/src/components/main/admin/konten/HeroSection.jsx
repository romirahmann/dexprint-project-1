/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiSave, FiUpload, FiTrash2, FiPlus } from "react-icons/fi";
import { Modal } from "../../../../shared/Modal";
import api from "../../../../services/axios.service";
import { useAlert } from "../../../../store/AlertContext";
import { listenToUpdate } from "../../../../services/socket.service";
import { ApiUrl, baseApi } from "../../../../services/api.service";

export default function HeroSectionManager() {
  const [hero, setHero] = useState({
    tagline: "...",
    subtext: "...",
    banners: [],
  });
  const { showAlert } = useAlert();
  const [isEditBanner, setIsEditBanner] = useState(false);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const fileInputs = useRef([]);

  useEffect(() => {
    fetchHeroIMG();
    const events = ["hero:create", "hero:update", "hero:delete"];
    events.forEach((event) => listenToUpdate(event, "fetchReview"));
  }, []);

  const fetchHeroIMG = async () => {
    try {
      let res = await api.get("/master/heros");
      setHero({ ...hero, banners: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const handleSave = async (field) => {
    setHero({ ...hero, [field]: tempValue });
    console.log({
      [field]: tempValue,
    });

    try {
      await api.put(`/master/hero/${1}`);
    } catch (error) {
      console.log(error);
    }

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
    setIsEditBanner(true);
    fileInputs.current[index].click();
  };

  const handleDeleteBanner = (index) => {
    const updatedBanners = hero.banners.filter((_, i) => i !== index);
    setHero({ ...hero, banners: updatedBanners });
  };

  const handleAddBanner = () => {
    setIsEditBanner(true);
    setHero({
      ...hero,
      banners: [...hero.banners, "/assets/default-banner.jpg"],
    });
  };
  const handleSaveBanner = async () => {
    try {
      const formData = new FormData();

      fileInputs.current.forEach((input, index) => {
        if (input && input.files.length > 0) {
          formData.append("files", input.files[0]);
        }
      });

      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      await api.post("/master/hero", formData);
      showAlert("success", "Upload Successfully!");
      setIsEditBanner(false);
    } catch (err) {
      showAlert("error", "Upload Failed, Please Try Again!");
      console.error(err);
    }
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
                className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden group shadow-sm"
              >
                <img
                  src={`${baseApi}master/hero/file/${banner.file}`}
                  alt={`${banner.note}`}
                  loading="lazy"
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
                  <button onClick={() => console.log(banner)}>CEK</button>
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
        {isEditBanner && (
          <button
            onClick={() => handleSaveBanner()}
            className="bg-orange-500 text-white mt-2 flex gap-1 items-center px-3 py-1.5 rounded-lg"
          >
            Save Update
            <FiSave size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
