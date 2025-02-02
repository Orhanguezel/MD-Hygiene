import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Ortam değişkenlerini yükle
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const { MONGO_URI } = process.env;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("🚨 MongoDB bağlantısı için MONGO_URI tanımlı değil!");
    process.exit(1);
  }

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
