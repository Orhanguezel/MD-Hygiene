import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// 📌 **Uploads klasörünün otomatik oluşturulması**
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📌 **Resim Yükleme Konumu (Multer Konfigürasyonu)**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ Resimler `uploads/` klasörüne kaydedilecek
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// 📌 **Resim Format Kontrolü**
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/; // ✅ `gif` ve `webp` desteği eklendi
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("⚠️ Sadece .jpeg, .jpg, .png, .gif ve .webp formatları desteklenmektedir!"), false);
  }
};

// 📌 **Multer Middleware Tanımlaması**
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // ✅ Maksimum 20MB olarak güncellendi
  fileFilter,
});

// 📌 **Uploads Klasörünü Servis Etme Middleware**
export const serveUploads = express.static(uploadDir);

export default upload;
