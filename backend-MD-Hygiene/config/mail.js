import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createTransporter = () => {
    if (process.env.NODE_ENV === "test") {
        return {
            sendMail: async () => {
                console.log("📩 Mock email sent");
                return { response: "250 OK Mock" };
            },
        };
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: process.env.SMTP_SECURE === "true", // SSL için true, TLS için false
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // 📌 Bazı sunucular için güvenlik duvarını bypass eder
        },
        logger: true,
        debug: true,
    });
};

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: `"MD-Hygiene" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            text,
            html,
        });

        console.log(`✅ Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`❌ Fehler beim Senden der E-Mail:`, error);
        throw error;
    }
};

export default sendEmail;
