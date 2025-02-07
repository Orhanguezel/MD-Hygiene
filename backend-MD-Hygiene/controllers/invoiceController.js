import Invoice from "../models/Invoice.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import PDFDocument from "pdfkit";
import fs from "fs";

// ✅ Yeni fatura oluştur
export const createInvoice = async (req, res) => {
  try {
    console.log("📌 Yeni fatura oluşturuluyor...");
    const { order } = req.body;
    const existingOrder = await Order.findById(order).populate("products.product");

    if (!existingOrder) {
      return res.status(404).json({ message: "Sipariş bulunamadı!" });
    }

    // 🔍 Fatura için ürün bilgileri
    const invoiceItems = existingOrder.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    // 🔍 KDV hesaplama
    const taxRate = 19; // Almanya'da KDV oranı
    const taxAmount = (existingOrder.totalAmount * taxRate) / 100;
    const finalAmount = existingOrder.totalAmount + taxAmount;

    // ✅ Fatura numarası oluştur
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const invoice = new Invoice({
      order,
      user: existingOrder.user,
      items: invoiceItems,
      totalAmount: finalAmount,
      taxAmount,
      taxRate,
      invoiceNumber,
      status: existingOrder.paymentStatus === "paid" ? "paid" : "pending",
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Fatura oluşturulurken hata oluştu!", error: error.message });
  }
};

// ✅ Kullanıcının tüm faturalarını getir
export const getUserInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id })
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "name price");

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Faturalar getirilirken hata oluştu!", error: error.message });
  }
};

// ✅ Admin için tüm faturaları getir
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("user", "name email")
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "name price");

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Tüm faturalar getirilirken hata oluştu!", error: error.message });
  }
};

// ✅ Belirli faturayı getir
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("user", "name email")
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "name price");

    if (!invoice) {
      return res.status(404).json({ message: "Fatura bulunamadı!" });
    }

    if (invoice.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Yetkisiz erişim!" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Fatura alınırken hata oluştu!", error: error.message });
  }
};

// ✅ Fatura PDF olarak indir
export const generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("user", "name email")
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "name price");

    if (!invoice) {
      return res.status(404).json({ message: "Fatura bulunamadı!" });
    }

    const doc = new PDFDocument();
    const fileName = `invoice-${invoice.invoiceNumber}.pdf`;
    const filePath = `./invoices/${fileName}`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text("Fatura", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Fatura No: ${invoice.invoiceNumber}`);
    doc.text(`Fatura Tarihi: ${new Date(invoice.issuedAt).toLocaleDateString()}`);
    doc.text(`Müşteri: ${invoice.user.name}`);
    doc.text(`E-posta: ${invoice.user.email}`);
    doc.moveDown();

    invoice.items.forEach((item, index) => {
      doc.text(`${index + 1}. Ürün: ${item.product.name}`);
      doc.text(`   Miktar: ${item.quantity} Adet`);
      doc.text(`   Fiyat: ${item.unitPrice} €`);
      doc.moveDown();
    });

    doc.text(`Ara Toplam: ${invoice.totalAmount - invoice.taxAmount} €`);
    doc.text(`KDV (%${invoice.taxRate}): ${invoice.taxAmount} €`);
    doc.text(`Toplam Tutar: ${invoice.totalAmount} €`);
    doc.end();

    res.download(filePath, fileName);
  } catch (error) {
    res.status(500).json({ message: "Fatura PDF oluşturulurken hata oluştu!", error: error.message });
  }
};
