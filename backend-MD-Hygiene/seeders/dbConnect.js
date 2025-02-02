import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ `.env` Dosyasını Yükle
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

console.log(`🛠️ ENV Dosyası Yükleniyor: ${envPath}`);
dotenv.config({ path: envPath });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Hata: MONGO_URI tanımlı değil! `.env` dosyanızı kontrol edin.");
  process.exit(1);
}

// ✅ MongoDB Bağlantısını Kur
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Bağlantısı Başarılı!");
  } catch (error) {
    console.error("❌ MongoDB Bağlantı Hatası:", error.message);
    process.exit(1);
  }
};

export default connectDB;
