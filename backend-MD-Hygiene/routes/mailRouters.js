import express from "express";
import sendEmail from "../config/mail.js"; // 📌 Mail config dosyasını içe aktar

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("E-Mail");
    if (!message) missingFields.push("Nachricht");

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Fehlende Felder: ${missingFields.join(", ")}` });
    }

    try {
        const subject = `${name} - Neue Nachricht von der Website`;
        const htmlContent = `
            <h2>Von Web Seite eine Nachricht</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Nachricht:</strong> ${message}</p>
        `;

        // 📌 **Maili gönder**
        const info = await sendEmail("info@md-hygienelogistik.de", subject, "", htmlContent);

        console.log("✅ Email sent:", info.response);
        res.status(200).json({ message: "E-Mail wurde erfolgreich gesendet!" });
    } catch (error) {
        console.error("❌ Fehler beim Senden der E-Mail:", error);
        res.status(500).json({ message: "Fehler beim Senden der E-Mail.", error: error.message });
    }
});

export default router;
