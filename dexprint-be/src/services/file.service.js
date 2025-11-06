const path = require("path");
const fs = require("fs");
const api = require("../tools/common");

// Lokasi folder upload global (bisa kamu ubah sesuai struktur project)
const uploadDir = path.join(__dirname, "../upload/images");

const getFile = async (req, res) => {
  try {
    const { filename } = req.params;
    if (!filename) return api.error(res, "Filename is required", 400);

    const filePath = path.join(uploadDir, filename);
    console.log("Serving file from:", filePath);
    if (!fs.existsSync(filePath)) {
      return api.error(res, "File not found", 404);
    }

    // Deteksi MIME Type secara manual
    const ext = path.extname(filename).toLowerCase();
    let mimeType = "application/octet-stream";

    switch (ext) {
      case ".jpg":
      case ".jpeg":
        mimeType = "image/jpeg";
        break;
      case ".png":
        mimeType = "image/png";
        break;
      case ".webp":
        mimeType = "image/webp";
        break;
      case ".gif":
        mimeType = "image/gif";
        break;
      case ".pdf":
        mimeType = "application/pdf";
        break;
      case ".mp4":
        mimeType = "video/mp4";
        break;
    }

    res.setHeader("Content-Type", mimeType);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("❌ Error getFile:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = { getFile };
