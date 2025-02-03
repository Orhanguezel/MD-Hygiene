import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import mailRoutes from "./routes/mailRouters.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import swaggerDocs from "./config/swagger.js";
import dotenv from "dotenv";

// ✅ .env dosyasını yükle
dotenv.config();

// ✅ Express uygulamasını başlat
const app = express();
app.use(express.json());

const { PORT, CORS_ORIGIN } = process.env;

// ✅ CORS Yapılandırması (GÜNCELLENDİ)
const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(",").map(origin => origin.trim()) : [];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.options("*", cors()); // ✅ OPTIONS istekleri için CORS izin verildi

// ✅ MongoDB bağlantısını başlat
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB bağlantısı başarılı!");

    // ✅ API Route'ları ekle
    app.use("/api/mail", mailRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/invoices", invoiceRoutes);
    app.use("/api/payments", paymentRoutes);

    // ✅ Swagger API Dokümantasyonu
    swaggerDocs(app);

    // ✅ Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(`🚀 Server ${PORT} portunda çalışıyor.`);
    });

  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
};

startServer();
