import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  changePassword,
  updateUserRole,
} from "../controllers/authController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📝 Kullanıcı Kayıt ve Giriş
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// 👤 Kullanıcı Profil İşlemleri
router
  .route('/profile')
  .get(authenticate, getUserProfile)  
  .put(authenticate, updateUserProfile);

router.route('/change-password').post(authenticate, changePassword);

// 👑 Admin Yetkisi Gerektiren İşlemler
router
  .route('/users')
  .get(authenticate, authorizeRoles("admin"), getUsers); // ✅ admin hatası giderildi

router
  .route('/users/:id/role')
  .put(authenticate, authorizeRoles("admin"), updateUserRole); // ✅ admin hatası giderildi

router
  .route('/users/:id')
  .delete(authenticate, authorizeRoles("admin"), deleteUser); // ✅ admin hatası giderildi

export default router;

