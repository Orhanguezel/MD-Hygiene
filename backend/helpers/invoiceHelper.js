import Company from "../models/Company.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 📌 **Vergi Hesaplama Fonksiyonu**
export const calculateTax = (totalAmount, taxRate = 19) => {
  const taxAmount = parseFloat((totalAmount * taxRate / 100).toFixed(2));
  const finalAmount = parseFloat((totalAmount + taxAmount).toFixed(2));
  return { taxAmount, finalAmount };
};

// 📌 **Şirket Bilgilerini Getir**
export const getCompanyInfo = async () => {
  const company = await Company.findOne();
  if (!company) throw new Error("🚨 Şirket bilgileri bulunamadı!");
  return company;
};

// 📌 **PDF Fatura Oluştur**
export const generateInvoicePDF = async (invoice) => {
  const doc = new PDFDocument();
  const fileName = `invoice-${invoice.invoiceNumber}.pdf`;
  const invoicesDir = path.join(__dirname, "../invoices");

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  const filePath = path.join(invoicesDir, fileName);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Fatura", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Fatura No: ${invoice.invoiceNumber}`);
  doc.text(`Tarih: ${new Date(invoice.issuedAt).toLocaleDateString()}`);
  doc.text(`Müşteri: ${invoice.user.name}`);
  doc.text(`E-posta: ${invoice.user.email}`);
  doc.moveDown();

  if (invoice.company) {
    doc.text(`Firma: ${invoice.company.companyName}`);
    doc.text(`Adres: ${invoice.company.address.street}, ${invoice.company.address.city}`);
    doc.text(`Telefon: ${invoice.company.phone}`);
    doc.text(`E-Posta: ${invoice.company.email}`);
    doc.text(`Vergi Numarası: ${invoice.company.taxNumber}`);
    doc.text(`Handelsregister: ${invoice.company.handelsregisterNumber}`);
    doc.moveDown();
  }

  invoice.items.forEach((item, index) => {
    doc.text(`${index + 1}. Ürün: ${item.name}`);
    doc.text(`   Miktar: ${item.quantity} Adet`);
    doc.text(`   Fiyat: ${item.unitPrice} €`);
    doc.moveDown();
  });

  doc.text(`Toplam Tutar: ${invoice.totalAmount.toFixed(2)} €`);
  doc.end();

  return filePath;
};
