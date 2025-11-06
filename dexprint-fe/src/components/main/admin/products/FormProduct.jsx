/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import api from "../../../../services/axios.service";
import { baseApi } from "../../../../services/api.service";

export function FormProduct({ isOpen, onClose, onSaved, product, categories }) {
  const isEdit = Boolean(product);
  const [form, setForm] = useState({
    productName: "",
    categoryId: "",
    description: "",
    productIMG: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Isi form otomatis jika mode edit
  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || "",
        categoryId: product.categoryId || "",
        description: product.description || "",
        productIMG: null,
      });

      // kalau ada gambar lama → tampilkan dari server
      setPreview(
        product.productIMG
          ? `${baseApi}master/file/${product.productIMG}`
          : null
      );
    } else {
      setForm({
        productName: "",
        categoryId: "",
        description: "",
        productIMG: null,
      });
      setPreview(null);
    }
  }, [product, baseApi]);

  if (!isOpen) return null;

  // 📝 Handle input teks & select
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📂 Handle file input dan tampilkan preview lokal
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, productIMG: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // 💾 Submit data (POST/PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("categoryId", form.categoryId);
      formData.append("description", form.description);
      if (form.productIMG) formData.append("file", form.productIMG);

      if (isEdit) {
        await api.put(`/master/product/${product.productId}`, formData);
      } else {
        await api.post("/master/product", formData);
      }

      onSaved(); // Refresh parent data
      onClose(); // Tutup modal
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/10 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none resize-none"
            />
          </div>

          {/* Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-orange-50 text-orange-600 border border-orange-300 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-orange-100 transition">
                <FiUpload /> Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-all"
          >
            {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
