import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import swaggerDocs from "./config/swagger.js";  

// Route Dosyaları
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import mailRouters from "./routes/mailRouters.js";

// `.env` dosyasını yükle
dotenv.config();

// MongoDB Bağlantısını Başlat
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send(`🚀 Backend API läuft in ${process.env.NODE_ENV} mode!`);
});

// API Rotaları
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/send-email", mailRouters);

// 📌 **Swagger Middleware'i Başlat**
swaggerDocs(app);

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor - ${process.env.NODE_ENV} ortamında`);
});

export default app;
