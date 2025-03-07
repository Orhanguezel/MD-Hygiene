import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// ✅ JWT Token oluşturma fonksiyonu
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// ✅ Kullanıcı Kayıt
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = "user", phone, addresses } = req.body;

  const validRoles = ["admin", "user", "customer", "moderator", "staff"];
  if (!validRoles.includes(role)) {
    res.status(400);
    throw new Error("Geçersiz rol değeri!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Bu e-posta zaten kayıtlı.");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    addresses,
  });

  res.status(201).json({
    success: true,
    message: "Kullanıcı başarıyla oluşturuldu!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
      token: generateToken(user),
    },
  });
});

// ✅ Kullanıcı Girişi
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Geçersiz kimlik bilgileri!");
  }

  res.status(200).json({
    success: true,
    message: "Giriş başarılı!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
      token: generateToken(user),
    },
  });
});

// ✅ Kullanıcı Profili Getirme
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
    .populate("orders", "totalAmount status createdAt");

  if (!user) {
    res.status(404);
    throw new Error("Kullanıcı bulunamadı!");
  }

  res.status(200).json(user);
});

// ✅ Tüm Kullanıcıları Getirme (Admin Yetkisi Gerektirir)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// ✅ Kullanıcı Profili Güncelleme
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, addresses } = req.body;
  const profileImage = req.file ? req.file.path : undefined;

  const updatedFields = { name, email, phone, addresses };
  if (profileImage) updatedFields.profileImage = profileImage;

  const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(200).json({
    success: true,
    message: "Profil güncellendi.",
    user,
  });
});

// ✅ Kullanıcı Silme (Admin Yetkisi Gerektirir)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Kullanıcı bulunamadı.");
  }

  res.status(200).json({ success: true, message: "Kullanıcı başarıyla silindi." });
});

// ✅ Şifre Değiştirme
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Mevcut ve yeni şifre gereklidir.");
  }

  const user = await User.findById(req.user.id).select("+password");
  if (!user || !(await user.comparePassword(currentPassword))) {
    res.status(401);
    throw new Error("Geçersiz mevcut şifre.");
  }

  if (currentPassword === newPassword) {
    res.status(400);
    throw new Error("Yeni şifre eski şifreyle aynı olamaz.");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, message: "Şifre başarıyla değiştirildi." });
});

// ✅ Kullanıcı Rol Güncelleme (Admin Yetkisi Gerektirir)
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const validRoles = ["admin", "user", "moderator", "customer", "staff"];

  if (!validRoles.includes(role)) {
    res.status(400);
    throw new Error("Geçersiz rol.");
  }

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });

  if (!user) {
    res.status(404);
    throw new Error("Kullanıcı bulunamadı.");
  }

  res.status(200).json({
    success: true,
    message: "Rol başarıyla güncellendi.",
    user,
  });
});
