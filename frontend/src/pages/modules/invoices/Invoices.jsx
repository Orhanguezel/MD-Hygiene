import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "@/features/invoices/invoicesSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";

import {
  InvoicesContainer,
  InvoicesTable,
  Th,
  Td,
  ActionButton,
} from "./styles/invoicesStyles";

const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const invoices = useSelector((state) => state.invoices.invoices) || [];
  const status = useSelector((state) => state.invoices.status);
  const error = useSelector((state) => state.invoices.error);

  const [localInvoices, setLocalInvoices] = useState([]); // ✅ Lokal state tanımlandı

  // ✅ Faturaları bileşen yüklendiğinde getir ve state'i güncelle
  useEffect(() => {
    dispatch(fetchInvoices())
      .unwrap()
      .then((data) => {
        setLocalInvoices(data);
        toast.success(texts?.invoices?.loaded || "✅ Faturalar başarıyla yüklendi!", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error(texts?.invoices?.error || "🚨 Faturalar yüklenirken hata oluştu!", {
          position: "top-center",
          autoClose: 4000,
        });
        console.error("🚨 API Hatası:", err);
      });
  }, [dispatch, texts]);

  if (status === "loading") return <p>📄 {texts?.invoices?.loading || "Faturalar yükleniyor..."}</p>;
  if (status === "failed") return <p>🚨 {texts?.invoices?.error || "Hata oluştu!"} - {error}</p>;

  return (
    <InvoicesContainer theme={theme}>
      <h1>{texts?.invoices?.title || "📑 Fatura Listesi"}</h1>
      <InvoicesTable>
        <thead>
          <tr>
            <Th>{texts?.invoices?.invoiceNumber || "Fatura No"}</Th>
            <Th>{texts?.invoices?.customer || "Müşteri"}</Th>
            <Th>{texts?.invoices?.company || "Şirket"}</Th>
            <Th>{texts?.invoices?.date || "Tarih"}</Th>
            <Th>{texts?.invoices?.totalAmount || "Toplam Tutar"}</Th>
            <Th>{texts?.invoices?.actions || "İşlemler"}</Th>
          </tr>
        </thead>
        <tbody>
          {localInvoices.length > 0 ? (
            localInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <Td>{invoice.invoiceNumber}</Td>
                <Td>{invoice.customer?.companyName || texts?.invoices?.unknownCustomer || "Bilinmiyor"}</Td>
                <Td>{invoice.company?.companyName || texts?.invoices?.unknownCompany || "Bilinmiyor"}</Td>
                <Td>{new Date(invoice.issuedAt).toLocaleDateString()}</Td>
                <Td>{invoice.totalAmount.toFixed(2)} €</Td>
                <Td>
                  <ActionButton theme={theme} onClick={() => navigate(`/invoices/${invoice._id}`)}>
                    📜 {texts?.invoices?.details || "Detaylar"}
                  </ActionButton>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="6">{texts?.invoices?.noInvoices || "Henüz fatura yok."}</Td>
            </tr>
          )}
        </tbody>
      </InvoicesTable>
    </InvoicesContainer>
  );
};

export default Invoices;
