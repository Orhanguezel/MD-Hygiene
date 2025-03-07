import express from "express";
import dotenv from "dotenv";
import corsMiddleware from "./config/cors.js"; // ✅ CORS middleware'i dışarı alındı
import connectDB from "./config/db.js";
import swaggerDocs from "./config/swagger.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use("/api", routes);

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

export default app;
