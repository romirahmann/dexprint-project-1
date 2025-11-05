const reviewModel = require("../../models/review.model");
const api = require("../../tools/common");
const path = require("path");
const fs = require("fs");
const { emit } = require("../../services/socket.service"); // 🔌 Import IO Service

const uploadDir = path.join(process.cwd(), "src", "upload", "images");

// ✅ GET ALL REVIEW
const getAllReview = async (req, res) => {
  try {
    const reviews = await reviewModel.getAll();
    return api.success(res, reviews);
  } catch (error) {
    console.error("❌ Error getAllReview:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// ✅ GET REVIEW BY ID
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await reviewModel.getById(id);
    if (!review) return api.error(res, "Review not found", 404);
    return api.success(res, review);
  } catch (error) {
    console.error("❌ Error getReviewById:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// ✅ CREATE REVIEW
const createReview = async (req, res) => {
  const data = req.body;
  const file = req.file;

  try {
    const review = {
      nama: data.nama,
      feedback: data.feedback,
      tenant: data.tenant,
      fileIMG: file ? file.filename : null,
    };

    const result = await reviewModel.insert(review);

    // 🔔 Emit event ke semua client
    emit("review:create", result);

    return api.success(res, result);
  } catch (error) {
    console.error("❌ Error createReview:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// ✅ UPDATE REVIEW
const updateReview = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  try {
    const existing = await reviewModel.getById(id);
    if (!existing) return api.error(res, "Review not found", 404);

    // Jika upload file baru, hapus file lama
    let newFile = existing.fileIMG;
    if (file) {
      const oldPath = path.join(uploadDir, existing.fileIMG || "");
      if (existing.fileIMG && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log(`🗑️ Deleted old file: ${existing.fileIMG}`);
      }
      newFile = file.filename;
    }

    const updatedData = {
      nama: data.nama ?? existing.nama,
      feedback: data.feedback ?? existing.feedback,
      tenant: data.tenant ?? existing.tenant,
      fileIMG: newFile,
    };

    const result = await reviewModel.update(id, updatedData);

    // 🔔 Emit event update ke semua client
    emit("review:update", { id, ...updatedData });

    return api.success(res, result);
  } catch (error) {
    console.error("❌ Error updateReview:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// ✅ DELETE REVIEW
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await reviewModel.getById(id);
    if (!review) return api.error(res, "Review not found", 404);

    // Hapus file image jika ada
    if (review.fileIMG) {
      const filePath = path.join(uploadDir, review.fileIMG);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted file: ${review.fileIMG}`);
      }
    }

    const result = await reviewModel.deleted(id);

    // 🔔 Emit event delete ke semua client
    emit("review:delete", { id });

    return api.success(res, result);
  } catch (error) {
    console.error("❌ Error deleteReview:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// ✅ GET IMAGE FILE
const getReviewFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return api.error(res, "File not found", 404);
    }

    const ext = path.extname(filename).toLowerCase();
    let mimeType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
    else if (ext === ".png") mimeType = "image/png";
    else if (ext === ".webp") mimeType = "image/webp";

    res.setHeader("Content-Type", mimeType);
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error("❌ Error getReviewFile:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllReview,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewFile,
};
