import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT oluşturma fonksiyonu
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Kullanıcı kayıt işlemi
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "Kullanıcı oluşturuldu!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Geçersiz kimlik bilgileri!" });
    }

    res.json({
      message: "Giriş başarılı!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kullanıcı profil bilgisi
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};
