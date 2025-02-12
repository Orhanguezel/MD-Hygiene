import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ `.env` dosyasının tam yolunu belirle
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");  // ✅ `../.env` ile ana dizine bakıyoruz!

// ✅ `.env` dosyasını yükle
dotenv.config({ path: envPath });

console.log(`🛠️ ENV Dosyası Yüklendi: ${envPath}`);

// ✅ Ortam değişkenlerini kontrol et
const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI tanımlı değil! `.env` dosyanızı kontrol edin.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    console.log(`⏳ MongoDB'ye bağlanılıyor: ${MONGO_URI}`);
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Bağlandı: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Bağlantı Hatası: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
