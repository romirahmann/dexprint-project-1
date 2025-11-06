const heroModel = require("../../models/hero.model");
const api = require("../../tools/common");
const path = require("path");
const fs = require("fs");
const { emit } = require("../../services/socket.service"); // 🔌 Socket IO
const uploadDir = path.join(process.cwd(), "src", "upload", "images"); // folder upload hero

// GET ALL HERO BANNERS
const getAllHero = async (req, res) => {
  try {
    const banners = await heroModel.getAll();
    return api.success(res, banners);
  } catch (error) {
    console.error("❌ Error getAllHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// GET HERO BANNER BY ID
const getHeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await heroModel.getById(id);
    if (!banner) return api.error(res, "Hero banner not found", 404);
    return api.success(res, banner);
  } catch (error) {
    console.error("❌ Error getHeroById:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// CREATE HERO BANNER
const createHero = async (req, res) => {
  const files = req.files;

  try {
    files.forEach(async (file) => {
      await heroModel.insert({ note: file.originalname, file: file.filename });
    });

    emit("hero:create", "Success");

    return api.success(res, "Upload Successfully!");
  } catch (error) {
    console.error("❌ Error createHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// UPDATE HERO BANNER
const updateHero = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  try {
    const existing = await heroModel.getById(id);
    if (!existing) return api.error(res, "Hero banner not found", 404);

    let newFile = existing.file;
    if (file) {
      const oldPath = path.join(uploadDir, existing.file || "");
      if (existing.file && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log(`🗑️ Deleted old hero file: ${existing.file}`);
      }
      newFile = file.filename;
    }

    const updatedData = {
      note: data.note ?? existing.note,
      file: newFile,
    };

    const result = await heroModel.update(id, updatedData);

    // 🔔 Emit event update ke semua client
    emit("hero:update", { id, ...updatedData });

    return api.success(res, result);
  } catch (error) {
    console.error("❌ Error updateHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// DELETE HERO BANNER
const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await heroModel.getById(id);
    if (!banner) return api.error(res, "Hero banner not found", 404);

    // Hapus file image jika ada
    if (banner.file) {
      const filePath = path.join(uploadDir, banner.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted hero file: ${banner.file}`);
      }
    }

    const result = await heroModel.deleted(id);

    // 🔔 Emit event delete ke semua client
    emit("hero:delete", { id });

    return api.success(res, result);
  } catch (error) {
    console.error("❌ Error deleteHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// GET HERO IMAGE FILE
const getHeroFile = async (req, res) => {
  try {
    const { filename } = req.params;
    console.log(filename);
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
    console.error("❌ Error getHeroFile:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllHero,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
  getHeroFile,
};
