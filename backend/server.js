import express from "express";
import dotenv from "dotenv";
import corsMiddleware from "./config/cors.js";
import connectDB from "./config/db.js";
import swaggerDocs from "./config/swagger.js";
import routes from "./routes/index.js";
import { serveUploads } from "./middleware/upload.js"; // ✅ Upload middleware
import bodyParserMiddleware from "./middleware/bodyParser.js"; // ✅ Body parser middleware

dotenv.config();

const app = express();
app.use(bodyParserMiddleware);
app.use(express.json({ limit: "50mb" })); // ✅ JSON limiti artırıldı
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(corsMiddleware);
app.use("/api", routes);
app.use(serveUploads); // ✅ `uploads` klasörünü servis et

const startServer = async () => {
  try {
    await connectDB();
    swaggerDocs(app);

    const PORT = process.env.PORT || 5010;
    app.listen(PORT, () => {
      console.log(`🚀 Server ${PORT} portunda çalışıyor: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error.message);
    process.exit(1);
  }
};

startServer();


