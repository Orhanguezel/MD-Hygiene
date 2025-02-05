import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// ✅ Kullanıcı oturum kontrolü (Koruma Middleware)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("❌ Yetkilendirme hatası:", error);
      res.status(401).json({ error: "Yetkisiz giriş!" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Giriş yapmalısınız!" });
  }
});

// ✅ Admin kontrolü (Admin Middleware)
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Bu işlem için yetkiniz yok!" });
  }
};

