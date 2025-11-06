const db = require("../database/db.config");

// === GET All Materials (join ke products dan categories) ===
const getAll = async () =>
  db("materials as m")
    .select(
      "m.materialId",
      "m.materialName",
      "m.size",
      "m.unit",
      "m.price",
      "m.productId",
      "p.productName",
      "p.categoryId",
      "c.categoryName"
    )
    .leftJoin("products as p", "m.productId", "p.productId")
    .leftJoin("categories as c", "p.categoryId", "c.categoryId")
    .orderBy("m.materialId", "desc");

// === GET Material by ID (dengan relasi lengkap) ===
const getById = async (materialId) =>
  db("materials as m")
    .select(
      "m.materialId",
      "m.materialName",
      "m.size",
      "m.unit",
      "m.price",
      "m.productId",
      "p.productName",
      "p.categoryId",
      "c.categoryName"
    )
    .leftJoin("products as p", "m.productId", "p.productId")
    .leftJoin("categories as c", "p.categoryId", "c.categoryId")
    .where("m.materialId", materialId)
    .first();

// === GET Materials by Product ID ===
const getByProductId = async (productId) =>
  db("materials as m")
    .select(
      "m.materialId",
      "m.materialName",
      "m.size",
      "m.unit",
      "m.price",
      "m.productId",
      "p.productName",
      "p.categoryId",
      "c.categoryName"
    )
    .leftJoin("products as p", "m.productId", "p.productId")
    .leftJoin("categories as c", "p.categoryId", "c.categoryId")
    .where("m.productId", productId)
    .orderBy("m.materialId", "desc");

// === INSERT Material ===
const insert = async (data) => db("materials").insert(data);

// === UPDATE Material ===
const update = async (materialId, data) =>
  db("materials").where({ materialId }).update(data);

// === DELETE Material ===
const deleted = async (materialId) =>
  db("materials").where({ materialId }).del();

module.exports = {
  getAll,
  getById,
  getByProductId,
  insert,
  update,
  deleted,
};
