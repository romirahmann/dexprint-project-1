/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import api from "../../../../services/axios.service";
import { listenToUpdate } from "../../../../services/socket.service";

export default function MaterialPage() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    materialName: "",
    size: "",
    unit: "",
    price: "",
    productId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [limit, setLimit] = useState(10);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/master/materials");
      setMaterials(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  });
  useEffect(() => {
    fetchProducts();
    const events = ["material:create", "material:update", "material:delete"];
    events.forEach((event) => listenToUpdate(event, fetchMaterials));
  }, [fetchMaterials]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/master/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // === Filter materials by product & limit ===
  useEffect(() => {
    let data = [...materials];
    if (selectedProduct) {
      data = data.filter((m) => m.productId === parseInt(selectedProduct));
    }
    setFilteredMaterials(data.slice(0, limit));
  }, [materials, selectedProduct, limit]);

  // === Handle input ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // === Open modal (Add/Edit) ===
  const openModal = (mat = null) => {
    if (mat) {
      setIsEditing(true);
      setEditId(mat.materialId);
      setFormData({
        materialName: mat.materialName,
        size: mat.size,
        unit: mat.unit,
        price: mat.price,
        productId: mat.productId,
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({
        materialName: "",
        size: "",
        unit: "",
        price: "",
        productId: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // === Submit form ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/master/material/${editId}`, formData);
      } else {
        await api.post("/master/material", formData);
      }
      fetchMaterials();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  // === Delete material ===
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this material?")) return;
    try {
      await api.delete(`/master/material/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-8">
      <div className="max-w-full mx-auto bg-white shadow-xl rounded-2xl p-6 border border-orange-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Materials
            </h1>
            <p className="text-gray-500 text-sm">
              Add and manage materials for each product efficiently
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
          >
            <FiPlus /> Add Material
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 w-full sm:w-1/3"
          >
            <option value="">All Products</option>
            {products.map((p) => (
              <option key={p.productId} value={p.productId}>
                {p.productName}
              </option>
            ))}
          </select>

          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 w-full sm:w-1/6"
          >
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                Show {num}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-orange-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  #
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Material Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Size
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Unit
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Product
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredMaterials.length > 0 ? (
                filteredMaterials.map((mat, index) => (
                  <tr
                    key={mat.materialId}
                    className="border-b hover:bg-orange-50 transition-colors"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{mat.materialName}</td>
                    <td className="py-3 px-4">{mat.size}</td>
                    <td className="py-3 px-4">{mat.unit}</td>
                    <td className="py-3 px-4">
                      Rp {parseInt(mat.price).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{mat.productName}</td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => openModal(mat)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(mat.materialId)}
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
                    colSpan="7"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No materials found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Modal === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditing ? "Edit Material" : "Add New Material"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                placeholder="Material Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Size"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="Unit"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName}
                  </option>
                ))}
              </select>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
