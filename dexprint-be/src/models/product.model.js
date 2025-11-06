const db = require("../database/db.config");

// === GET All Products (Join Category jika perlu) ===
const getAll = async (limit = null, categoryId = null) => {
  let query = db("products as p")
    .select("p.*", "c.categoryName")
    .leftJoin("categories as c", "c.categoryId", "p.categoryId")
    .orderBy("p.productId", "desc");

  // Filter category jika ada
  if (categoryId) {
    query = query.where("p.categoryId", categoryId);
  }

  // Batasi jumlah data jika ada limit
  if (limit) {
    query = query.limit(limit);
  }

  return query;
};

// === GET Product by ID ===
const getById = async (productId) =>
  db("products as p")
    .select("p.*", "c.categoryName")
    .leftJoin("categories as c", "c.categoryId", "p.categoryId")
    .where("p.productId", productId)
    .first();

// === INSERT Product ===
const insert = async (data) => db("products").insert(data);

// === UPDATE Product ===
const update = async (productId, data) =>
  db("products").where({ productId }).update(data);

// === DELETE Product ===
const deleted = async (productId) => db("products").where({ productId }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
};
