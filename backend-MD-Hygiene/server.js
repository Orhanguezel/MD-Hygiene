import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import mailRoutes from "./routes/mailRouters.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import swaggerDocs from "./config/swagger.js";
import dotenv from "dotenv";

// ✅ Çevresel değişkenleri yükle
dotenv.config();

// ✅ Express uygulamasını başlat
const app = express();
app.use(express.json());

// ✅ CORS Yapılandırması (Eski Haline Geri Döndürüldü, Dinamik)
const allowedOrigins = process.env.CORS_ORIGIN || "https://www.md-hygienelogistik.de";


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin."));
      }
    },
    credentials: true,
  })
);

app.options("*", cors()); // ✅ OPTIONS istekleri için CORS izin verildi

// ✅ MongoDB Bağlantısını Başlat
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
    app.use("/api/categories", categoryRoutes);
    app.use("/api/reviews", reviewRoutes);
    app.use("/api/shipments", shipmentRoutes);
    app.use("/api/sales", saleRoutes);
    app.use("/api/stores", storeRoutes);

    // ✅ Swagger API Dokümantasyonu
    swaggerDocs(app);

    // ✅ Jest test ortamında sunucuyu başlatma
    if (process.env.NODE_ENV !== "test") {
      const PORT = process.env.PORT || 5010;
      app.listen(PORT, () => {
        console.log(`🚀 Server ${PORT} portunda çalışıyor.`);
      });
    }
  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
