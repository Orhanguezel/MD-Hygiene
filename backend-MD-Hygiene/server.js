import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import swaggerDocs from "./config/swagger.js";

// ✅ Route Dosyaları
import mailRoutes from "./routes/mailRouters.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import offerRoutes from "./routes/offerRoutes.js"; // ✅ Teklifler
import notificationRoutes from "./routes/notificationRoutes.js"; // ✅ Bildirimler
import auditLogRoutes from "./routes/auditLogRoutes.js"; // ✅ Sistem Logları
import discountRoutes from "./routes/discountRoutes.js"; // ✅ İndirimler

// ✅ Çevresel değişkenleri yükle
dotenv.config();
console.log("✅ ENV YÜKLENDİ!");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

// ✅ Express uygulamasını başlat
const app = express();
app.use(express.json());

// ✅ CORS Yapılandırması (Dinamik)
const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS hatası: Erişime izin verilmeyen kaynak!"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  })
);


app.options("*", cors()); // ✅ OPTIONS istekleri için CORS izin verildi

// ✅ API Route'ları ekle
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/offers", offerRoutes); // ✅ Teklif Yönetimi
app.use("/api/notifications", notificationRoutes); // ✅ Bildirimler
app.use("/api/audit-logs", auditLogRoutes); // ✅ Sistem Logları
app.use("/api/discounts", discountRoutes); // ✅ İndirimler

// ✅ MongoDB Bağlantısını Başlat ve Örnek Verileri Yükle
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB bağlantısı başarılı!");
    console.log("🔗 MongoDB URI:", process.env.MONGO_URI);

    // ✅ Test verileri yükleme (Eğer ortam TEST değilse)
    if (process.env.LOAD_SEED_DATA === "true") {
      const { seedDatabase } = await import("./seed.js");
      await seedDatabase();
    }

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
