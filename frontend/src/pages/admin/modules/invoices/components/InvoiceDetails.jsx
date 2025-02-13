import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoiceById } from "@/features/invoices/invoicesSlice";
import { useLanguage } from "@/features/language/useLanguage"; 
import { useTheme } from "@/features/theme/useTheme";
import { generateInvoicePDF } from "@/utils/pdfGenerator";
import { toast } from "react-toastify";
import {
  InvoiceDetailsContainer,
  InvoiceInfo,
  ItemList,
  Item,
  ActionButton,
} from "../styles/invoicesStyles";

const InvoiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedInvoice, status } = useSelector((state) => state.invoices);
  const { texts } = useLanguage(); 
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchInvoiceById(id));
  }, [dispatch, id]);

  // ✅ Hata ve yükleme kontrolleri
  if (status === "loading") {
    toast.info(`📦 ${texts?.invoices?.loading || "Fatura yükleniyor..."}`);
    return <p>📦 {texts?.invoices?.loading || "Fatura yükleniyor..."}</p>;
  }

  if (!selectedInvoice) {
    toast.error(`❌ ${texts?.invoices?.notFound || "Fatura bulunamadı!"}`);
    return <p>❌ {texts?.invoices?.notFound || "Fatura bulunamadı!"}</p>;
  }

  const handlePDFDownload = () => {
    try {
      console.log("📄 PDF için Fatura Bilgisi:", selectedInvoice);
      console.log("🌍 Kullanılan Dil:", texts);

      generateInvoicePDF(selectedInvoice, texts); // ✅ `texts` parametre olarak geçiliyor

      toast.success(`📄 ${texts?.invoices?.pdfDownloaded || "PDF başarıyla indirildi!"}`);
    } catch (error) {
      console.error("❌ HATA: PDF oluşturulurken hata oluştu!", error);
      toast.error(`❌ ${texts?.invoices?.pdfError || "PDF oluşturulurken hata oluştu!"}`);
    }
  };

  return (
    <InvoiceDetailsContainer theme={theme}>
      <h1>🧾 {texts?.invoices?.details || "Fatura Detayları"}</h1>
      <InvoiceInfo theme={theme}>
        <p><strong>{texts?.invoices?.invoiceNumber || "Fatura No"}:</strong> {selectedInvoice.invoiceNumber}</p>
        <p><strong>{texts?.invoices?.customer || "Müşteri"}:</strong> {selectedInvoice.userName || texts?.invoices?.unknownCustomer || "Bilinmeyen Müşteri"}</p>
        <p><strong>{texts?.invoices?.date || "Tarih"}:</strong> {new Date(selectedInvoice.issuedAt).toLocaleDateString()}</p>
        <p><strong>{texts?.invoices?.total || "Toplam"}:</strong> €{selectedInvoice.totalAmount.toFixed(2)}</p>
      </InvoiceInfo>

      <h2>🛍 {texts?.invoices?.products || "Ürünler"}</h2>
      <ItemList theme={theme}>
        {selectedInvoice.items.length > 0 ? (
          selectedInvoice.items.map((item, index) => (
            <Item key={index} theme={theme}>
              <p>📦 {item.product}</p>
              <p>🔢 {texts?.invoices?.quantity || "Adet"}: {item.quantity}</p>
              <p>💰 {texts?.invoices?.price || "Fiyat"}: €{item.unitPrice.toFixed(2)}</p>
            </Item>
          ))
        ) : (
          <p>⚠️ {texts?.invoices?.noProducts || "Bu faturada ürün bulunmamaktadır."}</p>
        )}
      </ItemList>

      {/* ✅ PDF İNDİRME BUTONU */}
      <ActionButton theme={theme} onClick={handlePDFDownload}>
        📄 {texts?.invoices?.downloadPDF || "PDF İndir"}
      </ActionButton>
    </InvoiceDetailsContainer>
  );
};

export default InvoiceDetails;
