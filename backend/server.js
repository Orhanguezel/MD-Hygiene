import express from "express";
import dotenv from "dotenv";
import corsMiddleware from "./config/cors.js";
import connectDB from "./config/db.js";
import swaggerDocs from "./config/swagger.js";
import routes from "./routes/index.js";
import { serveUploads } from "./middleware/uploadMiddleware.js"; // ✅ Upload middleware
import bodyParserMiddleware from "./middleware/bodyParser.js"; // ✅ Body parser middleware

dotenv.config();

const app = express();

app.use("/uploads", serveUploads);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParserMiddleware);
app.use(corsMiddleware);

app.use("/api", routes); // ✅ API Rotaları

// ✅ Server başlatma fonksiyonu
const startServer = async () => {
  try {
    await connectDB();
    swaggerDocs(app);

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`🚀 Server ${PORT} portunda çalışıyor: https://www.md-hygienelogistik.de:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
};

startServer();
