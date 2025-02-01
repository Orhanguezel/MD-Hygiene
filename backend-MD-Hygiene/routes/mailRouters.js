import express from "express";
import sendEmail from "../config/mail.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Fehlende Felder!" });
    }

    try {
        await sendEmail(email, "Neue Nachricht", message);
        res.status(200).json({ message: "E-Mail wurde erfolgreich gesendet!" });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Senden der E-Mail." });
    }
});

export default router;
