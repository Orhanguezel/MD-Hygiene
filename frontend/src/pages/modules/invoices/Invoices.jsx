import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "@/features/invoices/invoicesSlice";
import { useNavigate } from "react-router-dom";
import {
  InvoicesContainer,
  InvoicesTable,
  Th,
  Td,
  ActionButton,
} from "./styles/invoicesStyles";
import { toast } from "react-toastify";

const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const invoices = useSelector((state) => state.invoices.invoices) || [];
  const status = useSelector((state) => state.invoices.status);
  const error = useSelector((state) => state.invoices.error);

  const [localInvoices, setLocalInvoices] = useState([]); // ✅ Lokal state tanımlandı

  // ✅ Faturaları sadece bileşen mount edildiğinde getir
  useEffect(() => {
    dispatch(fetchInvoices()).then((response) => {
      if (response.payload) {
        setLocalInvoices(response.payload); // ✅ useEffect içinde state güncellemesi yapıldı
      }
    });
  }, [dispatch]);

  if (status === "loading") return <p>📄 Faturalar yükleniyor...</p>;
  if (status === "failed") return <p>🚨 Hata: {error}</p>;

  return (
    <InvoicesContainer>
      <h1>📑 Fatura Listesi</h1>
      <InvoicesTable>
        <thead>
          <tr>
            <Th>Fatura No</Th>
            <Th>Müşteri</Th>
            <Th>Tarih</Th>
            <Th>Toplam Tutar</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>
          {localInvoices.length > 0 ? (
            localInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <Td>{invoice.invoiceNumber}</Td>
                <Td>{invoice.user?.name || "Bilinmiyor"}</Td>
                <Td>{new Date(invoice.issuedAt).toLocaleDateString()}</Td>
                <Td>{invoice.totalAmount.toFixed(2)} €</Td>
                <Td>
                  <ActionButton onClick={() => navigate(`/invoices/${invoice._id}`)}>
                    📜 Detaylar
                  </ActionButton>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="5">Henüz fatura yok.</Td>
            </tr>
          )}
        </tbody>
      </InvoicesTable>
    </InvoicesContainer>
  );
};

export default Invoices;
