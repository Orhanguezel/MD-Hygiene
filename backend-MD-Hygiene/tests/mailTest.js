import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // SSL bağlantısı için true
    auth: {
        user: "info@md-hygienelogistik.de",
        pass: "Md123456,"
    }
});

const mailOptions = {
    from: '"MD Hygiene" <info@md-hygienelogistik.de>',
    to: "destek@md-hygienelogistik.de",
    subject: "SMTP Test Maili",
    text: "Bu bir test mailidir. Eğer bu e-postayı aldıysanız SMTP çalışıyor demektir!"
};

transporter.sendMail(mailOptions)
    .then(info => console.log("✅ Mail başarıyla gönderildi:", info.response))
    .catch(error => console.log("📛 Mail gönderme hatası:", error));
