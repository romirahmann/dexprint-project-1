const materialModel = require("../../models/material.model");
const api = require("../../tools/common");
const { emit } = require("../../services/socket.service");

/* ============================================================
   ✅ GET ALL MATERIALS
============================================================ */
const getAllMaterial = async (req, res) => {
  try {
    const materials = await materialModel.getAll();
    return api.success(res, materials);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET MATERIAL BY ID
============================================================ */
const getMaterialById = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await materialModel.getById(id);
    if (!material) return api.error(res, "Material not found", 404);
    return api.success(res, material);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET MATERIAL BY PRODUCT ID
============================================================ */
const getMaterialByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const materials = await materialModel.getByProductId(productId);
    return api.success(res, materials);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE MATERIAL
============================================================ */
const createMaterial = async (req, res) => {
  try {
    const { materialName, size, unit, price, productId } = req.body;

    if (!materialName || !unit || !price || !productId) {
      return api.error(res, "All required fields must be filled", 400);
    }

    const data = {
      materialName,
      size,
      unit,
      price,
      productId,
    };

    const result = await materialModel.insert(data);

    // 🔔 Emit event create
    emit("material:create", result);

    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE MATERIAL
============================================================ */
const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await materialModel.update(id, data);

    // 🔔 Emit event update
    emit("material:update", { id, ...data });

    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE MATERIAL
============================================================ */
const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await materialModel.getById(id);
    if (!material) return api.error(res, "Material not found", 404);

    await materialModel.deleted(id);

    // 🔔 Emit event delete
    emit("material:delete", { id });

    return api.success(res, "Material deleted successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllMaterial,
  getMaterialById,
  getMaterialByProductId,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
