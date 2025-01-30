import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MailRouters from "./routes/MailRouters.js";

dotenv.config();

// MongoDB Verbindung
const mongoURI =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`✅ Erfolgreich mit MongoDB verbunden: ${mongoURI}`))
    .catch((err) => console.error("❌ Fehler bei der MongoDB-Verbindung:", err));

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*", // Alle Domains zulassen
    })
);

app.get("/", (req, res) => {
    res.send("🚀 Backend API läuft!");
});

// Routen
app.use("/send-email", MailRouters);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}!`));
