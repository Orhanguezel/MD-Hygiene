import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";

// 📌 Hata Önleyici Fonksiyon (Boş veya yanlış veri varsa düzeltir)
const safeText = (text) => text ? String(text) : "N/A"; 

const generateOfferPDF = (offerData, texts) => {
  if (!offerData) {
    console.error("❌ Teklif verisi bulunamadı!");
    return;
  }

  // ✅ Firma ve Müşteri Bilgilerini Redux Store'dan Al
  const { company } = useSelector((state) => state.company);
  const { customers } = useSelector((state) => state.customer);

  // Müşteriyi ID'ye göre bul
  const customer = customers.find(c => c.id === offerData.customerId) || {};

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ✅ Yazı Fontu ve Güvenli Değerler
  doc.setFont("helvetica", "normal");

  // ✅ Firma Logosu (Sol Üst)
  const logoPath = "/logo.png"; // Logo yolu
  doc.addImage(logoPath, "PNG", 150, 10, 40, 20);

  // ✅ Firma Bilgileri (Sağ Üst)
  doc.setFontSize(10);
  doc.text(safeText(company.name), 20, 20);
  doc.text(safeText(company.address), 20, 25);
  doc.text(safeText("Telefon: " + company.phone), 20, 30);
  doc.text(safeText("E-Mail: " + company.email), 20, 35);

  // ✅ Müşteri Bilgileri (Sol)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(safeText(customer.name), 20, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(safeText(customer.address), 20, 55);
  doc.text(safeText("Telefon: " + customer.phone), 20, 60);
  doc.text(safeText("E-Mail: " + customer.email), 20, 65);

  // ✅ "Angebot" Başlık ve Açıklama
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(safeText(texts?.offers?.title || "Angebot"), 20, 75);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(safeText("Vielen Dank für Ihr Interesse! Gerne bieten wir Ihnen an:"), 20, 80);

  // ✅ Teklif Detayları Tablosu (Numara, Müşteri, Tarih)
  autoTable(doc, {
    startY: 85,
    head: [[
      safeText(texts?.offers?.offerNumber || "Angebotsnr."),
      safeText(texts?.offers?.offerDate || "Datum")
    ]],
    body: [[
      safeText(offerData.offerNumber),
      safeText(offerData.offerDate)
    ]],
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 2, textColor: "#000000", lineWidth: 0.1 },
    headStyles: { fillColor: "#f2f2f2" },
  });

  // ✅ Ürün Tablosu
  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 10,
    head: [[
      safeText(texts?.offers?.pos || "Pos."),
      safeText(texts?.offers?.productName || "Bezeichnung"),
      safeText(texts?.offers?.quantity || "Menge & Einheit"),
      safeText(texts?.offers?.unitPrice || "Einzel €"),
      safeText(texts?.offers?.total || "Gesamt €")
    ]],
    body: offerData.selectedProducts.map((product, index) => [
      index + 1,
      safeText(product.title) + "\n" + safeText(product.description),
      `${safeText(product.quantity)} Stück`,
      `${parseFloat(product.customPrice).toFixed(2)} €`,
      `${(parseFloat(product.customPrice) * parseFloat(product.quantity)).toFixed(2)} €`,
    ]),
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 0, 0], textColor: "#FFFFFF" },
    margin: { top: 5 },
  });

  // ✅ Toplamlar ve KDV Hesaplamaları
  const totalNetto = offerData.selectedProducts.reduce(
    (acc, item) => acc + parseFloat(item.customPrice) * parseFloat(item.quantity),
    0
  );
  const vatAmount = totalNetto * 0.19;
  const totalBrutto = totalNetto + vatAmount;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(safeText(texts?.offers?.netTotal || "Summe der Nettobeträge:"), 120, doc.autoTable.previous.finalY + 10);
  doc.text(`${totalNetto.toFixed(2)} €`, 180, doc.autoTable.previous.finalY + 10, { align: "right" });

  doc.text(safeText(texts?.offers?.taxTotal || "zzgl. 19% Umsatzsteuer:"), 120, doc.autoTable.previous.finalY + 18);
  doc.text(`${vatAmount.toFixed(2)} €`, 180, doc.autoTable.previous.finalY + 18, { align: "right" });

  doc.setFontSize(12);
  doc.text(safeText(texts?.offers?.grandTotal || "Gesamtbetrag"), 120, doc.autoTable.previous.finalY + 28);
  doc.text(`${totalBrutto.toFixed(2)} €`, 180, doc.autoTable.previous.finalY + 28, { align: "right" });

  // ✅ Kapanış Notu
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(safeText("Wir freuen uns, wenn Sie uns Ihren Auftrag anvertrauen!"), 20, doc.autoTable.previous.finalY + 40);

  // ✅ PDF İndirme
  doc.save(`Angebot_${offerData.offerNumber}.pdf`);
};

export default generateOfferPDF;
