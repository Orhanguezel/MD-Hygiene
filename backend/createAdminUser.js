import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // Kullanıcı modelini içe aktar

dotenv.config(); // .env dosyasını yükle

const MONGO_URI = process.env.MONGO_URI; // MongoDB bağlantısını al

async function createOrUpdateAdmin() {
  try {
    // ✅ MongoDB'ye bağlan
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB'ye bağlanıldı.");

    const email = "admin@mdhygiene.com"; // Admin e-posta
    const plainPassword = "Admin123!"; // Varsayılan şifre

    // Kullanıcıyı kontrol et
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // Eğer kullanıcı yoksa, yeni admin oluştur
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      const newUser = new User({
        name: "Admin", // ⭐ Eksik olan name alanını ekledik
        email,
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save();
      console.log("✅ Yeni admin kullanıcı oluşturuldu.");
    } else {
      // Eğer kullanıcı varsa, şifresini güncelle
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log("🔄 Admin şifresi güncellendi.");
    }
  } catch (error) {
    console.error("❌ Kullanıcı oluşturma/güncelleme hatası:", error);
  } finally {
    // Bağlantıyı kapat
    await mongoose.disconnect();
    console.log("🔌 MongoDB bağlantısı kapatıldı.");
  }
}

// ✅ İşlemi başlat
createOrUpdateAdmin();
