import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  changePassword,
  updateUserRole,
  toggleUserStatus,
  updateUser,
} from "../controllers/authController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📝 Kullanıcı Kayıt ve Giriş
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// 👤 Kullanıcı Profil İşlemleri
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

router.route("/change-password").post(authenticate, changePassword);

// 👑 Admin Yetkisi Gerektiren İşlemler
router.route("/users").get(authenticate, authorizeRoles("admin"), getUsers);

router
  .route("/users/:id")
  .get(authenticate, authorizeRoles("admin"), getUserById)
  .put(authenticate, authorizeRoles("admin"), updateUser)
  .delete(authenticate, authorizeRoles("admin"), deleteUser);

router
  .route("/users/:id/role")
  .put(authenticate, authorizeRoles("admin"), updateUserRole);

router
  .route("/users/:id/status")
  .put(authenticate, authorizeRoles("admin"), toggleUserStatus); // Kullanıcıyı blokla/aktif yap

export default router;
