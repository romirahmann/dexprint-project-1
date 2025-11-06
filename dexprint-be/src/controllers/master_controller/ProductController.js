const path = require("path");
const fs = require("fs");
const productModel = require("../../models/product.model");
const api = require("../../tools/common");
const { emit } = require("../../services/socket.service");

/* ============================================================
   ✅ GET ALL PRODUCTS
============================================================ */
const getAllProduct = async (req, res) => {
  try {
    // Ambil query params dari frontend
    const { limit, categoryId } = req.query;

    // Parsing dan validasi
    const parsedLimit = limit ? parseInt(limit, 10) : null;
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : null;

    // Kirim ke model
    const products = await productModel.getAll(parsedLimit, parsedCategoryId);

    return api.success(res, products);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET PRODUCT BY ID
============================================================ */
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getById(id);
    if (!product) return api.error(res, "Product not found", 404);
    return api.success(res, product);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE PRODUCT
============================================================ */
const createProduct = async (req, res) => {
  try {
    const { productName, categoryId, description } = req.body;
    const file = req.file;

    if (!productName || !categoryId) {
      return api.error(res, "Product name and category are required", 400);
    }

    const product = {
      productName,
      categoryId,
      description,
      productIMG: file.filename,
    };

    const result = await productModel.insert(product);

    // 🔔 Emit event create
    emit("product:create", result);

    return api.success(res, result, "Product created successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE PRODUCT
============================================================ */
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  try {
    const product = {
      ...data,
      productIMG: file.filename,
    };

    const result = await productModel.update(id, product);

    // 🔔 Emit event update
    emit("product:update", { id, ...data });

    return api.success(res, result, "Product updated successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE PRODUCT
============================================================ */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.getById(id);
    if (!product) return api.error(res, "Product not found", 404);

    await productModel.deleted(id);

    // 🔔 Emit event delete
    emit("product:delete", { id });

    return api.success(res, {}, "Product deleted successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
