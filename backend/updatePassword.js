import bcrypt from "bcryptjs"; // ✅ bcryptjs kullan
import mongoose from "mongoose";
import User from "./models/User.js"; // ✅ Kullanıcı modelini içe aktar

// MongoDB'ye bağlan
mongoose
  .connect("mongodb://localhost:27017/md-hygiene")
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((error) => console.error("❌ MongoDB bağlantı hatası:", error));

async function updatePassword() {
  try {
    const email = "admin@mdhygiene.com"; // Güncellenecek admin e-posta
    const plainPassword = "Admin123!"; // Yeni şifre
    const hashedPassword = await bcrypt.hash(plainPassword, 10); // Şifreyi hashle

    // Kullanıcıyı güncelle
    const result = await User.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      console.log("⚠️ Kullanıcı bulunamadı!");
    } else {
      console.log("✅ Admin şifresi başarıyla güncellendi!", result);
    }
  } catch (error) {
    console.error("❌ Şifre güncellenirken hata oluştu:", error);
  } finally {
    mongoose.disconnect();
    console.log("🔌 MongoDB bağlantısı kapatıldı.");
  }
}

// ✅ Şifre güncelleme işlemini başlat
updatePassword();


