import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === "true", // TLS kullanımı
    auth: {
        user: process.env.SMTP_USER || "info@md-hygienelogistik.de",
        pass: process.env.SMTP_PASSWORD || "defaultpassword",
    },
});

// 🟢 E-Posta gönderme fonksiyonu
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ E-Mail başarıyla gönderildi: ${info.messageId}`);
    } catch (error) {
        console.error("❌ E-Mail gönderme hatası:", error);
        throw new Error("E-Mail konnte nicht gesendet werden.");
    }
};

export default sendEmail;
