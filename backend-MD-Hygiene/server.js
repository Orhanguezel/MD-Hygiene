import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MailRouters from "./routes/MailRouters.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// `.env` dosyasını yükle
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Ortama göre doğru MongoDB bağlantısını kullan
const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

// Debug: `.env` içindeki değişkenleri kontrol et
console.log("📂 `.env` dosyası yüklendi mi?");
console.log("🌍 Kullanılan MongoDB URI:", mongoURI || "MISSING!");
console.log("🧐 MONGO_URI'nin gerçek tipi:", typeof mongoURI);
console.log("📝 MONGO_URI'nin uzunluğu:", mongoURI ? mongoURI.length : "undefined");

// Eğer `mongoURI` yoksa hata ver ve çık
if (!mongoURI || mongoURI === "undefined") {
  console.error("❌ HATA: `MONGO_URI` tanımlı değil veya yanlış formatta!");
  process.exit(1);
}

// MongoDB bağlantısını başlat
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ Erfolgreich mit MongoDB verbunden: ${mongoURI}`))
  .catch((err) => {
    console.error("❌ Fehler bei der MongoDB-Verbindung:", err.message);
    process.exit(1);
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

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}!`));
