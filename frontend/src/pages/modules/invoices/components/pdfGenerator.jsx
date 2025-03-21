import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const euro = "€";

// ✅ **Metinleri Güvenli Hale Getir ve Bozuk Karakterleri Temizle**
const sanitizeText = (text) => {
  if (!text) return "N/A";
  return String(text)
    .replace(/Ø/g, "O")
    .replace(/Ü/g, "U")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ä/g, "a")
    .replace(/Ö/g, "O")
    .replace(/Ä/g, "A")
    .replace(/ß/g, "ss")
    .replace(/[^a-zA-Z0-9äÄöÖüÜß\s.,@-]/g, ""); // Sadece izin verilen karakterleri bırak
};

// ✅ **Tarih Formatını Düzenle**
const formatDate = (dateString) => {
  if (!dateString) return "Datum nicht verfügbar";
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE");
};

// ✅ **PNG'yi Base64'e Çeviren Fonksiyon**
const fetchImageAsBase64 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("🚨 Logo yüklenirken hata oluştu:", error);
    return null;
  }
};

const generateInvoicePDF = async (invoiceData) => {
  console.log("📄 Fatura PDF Oluşturma Başladı!");
  console.log("🧾 Gelen Fatura Verisi:", invoiceData);

  if (!invoiceData || !invoiceData.company) {
    console.error("❌ HATA: Eksik veri! Fatura veya şirket bilgisi bulunamadı.");
    return;
  }

  const company = invoiceData.company;
  console.log("🏢 Şirket Bilgileri:", company);

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ✅ **LOGO EKLEME**
  if (company.logoUrl) {
    try {
      const base64Logo = await fetchImageAsBase64(company.logoUrl);
      if (base64Logo) {
        doc.addImage(base64Logo, "PNG", 150, 10, 50, 20);
      }
    } catch (error) {
      console.error("🚨 Logo eklenirken hata oluştu:", error);
    }
  }

  // ✅ **Şirket Bilgileri**
  let y = 20; // Satır başlangıç noktası
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(sanitizeText(company.companyName), 20, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`${sanitizeText(company.address?.street)}, ${sanitizeText(company.address?.city)}`, 20, (y += 6));
  doc.text(`${sanitizeText(company.address?.postalCode)}, ${sanitizeText(company.address?.country)}`, 20, (y += 6));
  doc.text(`📌 Steuernummer: ${sanitizeText(company.taxNumber)}`, 20, (y += 6));
  doc.text(`📌 Handelsregister-Nr.: ${sanitizeText(company.handelsregisterNumber)}`, 20, (y += 6));

  // ✅ **Müşteri Bilgileri**
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Rechnung an:", 20, y);
  doc.setFont("helvetica", "normal");

  if (invoiceData.user) {
    doc.text(sanitizeText(invoiceData.user.name), 20, (y += 6));
    if (invoiceData.user.address) {
      doc.text(sanitizeText(invoiceData.user.address.street), 20, (y += 6));
      doc.text(`${sanitizeText(invoiceData.user.address.postalCode)} ${sanitizeText(invoiceData.user.address.city)}`, 20, (y += 6));
    } else {
      doc.text("🚨 Adres bilgisi eksik!", 20, (y += 6));
    }
    doc.text(`📧 E-Mail: ${sanitizeText(invoiceData.user.email)}`, 20, (y += 6));
  } else {
    doc.text("❌ Müşteri bilgisi eksik!", 20, (y += 6));
  }

  // ✅ **Fatura Başlığı**
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Rechnung", 20, y);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Vielen Dank für Ihren Einkauf. Hier ist Ihre Rechnung:", 20, (y += 6));

  let startY = y + 6;

  // ✅ **Fatura Detayları**
  autoTable(doc, {
    startY,
    head: [["Rechnungsnr.", "Bestellnr.", "Datum"]],
    body: [[
      sanitizeText(invoiceData.invoiceNumber), 
      sanitizeText(invoiceData.order?._id || "Bestellnummer nicht verfügbar"),
      formatDate(invoiceData.issuedAt)
    ]],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 128, 0], textColor: "#FFFFFF" },
    margin: { left: 20, right: 20 },
  });

  startY = doc.lastAutoTable.finalY + 6;

  // ✅ **Ürün Tablosu**
  autoTable(doc, {
    startY,
    head: [["Pos.", "Bezeichnung", "Menge", "Einzel €", "Gesamt €"]],
    body: invoiceData.items.map((product, index) => [
      index + 1,
      sanitizeText(product.name || product.title || "Unbekanntes Produkt"),
      `${sanitizeText(product.quantity)} Stück`,
      `${parseFloat(product.unitPrice).toFixed(2)} ${euro}`,
      `${(parseFloat(product.unitPrice) * parseFloat(product.quantity)).toFixed(2)} ${euro}`,
    ]),
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 0, 0], textColor: "#FFFFFF" },
    margin: { left: 20, right: 20 },
  });

  startY = doc.lastAutoTable.finalY + 6;

  // ✅ **Toplamlar**
  autoTable(doc, {
    startY,
    body: [
      ["Zwischensumme:", `${parseFloat(invoiceData.totalAmount / 1.19).toFixed(2)} ${euro}`], 
      ["zzgl. 19% Umsatzsteuer (MwSt.):", `${(parseFloat(invoiceData.totalAmount) - parseFloat(invoiceData.totalAmount / 1.19)).toFixed(2)} ${euro}`], 
      ["Versandkosten:", `${parseFloat(invoiceData.shippingCost || 0).toFixed(2)} ${euro}`], 
      [{ content: "Gesamtbetrag:", styles: { fontStyle: "bold", fontSize: 13 } }, `${sanitizeText(invoiceData.totalAmount)} ${euro}`],
    ],
    theme: "plain",
    styles: { fontSize: 11, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: "bold" }, 1: { halign: "right" } },
    margin: { left: 120 },
  });

  // ✅ **PDF İNDİRME**
  doc.save(`Rechnung_${sanitizeText(invoiceData.invoiceNumber)}.pdf`);
};

export default generateInvoicePDF;
