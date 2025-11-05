const path = require("path");
const fs = require("fs");
const clientModel = require("../../models/client.model");
const api = require("../../tools/common");
const { emit } = require("../../services/socket.service");

// 📂 Folder upload (pastikan sesuai)
const uploadDir = path.join(process.cwd(), "src", "upload", "images");

/* ============================================================
   ✅ GET ALL CLIENTS
============================================================ */
const getAllClient = async (req, res) => {
  try {
    const clients = await clientModel.getAll();
    return api.success(res, clients);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET CLIENT BY ID
============================================================ */
const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientModel.getById(id);
    if (!client) return api.error(res, "Client not found", 404);
    return api.success(res, client);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE CLIENT
============================================================ */
const createClient = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!file) return api.error(res, "Logo file is required", 400);

    const client = {
      clientName: name,
      clientLogo: file.filename,
    };

    const result = await clientModel.insert(client);

    // 🔔 Emit ke semua client
    emit("client:create", result);

    return api.success(res, result, "Client created successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE CLIENT (dengan hapus file lama)
============================================================ */
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const file = req.file;

  try {
    // Ambil data lama
    const oldClient = await clientModel.getById(id);
    if (!oldClient) return api.error(res, "Client not found", 404);

    const updateData = {
      clientName: name || oldClient.clientName,
      clientLogo: oldClient.clientLogo,
    };

    // Kalau ada file baru → hapus file lama
    if (file) {
      if (oldClient.clientLogo) {
        const oldPath = path.join(uploadDir, oldClient.clientLogo);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log(`🗑️ Deleted old logo: ${oldClient.clientLogo}`);
        }
      }
      updateData.clientLogo = file.filename;
    }

    const result = await clientModel.update(id, updateData);

    // 🔔 Emit event update ke semua client
    emit("client:update", { id, ...updateData });

    return api.success(res, result, "Client updated successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE CLIENT (hapus juga file logo)
============================================================ */
const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await clientModel.getById(id);
    if (!client) return api.error(res, "Client not found", 404);

    // Hapus file logo jika ada
    if (client.clientLogo) {
      const filePath = path.join(uploadDir, client.clientLogo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted logo: ${client.clientLogo}`);
      }
    }

    await clientModel.deleted(id);

    // 🔔 Emit event delete ke semua client
    emit("client:delete", { id });

    return api.success(res, {}, "Client deleted successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET FILE (Logo)
============================================================ */
const getClientFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return api.error(res, "File not found", 404);
    }

    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    };

    const mimeType = mimeTypes[ext] || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllClient,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientFile,
};
