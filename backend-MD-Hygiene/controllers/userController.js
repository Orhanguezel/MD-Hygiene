import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT oluşturma fonksiyonu
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
};

// Kullanıcı kayıt işlemi
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    // ✅ Kullanıcı zaten var mı?
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });

    // ✅ Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Yeni kullanıcı oluştur
    const user = await User.create({ name, email, password: hashedPassword, role, phone, address });

    res.status(201).json({
      message: "Kullanıcı oluşturuldu!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kullanıcı giriş işlemi
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Geçersiz kimlik bilgileri!" });
    }

    // ✅ Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Geçersiz kimlik bilgileri!" });
    }

    res.json({
      message: "Giriş başarılı!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Kullanıcı profil bilgisi (Auth Middleware gerektirir)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // 🔥 MongoDB'den tüm kullanıcıları getir
    res.json(users);
  } catch (error) {
    console.error("❌ Kullanıcıları alırken hata:", error);
    res.status(500).json({ error: "Kullanıcıları alırken hata oluştu!" });
  }
};
