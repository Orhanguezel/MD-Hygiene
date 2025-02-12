import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT == 465, // 465 SSL kullanır, diğerleri TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});


// 🟢 E-Posta gönderme fonksiyonu
const sendEmail = async (to, subject, text) => {
    try {
        if (!to || !subject || !text) {
            throw new Error("Eksik e-posta bilgileri!");
        }

        const mailOptions = {
            from: `"MD Hygiene" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        };

        console.log("📨 Mail gönderme başlatıldı...");
        console.log(`📤 SMTP Sunucu: ${process.env.SMTP_HOST}`);
        console.log(`📧 Kullanıcı: ${process.env.SMTP_USER}`);

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ E-Mail başarıyla gönderildi: ${info.messageId}`);
    } catch (error) {
        console.error("❌ E-Mail gönderme hatası:", error);
        throw new Error(`E-Mail konnte nicht gesendet werden. Detay: ${error.message}`);
    }
};


export default sendEmail;
