import multer from "multer";
import path from "path";
import fs from "fs";

// Folder penyimpanan
const uploadPath = path.join(process.cwd(), "src", "upload", "images");

// Pastikan foldernya ada
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/\.[^/.]+$/, "");
    cb(null, `${safeName}-${uniqueSuffix}${ext}`);
  },
});

// Hanya izinkan file gambar
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, WEBP) are allowed!"), false);
  }
};

// ✅ Naikkan batas ukuran file menjadi 50MB
const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB
};

const upload = multer({ storage, fileFilter, limits });

export default upload;
