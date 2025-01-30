import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "seninmail@gmail.com",
            pass: "sifren"
        }
    });

    let mailOptions = {
        from: "seninmail@gmail.com",
        to: email,
        subject: "Hoş Geldiniz!",
        text: "Web sitemize hoş geldiniz. Güncellemeleri almak için kaydoldunuz!"
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "📧 Email başarıyla gönderildi!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Email gönderme hatası!" });
    }
});

export default router;
