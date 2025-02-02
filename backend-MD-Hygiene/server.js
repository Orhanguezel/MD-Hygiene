import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";  // ✅ Default Export kullanılıyor! 

import mailRoutes from "./routes/mailRouters.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import swaggerDocs from "./config/swagger.js";

// ✅ Express uygulamasını başlat
const app = express();
app.use(express.json());

const { PORT, CORS_ORIGIN } = process.env;

// ✅ CORS Yapılandırması
const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(",").map(origin => origin.trim()) : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS policy does not allow this origin: ${origin}`);
      callback(new Error("CORS policy does not allow this origin."));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
    const serverPort = PORT || 5010;
    app.listen(serverPort, () => {
      console.log(`🚀 Server ${serverPort} portunda çalışıyor.`);
    });

  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
};

startServer();
