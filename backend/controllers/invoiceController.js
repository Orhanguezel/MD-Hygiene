import Invoice from "../models/Invoice.js";
import Order from "../models/Order.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// ✅ Yeni fatura oluştur
export const createInvoice = async (req, res) => {
  try {
    const { order: orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Sipariş ID eksik!" });
    }
    const existingOrder = await Order.findById(orderId).populate("products.product");
    if (!existingOrder) {
      return res.status(404).json({ message: "Sipariş bulunamadı!" });
    }

    // Fatura kalemlerini oluştururken ürün adını da ekle
    const invoiceItems = existingOrder.products.map((item) => ({
      product: item.product._id,
      name: item.product.title || item.product.name || "Bilinmeyen Ürün",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    const taxRate = 19;
    const taxAmount = (existingOrder.totalAmount * taxRate) / 100;
    const finalAmount = existingOrder.totalAmount + taxAmount;

    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Şirket bilgilerini dinamik veya statik olarak ekleyebilirsiniz
    const companyInfo = {
      name: "MD Hygiene Logistics",
      address: "1234 Street, City, Country",
      phone: "+123456789",
      email: "info@mdhygiene.com",
      logoUrl: "https://example.com/logo.png"
    };

    const invoice = new Invoice({
      order: existingOrder._id,
      user: existingOrder.user,
      items: invoiceItems,
      totalAmount: finalAmount,
      taxAmount,
      taxRate,
      invoiceNumber,
      status: existingOrder.paymentStatus === "paid" ? "paid" : "pending",
      companyInfo,
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Fatura oluşturulurken hata oluştu!", error: error.message });
  }
};

// ✅ Kullanıcının faturalarını getir
export const getUserInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id })
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "title name price");
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
      .populate("items.product", "title name price");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Tüm faturalar getirilirken hata oluştu!", error: error.message });
  }
};

// ✅ Fatura PDF olarak indir
export const generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("user", "name email")
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "title name price");
    if (!invoice) {
      return res.status(404).json({ message: "Fatura bulunamadı!" });
    }

    const doc = new PDFDocument();
    const fileName = `invoice-${invoice.invoiceNumber}.pdf`;
    const filePath = path.join(__dirname, "../invoices", fileName);

    // PDF içeriğini oluştur
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text("Fatura", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Fatura No: ${invoice.invoiceNumber}`);
    doc.text(`Tarih: ${new Date(invoice.issuedAt).toLocaleDateString()}`);
    doc.text(`Müşteri: ${invoice.user.name}`);
    doc.text(`E-posta: ${invoice.user.email}`);
    doc.moveDown();

    invoice.items.forEach((item, index) => {
      doc.text(`${index + 1}. Ürün: ${item.name}`);
      doc.text(`   Miktar: ${item.quantity} Adet`);
      doc.text(`   Fiyat: ${item.unitPrice} €`);
      doc.moveDown();
    });

    doc.text(`Ara Toplam: ${invoice.totalAmount - invoice.taxAmount} €`);
    doc.text(`KDV (%${invoice.taxRate}): ${invoice.taxAmount} €`);
    doc.text(`Toplam Tutar: ${invoice.totalAmount} €`);
    doc.end();

    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).json({ message: "Fatura PDF indirilirken hata oluştu!", error: err.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Fatura PDF oluşturulurken hata oluştu!", error: error.message });
  }
};

// ✅ Belirli bir faturayı getir
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("user", "name email")
      .populate("order", "totalAmount status createdAt")
      .populate("items.product", "title name price");
    if (!invoice) {
      return res.status(404).json({ message: "Fatura bulunamadı!" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Fatura alınırken hata oluştu!", error: error.message });
  }
};
