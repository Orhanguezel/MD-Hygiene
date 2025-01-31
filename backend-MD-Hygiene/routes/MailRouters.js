import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Nodemailer Konfiguration
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587, // 465 yerine 587 kullan
    secure: false, // TLS kullanabilmek için secure:false
    auth: {
        user: process.env.SMTP_USER || "info@md-hygienelogistik.de",
        pass: process.env.SMTP_PASSWORD || "AaBb1234,"
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000
});



router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("E-Mail");
    if (!message) missingFields.push("Nachricht");
    
    if (missingFields.length > 0) {
        return res.status(400).send(`Fehlende Felder: ${missingFields.join(", ")}`);
    }

    try {
        await transporter.sendMail({
            from: `"MD-Hygienelogistik" <info@md-hygienelogistik.de>`,
            to: "info@md-hygienelogistik.de",
            subject: `${name}`,
            html: `
                <h2>Von Web Seite eine Nachricht</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>E-Mail:</strong> ${email}</p>
                <p><strong>Nachricht:</strong> ${message}</p>
            `,
        });
        res.status(200).send("E-Mail wurde erfolgreich gesendet!");
    } catch (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        res.status(500).send("Fehler beim Senden der E-Mail.");
    }
});

export default router;
