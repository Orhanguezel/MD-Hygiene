import express from "express";
import { 
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getUserInvoices,
  generateInvoicePDF
} from "../controllers/invoiceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin: Tüm faturaları getir ve yeni fatura oluştur
router.route("/").get(protect, admin, getAllInvoices).post(protect, createInvoice);

// ✅ Kullanıcının kendi faturalarını getir
router.route("/user").get(protect, getUserInvoices);

// ✅ Belirli faturayı getir
router.route("/:id").get(protect, getInvoiceById);

// ✅ Faturayı PDF olarak indir
router.route("/:id/pdf").get(protect, generateInvoicePDF);

export default router;
