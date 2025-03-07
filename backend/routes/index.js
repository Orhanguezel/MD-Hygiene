import express from "express";

import mailRoutes from "./mailRouters.js";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import shipmentRoutes from "./shipmentRoutes.js";
import saleRoutes from "./saleRoutes.js";
import storeRoutes from "./storeRoutes.js";
import offerRoutes from "./offerRoutes.js"; 
import notificationRoutes from "./notificationRoutes.js"; 
import auditLogRoutes from "./auditLogRoutes.js"; 
import discountRoutes from "./discountRoutes.js"; 
import cartRoutes from "./cartRoutes.js"; 
import customerRoutes from "./customerRoutes.js"; 
import companyRoutes from "./companyRoutes.js"; 
import favoritesRoutes from "./favoritesRoutes.js";

const router = express.Router();


router.use("/mail", mailRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/payments", paymentRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);
router.use("/shipments", shipmentRoutes);
router.use("/sales", saleRoutes);
router.use("/stores", storeRoutes);
router.use("/offers", offerRoutes); 
router.use("/notifications", notificationRoutes);
router.use("/audit-logs", auditLogRoutes); 
router.use("/discounts", discountRoutes); 
router.use("/cart", cartRoutes);
router.use("/customers", customerRoutes);
router.use("/companies", companyRoutes);
router.use("/favorites", favoritesRoutes);

export default router;