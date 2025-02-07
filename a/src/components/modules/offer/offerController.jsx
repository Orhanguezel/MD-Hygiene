import Offer from "../models/Offer.js";
import Notification from "../models/Notification.js"; // 📌 Bildirim Modeli
import { sendEmail } from "../utils/emailUtils.js"; // 📌 E-posta Gönderme
import User from "../models/User.js";

export const createOffer = async (req, res) => {
  try {
    const { user, items } = req.body;
    
    // Teklif oluşturma işlemleri...
    const offer = new Offer({ user, items, totalAmount: finalAmount, taxAmount });
    await offer.save();

    // 📌 Kullanıcıya Bildirim Gönder
    await Notification.create({
      user: user,
      message: `Yeni teklif oluşturuldu: ${offer._id}`,
      type: "offer",
    });

    // 📌 Admin'e Bildirim Gönder
    const adminUsers = await User.find({ role: "admin" });
    for (let admin of adminUsers) {
      await Notification.create({
        user: admin._id,
        message: `Yeni teklif bekliyor: ${offer._id}`,
        type: "offer",
      });
    }

    // 📌 Kullanıcıya E-posta Gönder
    await sendEmail(user.email, "Teklifiniz Alındı", `Teklifiniz başarıyla alındı: ${offer._id}`);

    res.status(201).json({ message: "Teklif başarıyla oluşturuldu!", offer });
  } catch (error) {
    res.status(500).json({ message: "Teklif oluşturulamadı!", error: error.message });
  }
};
