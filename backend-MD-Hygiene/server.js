import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5006;

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => console.error("MongoDB-Fehler:", err));

app.get("/", (req, res) => {
  res.send("Willkommen bei MD-Hygiene API");
});

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
