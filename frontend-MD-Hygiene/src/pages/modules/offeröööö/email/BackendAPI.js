import nodemailer from "nodemailer";

export const sendOfferEmail = async (req, res) => {
  const { recipient, subject, message, attachment } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-app-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: recipient,
    subject,
    text: message,
    attachments: [
      {
        filename: "Teklif.pdf",
        content: attachment,
        encoding: "base64",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-posta başarıyla gönderildi!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "E-posta gönderimi başarısız." });
  }
};
