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
  const { selectedInvoice, selectedUser, status, error } = useSelector((state) => state.invoices);
  const { texts } = useLanguage();
  const { theme } = useTheme();

 


  useEffect(() => {
    dispatch(fetchInvoiceById(id)); // ✅ Faturayı ve kullanıcı bilgilerini çek
  }, [dispatch, id]);

  if (status === "loading") return <p>📦 {texts?.invoices?.loading || "Fatura yükleniyor..."}</p>;
  if (!selectedInvoice || !selectedUser) return <p>❌ {texts?.invoices?.notFound || "Fatura bulunamadı!"}</p>;

  const handlePDFDownload = () => {
    try {
      generateInvoicePDF(selectedInvoice, selectedUser);
      toast.success("📄 PDF başarıyla indirildi!");
    } catch (error) {
      toast.error("❌ PDF oluşturulurken hata oluştu!");
    }
  };
  

  return (
    <InvoiceDetailsContainer theme={theme}>
      <h1>🧾 {texts?.invoices?.details || "Fatura Detayları"}</h1>
      <InvoiceInfo theme={theme}>
        <p><strong>Fatura No:</strong> {selectedInvoice.invoiceNumber}</p>
        <p><strong>Müşteri:</strong> {selectedInvoice.userName || "Bilinmiyor"}</p>
        <p><strong>Tarih:</strong> {new Date(selectedInvoice.issuedAt).toLocaleDateString()}</p>
        <p><strong>Toplam:</strong> €{selectedInvoice.totalAmount.toFixed(2)}</p>
      </InvoiceInfo>

      <h2>🛍 {texts?.invoices?.products || "Ürünler"}</h2>
      <ItemList theme={theme}>
        {selectedInvoice.items.length > 0 ? (
          selectedInvoice.items.map((item, index) => (
            <Item key={index} theme={theme}>
              <p>📦 {item.product}</p>
              <p>🔢 {texts?.invoices?.quantity || "Adet"}: {item.quantity}</p>
              <p>💰 {texts?.invoices?.price || "Fiyat"}: €{item.unitPrice.toFixed(2)}
                
              </p>
            </Item>
          ))
        ) : (
          <p>⚠️ {texts?.invoices?.noProducts || "Bu faturada ürün bulunmamaktadır."}</p>
        )}
      </ItemList>

      {/* ✅ PDF İNDİRME BUTONU */}
      <ActionButton
        theme={theme}
        onClick={handlePDFDownload}
      >
        📄 {texts?.invoices?.downloadPDF || "PDF İndir"}
      </ActionButton>
    </InvoiceDetailsContainer>
  );
};

export default InvoiceDetails;
