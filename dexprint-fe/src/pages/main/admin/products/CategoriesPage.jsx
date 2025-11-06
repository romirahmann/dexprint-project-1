/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import api from "../../../../services/axios.service";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ categoryName: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // === Fetch categories on load ===
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/master/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // === Handle input change ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // === Open Modal (Add / Edit) ===
  const openModal = (category = null) => {
    if (category) {
      setIsEditing(true);
      setEditId(category.categoryId);
      setFormData({ categoryName: category.categoryName });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ categoryName: "" });
    }
    setShowModal(true);
  };

  // === Close Modal ===
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setIsEditing(false);
      setEditId(null);
      setFormData({ categoryName: "" });
    }, 200);
  };

  // === Submit (Create / Update) ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/master/category/${editId}`, formData);
      } else {
        await api.post("/master/category", formData);
      }
      closeModal();
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // === Delete Category ===
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await api.delete(`/master/category/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-8">
      <div className="max-w-full mx-auto bg-white shadow-xl rounded-2xl p-6 border border-orange-100">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Product Categories
            </h1>
            <p className="text-gray-500 text-sm">
              Create, edit, and manage printing product categories
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
          >
            <FiPlus /> Add Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-orange-100">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Category Name
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr
                    key={cat.categoryId}
                    className="border-b hover:bg-orange-50 transition-colors"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{cat.categoryName}</td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => openModal(cat)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.categoryId)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {isEditing ? "Edit Category" : "Add Category"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                      placeholder="Enter category name..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                      {isEditing ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
