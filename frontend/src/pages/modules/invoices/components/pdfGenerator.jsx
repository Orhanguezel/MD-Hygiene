import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const euro = "€";
const safeText = (text) => (text ? String(text) : "N/A");

const generateInvoicePDF = (invoiceData, company) => {
  console.log("📄 Fatura PDF Oluşturma Başladı!");
  console.log("🧾 Gelen Fatura Verisi:", invoiceData);
  console.log("🏢 Şirket Bilgileri:", company);

  if (!invoiceData || !company) {
    console.error("❌ HATA: Eksik veri! Fatura veya şirket bilgisi bulunamadı.");
    return;
  }

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ✅ LOGO & Şirket Bilgileri
  if (company.logoUrl) {
    doc.addImage(company.logoUrl, "PNG", 160, 10, 30, 15);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(company.name, 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text(company.address, 20, 26);
  doc.text(`Steuernummer: ${safeText(company.taxNumber)}`, 20, 32);
  doc.text(`Handelsregister-Nr.: ${safeText(company.registrationNumber)}`, 20, 38);

  // ✅ Müşteri Bilgileri
  doc.setFont("helvetica", "bold");
  doc.text("Rechnung an:", 20, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`${safeText(invoiceData.userName)}`, 20, 56);
  doc.text(`${safeText(invoiceData.userAddress)}`, 20, 62);
  doc.text(`E-Mail: ${safeText(invoiceData.userEmail)}`, 20, 68);

  // ✅ FATURA BAŞLIĞI
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Rechnung", 20, 80);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Vielen Dank für Ihren Einkauf. Hier ist Ihre Rechnung:", 20, 86);

  // ✅ Fatura Detayları
  autoTable(doc, {
    startY: 92,
    head: [["Rechnungsnr.", "Bestellnr.", "Datum"]],
    body: [[safeText(invoiceData.invoiceNumber), safeText(invoiceData.orderId), safeText(invoiceData.issuedAt)]],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [230, 230, 230], textColor: "#000" },
    margin: { left: 20, right: 20 },
  });

  // ✅ Ürün Tablosu
  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 10,
    head: [["Pos.", "Bezeichnung", "Menge", "Einzel €", "Gesamt €"]],
    body: invoiceData.items.map((product, index) => [
      index + 1,
      safeText(product.title),
      `${safeText(product.quantity)} Stück`,
      `${parseFloat(product.unitPrice).toFixed(2)} ${euro}`,
      `${(parseFloat(product.unitPrice) * parseFloat(product.quantity)).toFixed(2)} ${euro}`,
    ]),
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 0, 0], textColor: "#FFFFFF" },
    margin: { left: 20, right: 20 },
  });

  // ✅ TOPLAMLAR
  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 10,
    body: [
      ["Summe Netto:", `${safeText(invoiceData.subtotal)} ${euro}`],
      ["zzgl. 19% Umsatzsteuer:", `${safeText(invoiceData.vatAmount)} ${euro}`],
      ["Versandkosten:", `${safeText(invoiceData.shippingCost)} ${euro}`],
      [{ content: "Gesamtbetrag:", styles: { fontStyle: "bold" } }, `${safeText(invoiceData.totalAmount)} ${euro}`],
    ],
    theme: "plain",
    styles: { fontSize: 11, cellPadding: 4 },
    columnStyles: { 0: { fontStyle: "bold" }, 1: { halign: "right" } },
    margin: { left: 120 },
  });

  // ✅ ALT BİLGİLER - BANKA & VERGİ NUMARASI
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(company.name, 20, 260);
  doc.setFont("helvetica", "normal");
  doc.text(company.address, 20, 265);
  doc.text(`Steuernummer: ${safeText(company.taxNumber)}`, 20, 270);
  doc.text(`USt-IdNr.: ${safeText(company.taxNumber)}`, 20, 275);

  doc.setFont("helvetica", "bold");
  doc.text("Bankverbindung:", 140, 260);
  doc.setFont("helvetica", "normal");
  doc.text(`IBAN: ${safeText(company.bankIban)}`, 140, 265);
  doc.text(`BIC: ${safeText(company.bankBic)}`, 140, 270);

  // ✅ KAPANIŞ NOTU
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Wir danken Ihnen für Ihr Vertrauen und freuen uns auf Ihre nächste Bestellung!", 20, 290);

  // ✅ PDF İNDİRME
  doc.save(`Rechnung_${invoiceData.invoiceNumber}.pdf`);
};

export default generateInvoicePDF;
