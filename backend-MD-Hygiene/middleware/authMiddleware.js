import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // "Bearer <token>" şeklinde geliyor
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // Şifreyi hariç tut

      next();
    } catch (error) {
      return res.status(401).json({ message: "Yetkisiz! Geçersiz token." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Yetkilendirme hatası! Token bulunamadı." });
  }
};

export { protect };
