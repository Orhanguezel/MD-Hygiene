import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 🔑 Kullanıcı Doğrulama (JWT ile)
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Yetkisiz erişim. Token bulunamadı.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Geçersiz token.', error: error.message });
  }
};

// 👑 Rol Bazlı Yetkilendirme (Admin veya Belirli Roller)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Bu işlem için yetkiniz yok: ${roles.join(', ')}` });
    }
    next();
  };
};
