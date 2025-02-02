import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";  // ✅ Default Export kullanılıyor! 
import mailRoutes from "./routes/mailRouters.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import swaggerDocs from "./config/swagger.js";

// ✅ Ortam değişkenlerini yükle
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
console.log(`🛠️ Yüklenen ENV Dosyası: ${envFile}`);


dotenv.config({ path: envFile });

// ✅ Ortama göre değişkenleri belirle
const {
  NODE_ENV,
  PORT,
  MONGO_URI,
  CORS_ORIGIN,
  SMTP_USER,
  VITE_API_URL,
  VITE_PORT
} = process.env;

// ✅ Konsolda log olarak tüm ortam değişkenlerini yazdır (Sorun giderme için)
console.log("📌 Yüklenen Ortam Değişkenleri:");
console.log(`🌍 NODE_ENV: ${NODE_ENV}`);
console.log(`🔗 MONGO_URI: ${MONGO_URI}`);
console.log(`📧 SMTP_USER: ${SMTP_USER}`);
console.log(`📡 VITE_API_URL: ${VITE_API_URL}`);
console.log(`🚀 VITE_PORT: ${VITE_PORT}`);
console.log(`🌐 CORS_ORIGIN: ${CORS_ORIGIN}`);

// ✅ Express uygulamasını başlat
const app = express();
app.use(express.json());

// 🟢 CORS Middleware - Tüm local adreslere izin ver
app.use(cors({
  origin: "*", // 
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
}));



app.options("*", cors());

// ✅ MongoDB bağlantısını başlat
const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await connectDB(); // Test ortamında çalışmasın!
    }
    
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
    const serverPort = PORT || 5010;
    app.listen(process.env.PORT || 5010, () => {
      console.log(`🚀 Server ${process.env.PORT || 5010} portunda çalışıyor.`);
    });

  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
};

startServer(); // ✅ Asenkron başlatma

export default app; // ✅ Testler için app'i dışa aktar
