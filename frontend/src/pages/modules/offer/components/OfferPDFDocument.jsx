import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const safeText = (text, defaultText = "-") => (text ? String(text) : defaultText);
const euro = "€";

// ✅ Özel karakterleri temizleme fonksiyonu
const sanitizeText = (text) => {
  if (!text) return "-";
  return String(text)
    .normalize("NFD")
    .replace(/[^a-zA-Z0-9äÄöÖüÜß\s.,@-]/g, "");
};

// ✅ Tarih Formatını Düzenle
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("de-DE");
};

// ✅ Logo'yu Base64 formatına çeviren fonksiyon
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

const generateOfferPDF = async (offerData, company, customers) => {
  if (!offerData || !company || !customers) {
    console.error("❌ Teklif, firma veya müşteri verisi eksik!", { offerData, company, customers });
    return;
  }

  const customer = customers.find((c) => c._id === offerData.customer?._id) || {};
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  try {
    const base64Logo = await fetchImageAsBase64("/logo.png");
    if (base64Logo) {
      doc.addImage(base64Logo, "PNG", 160, 10, 30, 15);
    }
  } catch (error) {
    console.error("❌ Logo yükleme hatası:", error);
  }

  // ✅ Firma & Müşteri Bilgileri
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(sanitizeText(company.companyName, "Firma Bilinmiyor"), 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text(`${sanitizeText(company.address?.street)}, ${sanitizeText(company.address?.city)}, ${sanitizeText(company.address?.postalCode)}, ${sanitizeText(company.address?.country)}`, 20, 26);
  doc.text(`E-Mail: ${sanitizeText(company.email, "-")}`, 20, 32);
  doc.text(`Steuernummer: ${sanitizeText(company.taxNumber, "-")}`, 20, 38);

  doc.setFont("helvetica", "bold");
  doc.text(`${sanitizeText(customer.contactName, "Müşteri Adı Yok")}`, 20, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`${sanitizeText(customer.companyName, "Firma Bilinmiyor")}`, 20, 56);
  doc.text(`${sanitizeText(customer.address?.street)}, ${sanitizeText(customer.address?.city)}, ${sanitizeText(customer.address?.postalCode)}, ${sanitizeText(customer.address?.country)}`, 20, 62);
  doc.text(`Telefon: ${sanitizeText(customer.phone, "-")}`, 20, 68);

  // ✅ Teklif Başlığı
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Angebot", 20, 80);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Vielen Dank für Ihr Interesse! Gerne bieten wir Ihnen an:", 20, 86);

  // ✅ Teklif Bilgileri
  autoTable(doc, {
    startY: 100,
    head: [["Angebotsnr.", "Kundennr.", "Datum"]],
    body: [[safeText(offerData.offerNumber, "-"), safeText(customer._id, "-"), formatDate(offerData.createdAt)]],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [230, 230, 230], textColor: "#000" },
    margin: { left: 20, right: 20 },
  });

  let startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 120;

  // ✅ Ürün Tablosu - Eğer ürün yoksa tabloyu çizme
  if (offerData.items && offerData.items.length > 0) {
    autoTable(doc, {
      startY: startY,
      head: [["Pos.", "Bezeichnung", "Menge & Einheit", "Einzel €", "KDV (%)", "Gesamt €"]],
      body: offerData.items.map((product, index) => [
        index + 1,
        sanitizeText(product.title, "-") + "\n" + sanitizeText(product.description, "-"),
        `${safeText(product.quantity, "0")} Stück`,
        `${parseFloat(product.customPrice || 0).toFixed(2)} ${euro}`,
        `%${safeText(product.taxRate, "0")}`,
        `${((parseFloat(product.customPrice || 0) * parseFloat(product.quantity || 0)) * (1 + (product.taxRate || 0) / 100)).toFixed(2)} ${euro}`,
      ]),
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [0, 0, 0], textColor: "#FFFFFF" },
      margin: { left: 20, right: 20 },
    });

    startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 140;
  }

  // ✅ PDF İNDİRME
  doc.save(`Angebot_${offerData.offerNumber}.pdf`);
};

export default generateOfferPDF;
