import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const safeText = (text) => (text ? String(text) : "N/A");

const euro = "€";

const generateOfferPDF = (offerData, company, customers) => {
  if (!offerData || !company || !customers) {
    console.error("❌ Teklif, firma veya müşteri verisi eksik!");
    return;
  }

  const customer = customers.find((c) => c.id === offerData.customerId) || {};

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ✅ LOGO & ÜST KISIM
  const logoPath = "/logo.png";
  doc.addImage(logoPath, "PNG", 160, 10, 30, 15);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(company.name, 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text(company.address, 20, 26);

  // ✅ Müşteri Bilgileri (Sol Üst)
  doc.setFont("helvetica", "bold");
  doc.text(`${customer.contactPerson}`, 20, 40);
  doc.setFont("helvetica", "normal");
  doc.text(`${customer.address}`, 20, 46);

  // ✅ TEKLİF BAŞLIĞI
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Angebot", 20, 60);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Vielen Dank für Ihr Interesse! Gerne bieten wir Ihnen an:", 20, 66);

  // ✅ Teklif Numarası - Müşteri No - Tarih
  autoTable(doc, {
    startY: 72,
    head: [["Angebotsnr.", "Kundennr.", "Datum"]],
    body: [[safeText(offerData.offerNumber), safeText(customer.id), safeText(offerData.offerDate)]],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [230, 230, 230], textColor: "#000" },
    margin: { left: 20, right: 20 },
  });

  // ✅ Ürün Tablosu
  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 10,
    head: [["Pos.", "Bezeichnung", "Menge & Einheit", "Einzel €", "Gesamt €"]],
    body: offerData.selectedProducts.map((product, index) => [
      index + 1,
      safeText(product.title) + "\n" + safeText(product.description),
      `${safeText(product.quantity)} Stück`,
      `${parseFloat(product.customPrice).toFixed(2)} ${euro}`,
      `${(parseFloat(product.customPrice) * parseFloat(product.quantity)).toFixed(2)} ${euro}`,
    ]),
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 0, 0], textColor: "#FFFFFF" },
    margin: { left: 20, right: 20 },
  });

  // ✅ TOPLAMLAR
  const totalNetto = offerData.selectedProducts.reduce(
    (acc, item) => acc + parseFloat(item.customPrice) * parseFloat(item.quantity),
    0
  );
  const vatAmount = totalNetto * 0.19;
  const totalBrutto = totalNetto + vatAmount + parseFloat(offerData.shippingCost);

  autoTable(doc, {
    startY: doc.autoTable.previous.finalY + 10,
    body: [
      ["Summe der Nettobeträge:", `${totalNetto.toFixed(2)} ${euro}`],
      ["zzgl. 19% Umsatzsteuer:", `${vatAmount.toFixed(2)} ${euro}`],
      ["Versandkosten:", `${parseFloat(offerData.shippingCost).toFixed(2)} ${euro}`],
      [{ content: "Gesamtbetrag:", styles: { fontStyle: "bold" } }, `${totalBrutto.toFixed(2)} ${euro}`],
    ],
    theme: "plain",
    styles: { fontSize: 11, cellPadding: 4 },
    columnStyles: { 0: { fontStyle: "bold" }, 1: { halign: "right" } },
    margin: { left: 120 },
  });

  // ✅ ALT BİLGİLER - BANKA & VERGİ NUMARASI
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Prime Coffee GmbH", 20, 260);
  doc.setFont("helvetica", "normal");
  doc.text(company.address, 20, 265);
  doc.text(`Steuernummer: ${company.taxNumber}`, 20, 270);
  doc.text(`USt-IdNr.: ${company.taxNumber}`, 20, 275);

  doc.setFont("helvetica", "bold");
  doc.text("Bankverbindung:", 140, 260);
  doc.setFont("helvetica", "normal");
  doc.text(`IBAN: ${company.bankIban}`, 140, 265);
  doc.text(`BIC: ${company.bankBic}`, 140, 270);

  // ✅ MUSTER FİLİGRANI (Opsiyonel)
  doc.setFontSize(40);
  doc.setTextColor(200, 200, 200);
  doc.text("MUSTER", 50, 180, { angle: 30 });

  // ✅ KAPANIŞ NOTU
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("Wir freuen uns, wenn Sie uns Ihren Auftrag anvertrauen!", 20, 290);

  // ✅ PDF İNDİRME
  doc.save(`Angebot_${offerData.offerNumber}.pdf`);
};

export default generateOfferPDF;
