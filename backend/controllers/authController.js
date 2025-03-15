import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { generateToken } from "../utils/jwt.js";

// ✅ **Kullanıcı Kayıt**


export const registerUser = asyncHandler(async (req, res) => {
  let {
    name,
    email,
    password,
    role = "user",
    phone,
    addresses = [],
    profileImage = "",
    bio = "",
    birthDate,
    socialMedia = { facebook: "", twitter: "", instagram: "" },
    notifications = { emailNotifications: true, smsNotifications: false }
  } = req.body;

  // ✅ **Veri Kontrolleri**
  const validRoles = ["admin", "user", "customer", "moderator", "staff"];
  const roleLowerCase = role.toLowerCase();
  if (!validRoles.includes(roleLowerCase)) {
    return res.status(400).json({ message: "❌ Geçersiz rol değeri!" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "❌ Bu e-posta zaten kayıtlı." });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "❌ Şifre en az 6 karakter olmalıdır." });
  }

  if (typeof addresses === "string") {
    try {
      addresses = JSON.parse(addresses);
    } catch (error) {
      return res.status(400).json({ message: "❌ Adres bilgisi JSON formatında olmalıdır!" });
    }
  }

  if (!Array.isArray(addresses)) {
    return res.status(400).json({ message: "❌ Adres bilgisi geçerli değil!" });
  }

  // ✅ **Doğum Tarihi Formatı**
  const formattedBirthDate = birthDate && birthDate.trim() !== "" ? new Date(birthDate) : null;

  // ✅ **Profil Resmi İşleme**
  if (profileImage && typeof profileImage === "string" && profileImage.startsWith("data:image")) {
    try {
      const base64Data = profileImage.split(",")[1]; // Base64 kısmını al
      const filePath = `uploads/profile-images/${Date.now()}.png`;
      fs.writeFileSync(filePath, base64Data, "base64");
      profileImage = filePath; // ✅ Yeni dosya yolunu profileImage olarak kaydet
    } catch (error) {
      console.error("❌ Base64 Görsel Kaydetme Hatası:", error);
      return res.status(400).json({ message: "❌ Profil resmi yüklenirken hata oluştu!" });
    }
  } else if (req.file) {
    profileImage = req.file.path; // ✅ Multer ile yüklenen dosyanın yolunu kaydet
  } else {
    profileImage = "https://via.placeholder.com/150"; // ✅ Varsayılan resim
  }

  // ✅ **Şifre Hashleme**
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ **Yeni Kullanıcı Oluşturma**
  let user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: roleLowerCase,
    phone,
    addresses,
    profileImage,
    bio,
    birthDate: formattedBirthDate,
    socialMedia,
    notifications
  });

  // 📌 **Kullanıcıyı Tekrar Çek (Şifre Dahil)**
  user = await User.findById(user._id).select("+password");

  res.status(201).json({
    success: true,
    message: "✅ Kullanıcı başarıyla oluşturuldu!",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage, // ✅ Profil resmi frontend'e düzgün dönüyor mu kontrol et
      token: generateToken(user._id, user.role),
    },
  });
});




// ✅ **Kullanıcı Giriş**
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.error("❌ Kullanıcı bulunamadı:", email);
    return res.status(401).json({ message: "❌ Geçersiz kimlik bilgileri!" });
  }

  console.log("🔹 Kullanıcının Şifresi:", user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("✅ Şifre Doğrulama Sonucu:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "❌ Şifre hatalı!" });
  }

  res.status(200).json({
    success: true,
    message: "✅ Giriş başarılı!",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role), // ✅ `generateToken` fonksiyonunu kullandık!
    },
  });
});




// ✅ **Kullanıcı Profili Getirme**
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
  }

  res.status(200).json(user);
});

// ✅ **Tüm Kullanıcıları Getirme (Admin)**
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// ✅ **Tek Bir Kullanıcıyı Getirme (Admin)**
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "❌ Geçersiz kullanıcı ID formatı!" });
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
  }

  res.status(200).json(user);
});

// ✅ **Kullanıcı Güncelleme**
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "❌ Geçersiz kullanıcı ID formatı!" });
  }

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
  }

  res.status(200).json({
    success: true,
    message: "✅ Kullanıcı başarıyla güncellendi.",
    user,
  });
});

// ✅ **Kullanıcı Silme (Admin)**
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Silinecek Kullanıcı ID:", id); // ✅ Hata kaynağını görmek için log ekle

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "❌ Geçersiz kullanıcı ID formatı!" });
  }

  const user = await User.findByIdAndDelete(id); // ✅ Doğru kullanım
  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
  }

  res.status(200).json({ message: "✅ Kullanıcı başarıyla silindi!", userId: id });
});


// ✅ **Şifre Değiştirme**
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(401).json({ message: "❌ Geçersiz mevcut şifre." });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ success: true, message: "✅ Şifre başarıyla değiştirildi." });
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  let { id } = req.params;

  console.log("📌 Gelen Kullanıcı ID:", id); // 🔥 LOG EKLENDİ

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "❌ Hata: Kullanıcı ID eksik veya geçersiz!" });
  }

  if (!mongoose.Types.ObjectId.isValid(id.trim())) {
    console.log("❌ Hata: Geçersiz ObjectId formatı!");
    return res.status(400).json({ message: "❌ Geçersiz kullanıcı ID formatı!" });
  }

  const user = await User.findById(id.trim());
  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
  }

  user.isActive = !user.isActive;
  await user.save();

  console.log(`✅ Kullanıcı durumu güncellendi: ${user.isActive ? "Aktif" : "Bloklandı"}`);

  return res.status(200).json({
    success: true,
    message: `✅ Kullanıcı başarıyla ${user.isActive ? "aktifleştirildi" : "bloklandı"}!`,
    userId: user._id.toString(),
    isActive: user.isActive,
  });
});


// ✅ **Kullanıcı Rol Güncelleme**
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "user", "moderator", "customer", "staff"].includes(role)) {
    return res.status(400).json({ message: "❌ Geçersiz rol." });
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });

  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı." });
  }

  res.status(200).json({
    success: true,
    message: "✅ Rol başarıyla güncellendi.",
    user,
  });
});


export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, addresses } = req.body;

  const updatedFields = { name, email, phone, addresses };

  const user = await
  User.findByIdAndUpdate(req.user.id, updatedFields, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
  }

  res.status(200).json({
    success: true,
    message: "✅ Kullanıcı başarıyla güncellendi.",
    user,
  });
});



// ✅ **Kullanıcı Profil Resmini Güncelleme**
export const updateProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: "❌ Dosya yüklenmedi!" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "❌ Kullanıcı bulunamadı!" });
    }

    // ✅ Eski resmi sil (eğer varsa)
    if (user.profileImage && user.profileImage.startsWith("uploads")) {
      const oldImagePath = path.join(process.cwd(), user.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // ✅ Yeni resmi kaydet
    user.profileImage = `uploads/profile-images/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: "✅ Profil resmi güncellendi!",
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Sunucu hatası!", error });
  }
};







