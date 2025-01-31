import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Bağlandı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Bağlantı Hatası: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


