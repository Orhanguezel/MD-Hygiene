import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";  // ✅ Veritabanı bağlantısı
import mailRoutes from "./routes/mailRouters.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import swaggerDocs from "./config/swagger.js";

dotenv.config();

// ✅ Express uygulamasını başlat
const app = express();

// ✅ Middleware'leri tanımla
app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ MongoDB Bağlantısını Başlat
connectDB();

// ✅ Route'ları ekle
app.use("/api/send-email", mailRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Swagger API Dokümantasyonu
swaggerDocs(app);

// ✅ Sunucuyu başlat
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor - ${process.env.NODE_ENV} ortamında`);
});
