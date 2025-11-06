/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import api from "../../../../services/axios.service";
import { Modal } from "../../../../shared/Modal";
import { FormProduct } from "../../../../components/main/admin/products/FormProduct";
import { listenToUpdate } from "../../../../services/socket.service";
import { baseApi } from "../../../../services/api.service";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // === Fetch categories ===
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let res = await api.get("/master/categories");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // === Fetch products (with filter and limit) ===
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let query = `/master/products?limit=${limit}`;
      if (selectedCategory !== "all") {
        query += `&categoryId=${selectedCategory}`;
      }

      const res = await api.get(query);
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [limit, selectedCategory]);

  useEffect(() => {
    fetchProducts();

    const events = ["product:create", "product:update", "product:delete"];
    events.forEach((event) => listenToUpdate(event, fetchProducts));
  }, [fetchProducts]);

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (prod) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-8">
      <div className="max-w-full mx-auto bg-white shadow-xl rounded-2xl p-6 border border-orange-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Products
            </h1>
            <p className="text-gray-500 text-sm">
              Add, update, and manage product list efficiently
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-orange-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
          >
            <FiPlus /> Add Product
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/6 focus:ring-2 focus:ring-orange-400"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                Show {n}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4 focus:ring-2 focus:ring-orange-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
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
                  Image
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Product Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Loading data...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((prod, i) => (
                  <tr
                    key={prod.productId || i}
                    className="border-b hover:bg-orange-50 transition-colors"
                  >
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
                        {prod.productIMG ? (
                          <img
                            src={`${baseApi}master/image/${prod.productIMG}`}
                            alt={prod.productName}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FiImage className="text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {prod.productName}
                    </td>
                    <td className="py-3 px-4">{prod.categoryName}</td>
                    <td className="py-3 px-4 text-gray-600 truncate max-w-xs">
                      {prod.description}
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="text-orange-500 hover:text-orange-700 transition"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FormProduct
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSaved={fetchProducts}
        product={selectedProduct}
        categories={categories}
      />
    </div>
  );
}
