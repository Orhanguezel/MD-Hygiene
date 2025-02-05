import express from "express";
dotenv.config();
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
console.log("✅ ENV YÜKLENDİ!");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);


// ✅ Express uygulamasını başlat
const app = express();
app.use(express.json());

// ✅ CORS Yapılandırması (Eski Haline Geri Döndürüldü, Dinamik)
const allowedOrigins = [process.env.CORS_ORIGIN];



app.use(
  cors({
    origin: allowedOrigins[0], // Tek bir değer olarak ayarlıyoruz
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  })
);


app.options("*", cors()); // ✅ OPTIONS istekleri için CORS izin verildi

// ✅ MongoDB Bağlantısını Başlat
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB bağlantısı başarılı!");
    console.log("🔗 MongoDB URI:", process.env.MONGO_URI);


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
