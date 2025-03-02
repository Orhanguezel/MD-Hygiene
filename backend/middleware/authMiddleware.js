import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// 🔑 Kullanıcı Doğrulama (JWT ile)
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "Geçersiz kimlik doğrulama!" });
      }

      if (!req.user.isActive) {
        return res.status(403).json({ success: false, message: "Hesabınız devre dışı bırakılmıştır!" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Yetkisiz, geçersiz token!" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Yetkisiz, token eksik!" });
  }
});

// 👑 Rol Bazlı Yetkilendirme (Admin veya Belirli Roller)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("🛑 Kullanıcı Rolü:", req.user.role);
    console.log("✅ Gerekli Roller:", roles);

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Yetkisiz işlem! Gerekli roller: ${roles.join(', ')}` 
      });
    }
    next();
  };
};


export const protect = authenticate;
export const admin = authorizeRoles("admin");
