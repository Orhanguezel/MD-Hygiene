import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  changePassword,
  updateUserRole,
} from '../controllers/authController.js';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 📝 Kullanıcı Kayıt ve Giriş
router.post('/register', registerUser);
router.post('/login', loginUser);

// 👤 Kullanıcı Profil İşlemleri
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.post('/change-password', authenticate, changePassword);

// 👑 Admin Yetkisi Gerektiren İşlemler
router.get('/users', authenticate, authorizeRoles('admin'), getUsers);
router.put('/users/:id/role', authenticate, authorizeRoles('admin'), updateUserRole);
router.delete('/users/:id', authenticate, authorizeRoles('admin'), deleteUser);

export default router;
