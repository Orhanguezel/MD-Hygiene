import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Ortam değişkenlerini doğru yüklemek için
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const { MONGO_URI } = process.env;

const connectDB = async (retries = 10) => {
  while (retries) {
    try {
      console.log(`⏳ MongoDB'ye bağlanılıyor: ${MONGO_URI}`);
      const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB Bağlandı: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`❌ MongoDB Bağlantı Hatası: ${error.message}`);
      retries -= 1;
      console.log(`⏳ Yeniden deneme... Kalan deneme sayısı: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.error("🚨 MongoDB bağlantısı başarısız oldu. Uygulama kapanıyor.");
  process.exit(1);
};

export default connectDB;

