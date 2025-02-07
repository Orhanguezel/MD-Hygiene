import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getUserInvoices,
  generateInvoicePDF
} from "../controllers/invoiceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllInvoices); // ✅ Admin için tüm faturalar
router.get("/user", protect, getUserInvoices); // ✅ Kullanıcının faturaları
router.get("/:id", protect, getInvoiceById);
router.post("/", protect, createInvoice);
router.get("/:id/pdf", protect, generateInvoicePDF); // ✅ PDF olarak indir

export default router;
