import express from "express";
import sendEmail from "../config/mail.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.error("❌ Fehler: Eksik Alanlar -", { name, email, message });
        return res.status(400).json({ error: "Fehlende Felder!" });
    }

    try {
        console.log(`📩 E-Mail gönderiliyor: ${email} -> ${message}`);

        await sendEmail(email, "Neue Nachricht", message);
        
        console.log("✅ E-Mail Başarıyla Gönderildi!");
        return res.status(200).json({ message: "E-Mail wurde erfolgreich gesendet!" });

    } catch (error) {
        console.error("❌ Fehler beim Senden der E-Mail:", error);

        return res.status(500).json({
            error: "Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.",
            details: error.message,
        });
    }
});

export default router;

