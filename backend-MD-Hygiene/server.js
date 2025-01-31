import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MailRouters from "./routes/MailRouters.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debug: `.env` içindeki değişkenleri kontrol et
console.log("📂 `.env` dosyası yüklendi mi?");
console.log("🌍 `.env` içindeki MONGO_URI:", process.env.MONGO_URI || "MISSING!");
console.log("🧐 MONGO_URI'nin gerçek tipi:", typeof process.env.MONGO_URI);
console.log("📝 MONGO_URI'nin uzunluğu:", process.env.MONGO_URI ? process.env.MONGO_URI.length : "undefined");



// Ortama göre doğru MongoDB bağlantısını kullan
const mongoURI = process.env.MONGO_URI?.trim() || "mongodb://192.168.32.2:27017/md-hygiene";


if (!mongoURI || mongoURI === "undefined") {
    console.error("❌ HATA: `MONGO_URI` tanımlı değil veya yanlış formatta!");
    process.exit(1); // Hatalıysa süreci durdur
}

console.log("🌍 Kullanılan MongoDB URI:", `"${mongoURI}"`);

// MongoDB bağlantısını başlat
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Erfolgreich mit MongoDB verbunden: ${mongoURI}`))
  .catch((err) => {
    console.error("❌ Fehler bei der MongoDB-Verbindung:", err.message);
    process.exit(1); // Hatalıysa süreci kapat
  });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Tüm domainlere izin ver
  })
);

app.get("/", (req, res) => {
  res.send("🚀 Backend API läuft!");
});

// Rotalar
app.use("/send-email", MailRouters);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}!`));
