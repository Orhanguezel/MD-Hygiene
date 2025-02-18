import { useEffect, useState } from "react";
import generateOfferPDF from "./OfferPDFDocument";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOfferById, updateOffer } from "@/features/offer/offerSlice";
import { fetchCompanyInfo } from "@/features/company/companySlice";
import { fetchCustomers } from "@/features/customer/customerSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";

import {
  OfferDetailsContainer,
  FormInput,
  ProductTable,
  ActionButton,
  TaxSelect,
  SummaryBox,
} from "../styles/offerStyles";

const OfferDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOffer, status } = useSelector((state) => state.offer);
  const { company } = useSelector((state) => state.company);
  const { customers } = useSelector((state) => state.customer);
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const [offerData, setOfferData] = useState(null);

  useEffect(() => {
    dispatch(fetchOfferById(id));
    dispatch(fetchCompanyInfo()); 
    dispatch(fetchCustomers());
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedOffer) {
      setOfferData({ ...selectedOffer });
    }
  }, [selectedOffer]);

  if (status === "loading") return <p>⏳ Teklif yükleniyor...</p>;
  if (!offerData) return <p>❌ Teklif bulunamadı.</p>;

  // 📌 Müşteri Bilgilerini Redux Store'dan Al
  const customer = customers.find((c) => c.id === offerData.customerId) || {};

  // 📌 Ürün Bilgilerini Güncelleme
  const handleProductChange = (id, field, value) => {
    const updatedProducts = offerData.selectedProducts.map((product) =>
      product.id === id ? { ...product, [field]: Number(value) } : product
    );
    setOfferData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  // 📌 Nakliye Ücretini Güncelleme
  const handleShippingCostChange = (e) => {
    let value = e.target.value;
    setOfferData((prev) => ({
      ...prev,
      shippingCost: value === "" ? "" : Number(value),
    }));
  };

  // 📌 Tutarları Hesapla
  const calculateTotals = () => {
    if (!offerData.selectedProducts) return { netTotal: 0, taxTotal: 0, grandTotal: 0 };

    const netTotal = offerData.selectedProducts.reduce(
      (acc, item) => acc + (item.customPrice || 0) * (item.quantity || 1),
      0
    );

    const taxTotal = offerData.selectedProducts.reduce(
      (acc, item) => acc + (item.customPrice || 0) * (item.quantity || 1) * ((item.taxRate || 0) / 100),
      0
    );

    const grandTotal = netTotal + taxTotal + Number(offerData.shippingCost || 0);

    return { netTotal, taxTotal, grandTotal };
  };

  const totals = calculateTotals();

  // 📌 Teklif Güncelleme Fonksiyonu
  const handleSave = () => {
    const updatedOffer = { ...offerData, grandTotal: totals.grandTotal.toFixed(2) };
    dispatch(updateOffer(updatedOffer))
      .unwrap()
      .then(() => {
        toast.success("✅ Teklif başarıyla güncellendi!");
      })
      .catch(() => {
        toast.error("❌ Teklif güncellenemedi!");
      });
  };

  return (
    <OfferDetailsContainer theme={theme}>
      <h2>📄 Teklif Detayları</h2>

      {/* 🏢 Firma Bilgileri */}
      <h3>🏢 Firma Bilgileri</h3>
      <p><strong>{company?.name || "Firma adı eksik"}</strong></p>
      <p>{company?.address || "Adres bilgisi eksik"}</p>
      <p>{company?.email || "E-posta eksik"}</p>
      <p>📌 Vergi Numarası: {company?.taxNumber || "Eksik"}</p>
      <p>🏦 IBAN: {company?.bankIban || "Eksik"}</p>
      <p>🏦 BIC: {company?.bankBic || "Eksik"}</p>

      {/* 👤 Müşteri Bilgileri */}
      <h3>👤 Müşteri Bilgileri</h3>
      <p><strong>👤 Müşteri Adı:</strong> {customer?.contactPerson || "Bilinmiyor"}</p>
      <p><strong>🏢 Firma Adı:</strong> {customer?.companyName || "Firma bilgisi eksik"}</p>
      <p><strong>📍 Adres:</strong> {customer?.address || "Adres bilinmiyor"}</p>
      <p><strong>📞 Telefon:</strong> {customer?.phone || "Telefon bilinmiyor"}</p>

      {/* 📦 Ürün Listesi */}
      <ProductTable theme={theme}>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Birim Fiyat (₺)</th>
            <th>Adet</th>
            <th>KDV (%)</th>
            <th>Toplam (₺)</th>
          </tr>
        </thead>
        <tbody>
          {offerData.selectedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title || "Ürün adı eksik"}</td>
              <td>
                <FormInput
                  type="number"
                  value={product.customPrice || 0}
                  onChange={(e) =>
                    handleProductChange(product.id, "customPrice", e.target.value)
                  }
                />
              </td>
              <td>
                <FormInput
                  type="number"
                  value={product.quantity || 1}
                  onChange={(e) =>
                    handleProductChange(product.id, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <TaxSelect
                  value={product.taxRate || 0}
                  onChange={(e) =>
                    handleProductChange(product.id, "taxRate", e.target.value)
                  }
                >
                  <option value="19">%19</option>
                  <option value="7">%7</option>
                </TaxSelect>
              </td>
              <td>{((product.customPrice || 0) * (product.quantity || 1)).toFixed(2)} ₺</td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      {/* 💰 Toplamlar - İkonlarla Geri Eklendi */}
      <SummaryBox theme={theme}>
        <h3>💰 Net Tutar: {totals.netTotal.toFixed(2)} ₺</h3>
        <h3>💸 KDV: {totals.taxTotal.toFixed(2)} ₺</h3>
        <h3>🚚 Nakliye Ücreti: 
          <FormInput type="number" value={offerData.shippingCost || ""} onChange={handleShippingCostChange} />
        </h3>
        <h2>🔢 Genel Toplam: {totals.grandTotal.toFixed(2)} ₺</h2>
      </SummaryBox>

      <ActionButton onClick={handleSave}>💾 Kaydet</ActionButton>
      <ActionButton onClick={() => generateOfferPDF(offerData, company, customers)}>📄 PDF Olarak İndir</ActionButton>
    </OfferDetailsContainer>
  );
};

export default OfferDetail;
