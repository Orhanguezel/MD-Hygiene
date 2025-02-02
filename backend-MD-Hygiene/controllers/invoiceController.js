import Invoice from "../models/Invoice.js";
import Order from "../models/Order.js";

// Yeni bir fatura oluştur
export const createInvoice = async (req, res) => {
    try {
      console.log("📌 Fatura oluşturma isteği alındı", req.body);
  
      const { order, totalAmount, status } = req.body;

      const existingOrder = await Order.findById(order);
      if (!existingOrder) {
        return res.status(404).json({ message: "Sipariş bulunamadı" });
      }

      // KDV hesaplaması ekledik
      const taxAmount = (existingOrder.totalAmount * 19) / 100;
      const invoiceNumber = `INV-${Date.now()}`;

      const invoice = new Invoice({
        order,
        user: req.user._id,
        totalAmount,
        taxAmount,
        invoiceNumber,
        status,
      });

      await invoice.save();
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ message: "Fatura oluşturulurken hata oluştu", error: error.message });
    }
  };


  // ✅ Tüm faturaları getir (Eksik olan fonksiyon)
export const getInvoices = async (req, res) => {
  try {
      console.log("📌 Tüm faturalar listeleniyor...");

      const invoices = await Invoice.find({}).populate("user", "name email").populate("order");
      res.status(200).json(invoices);
  } catch (error) {
      console.error("❌ Faturalar alınırken hata oluştu:", error);
      res.status(500).json({ message: "Faturalar alınırken hata oluştu", error: error.message });
  }
};



// Kullanıcının tüm faturalarını getir
export const getInvoiceById = async (req, res) => {
    try {
      console.log("📌 Fatura detayı isteniyor:", req.params.id);
  
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) {
        console.error("❌ Hata: Fatura bulunamadı!", req.params.id);
        return res.status(404).json({ message: "Fatura bulunamadı" });
      }
  
      // Kullanıcı kendi faturasını mı görüntülüyor kontrol et
      if (invoice.user.toString() !== req.user._id.toString()) {
        console.error("❌ Yetkisiz erişim!", req.user._id);
        return res.status(403).json({ message: "Yetkisiz erişim!" });
      }
  
      console.log("✅ Fatura bulundu:", invoice);
      res.status(200).json(invoice);
    } catch (error) {
      console.error("❌ Fatura alınırken hata oluştu:", error);
      res.status(500).json({ message: "Fatura alınırken hata oluştu", error: error.message });
    }
  };
  
