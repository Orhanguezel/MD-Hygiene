import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

export const createPayment = async (req, res) => {
  try {
    const { order, amount, paymentMethod, transactionId } = req.body;

    const existingOrder = await Order.findById(order);
    if (!existingOrder) {
      return res.status(404).json({ message: "Sipariş bulunamadı!" });
    }

    const payment = new Payment({
      order,
      user: req.user._id,
      amount,
      paymentMethod,
      transactionId,
      status: "completed",
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: "Ödeme işlemi başarısız!", error: error.message });
  }
};

// Tüm ödemeleri getir
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("order");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Ödemeler getirilirken hata oluştu!" });
  }
};


// ✅ Eksik olan `getPaymentById` fonksiyonunu ekledik!
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("order");
    if (!payment) {
      return res.status(404).json({ message: "Ödeme bulunamadı!" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Ödeme detayları getirilirken hata:", error);
    res.status(500).json({ message: "Ödeme detayları getirilirken hata oluştu!" });
  }
};

