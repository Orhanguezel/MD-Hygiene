import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "./models/User.js"; // Kullanıcı modelinin doğru yolunu belirt

// MongoDB bağlantısı
await mongoose.connect("mongodb://localhost:27017/md-hygiene", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updatePassword() {
  try {
    const plainPassword = "Admin123!"; // Güncellenecek şifre
    const hashedPassword = await bcrypt.hash(plainPassword, 10); // Şifreyi hashle

    const result = await User.updateOne(
      { email: "admin@mdhygiene.com" },
      { $set: { password: hashedPassword } }
    );

    console.log("✅ Admin şifresi başarıyla güncellendi!", result);
  } catch (error) {
    console.error("❌ Şifre güncellenirken hata oluştu:", error);
  } finally {
    mongoose.disconnect();
  }
}

updatePassword();

