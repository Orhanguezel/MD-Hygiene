import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// 📌 **Uploads klasörünün otomatik oluşturulması**
const uploadDir = path.resolve("uploads"); // ✅ Daha temiz path ayarı
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📌 **Resim Yükleme Konumu (Multer Konfigürasyonu)**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

// 📌 **Resim Format Kontrolü**
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("⚠️ Sadece .jpeg, .jpg, .png, .gif ve .webp formatları desteklenmektedir!"), false);
  }
};

// 📌 **Multer Middleware Tanımlaması**
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // ✅ Maksimum 20MB olarak ayarlandı
  fileFilter,
});

// 📌 **Uploads Klasörünü Statik Olarak Servis Etme**
export const serveUploads = express.static(uploadDir);

export default upload;
