import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ JWT Token oluşturma fonksiyonu
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// ✅ Hata mesajlarını merkezi yönetim için
const handleError = (res, message, status = 500) => {
  return res.status(status).json({ success: false, message });
};

// ✅ Kullanıcı Kayıt
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "user", phone, addresses } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const userExists = await User.findOne({ email });
    if (userExists) return handleError(res, "Bu e-posta zaten kayıtlı.", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      addresses,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Kullanıcı oluşturuldu!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        profileImage: user.profileImage,
        token: generateToken(user),
      },
    });
  } catch (error) {
    handleError(res, error.message);
  }
};

// ✅ Kullanıcı Girişi
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return handleError(res, "Geçersiz kimlik bilgileri!", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleError(res, "Geçersiz kimlik bilgileri!", 401);

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
  } catch (error) {
    handleError(res, error.message);
  }
};

// ✅ Kullanıcı Profili Getirme
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("orders", "totalAmount status createdAt");

    if (!user) return handleError(res, "Kullanıcı bulunamadı!", 404);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error.message);
  }
};

// ✅ Tüm Kullanıcıları Getirme (Admin Yetkisi Gerektirir)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    handleError(res, "Kullanıcıları alırken hata oluştu!");
  }
};

// ✅ Kullanıcı Profili Güncelleme
export const updateUserProfile = async (req, res) => {
  try {
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
  } catch (error) {
    handleError(res, "Kullanıcı profili güncellenemedi.", 500);
  }
};

// ✅ Kullanıcı Silme (Admin Yetkisi Gerektirir)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return handleError(res, "Kullanıcı bulunamadı.", 404);

    res.status(200).json({ success: true, message: "Kullanıcı başarıyla silindi." });
  } catch (error) {
    handleError(res, "Kullanıcı silinemedi.");
  }
};

// ✅ Şifre Değiştirme
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return handleError(res, "Mevcut ve yeni şifre gereklidir.", 400);

    const user = await User.findById(req.user.id);
    if (!user) return handleError(res, "Kullanıcı bulunamadı.", 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return handleError(res, "Geçersiz mevcut şifre.", 401);

    if (currentPassword === newPassword)
      return handleError(res, "Yeni şifre eski şifreyle aynı olamaz.", 400);

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Şifre başarıyla değiştirildi." });
  } catch (error) {
    handleError(res, "Şifre değiştirilemedi.");
  }
};

// ✅ Kullanıcı Rol Güncelleme (Admin Yetkisi Gerektirir)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["admin", "user", "moderator"];

    if (!validRoles.includes(role))
      return handleError(res, "Geçersiz rol.", 400);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) return handleError(res, "Kullanıcı bulunamadı.", 404);

    res.status(200).json({
      success: true,
      message: "Rol başarıyla güncellendi.",
      user,
    });
  } catch (error) {
    handleError(res, "Rol güncellenemedi.");
  }
};
