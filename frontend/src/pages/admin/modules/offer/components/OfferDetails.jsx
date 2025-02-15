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
  TotalSection,
  TaxSelect,
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
    dispatch(fetchCompanyInfo()); // ✅ Şirket bilgilerini getir
    dispatch(fetchCustomers()); // ✅ Müşteri bilgilerini getir
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedOffer) {
      setOfferData({ ...selectedOffer });
    }
  }, [selectedOffer]);

  if (status === "loading") return <p>⏳ {texts?.offers?.loading || "Teklif yükleniyor..."}</p>;
  if (!offerData) return <p>❌ {texts?.offers?.notFound || "Teklif bulunamadı."}</p>;

  // 📌 Müşteriyi ID'ye Göre Bul
  const customer = customers.find((c) => c.id === offerData.customerId) || {};

  // 📌 Açıklama Güncelleme (Silmeden Değiştirme)
  const handleDescriptionChange = (id, value) => {
    const updatedProducts = offerData.selectedProducts.map((product) =>
      product.id === id ? { ...product, description: value } : product
    );
    setOfferData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  // 📌 Ürün bilgilerini güncelle
  const handleProductChange = (id, field, value) => {
    const updatedProducts = offerData.selectedProducts.map((product) =>
      product.id === id ? { ...product, [field]: Number(value) } : product
    );
    setOfferData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  // 📌 Tutarları Hesapla ve JSON'a ekle
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

  // 📌 Teklif Güncelle
  const handleSave = () => {
    const updatedOffer = { ...offerData, grandTotal: totals.grandTotal.toFixed(2) };
    dispatch(updateOffer(updatedOffer))
      .unwrap()
      .then(() => {
        toast.success("✅ Teklif başarıyla güncellendi!");
      })
      .catch((error) => {
        toast.error("❌ Teklif güncellenemedi!");
      });
  };

  return (
    <OfferDetailsContainer theme={theme}>
      <h2>{texts?.offers?.details || "📄 Teklif Detayları"}</h2>

      {/* 🏢 Firma Bilgileri */}
      <h3>{texts?.offers?.companyInfo || "🏢 Firma Bilgileri"}</h3>
      <p>{company?.name || "Firma adı eksik"}</p>
      <p>{company?.address || "Adres bilgisi eksik"}</p>
      <p>{company?.email || "E-posta eksik"}</p>

      {/* 👤 Müşteri Bilgileri */}
      <h3>{texts?.offers?.customerInfo || "👤 Müşteri Bilgileri"}</h3>
      <p><strong>{texts?.offers?.customerName}:</strong> {customer?.name || "Bilinmiyor"}</p>
      <p><strong>{texts?.offers?.address}:</strong> {customer?.address || "Adres bilinmiyor"}</p>
      <p><strong>{texts?.offers?.phone}:</strong> {customer?.phone || "Telefon bilinmiyor"}</p>

      {/* 📦 Ürün Listesi */}
      <ProductTable theme={theme}>
        <thead>
          <tr>
            <th>{texts?.offers?.productName}</th>
            <th>{texts?.offers?.unitPrice}</th>
            <th>{texts?.offers?.quantity}</th>
            <th>{texts?.offers?.taxRate}</th>
            <th>{texts?.offers?.total}</th>
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

      <TotalSection theme={theme}>
        <h3>{texts?.offers?.grandTotal}: {totals.grandTotal.toFixed(2)} ₺</h3>
      </TotalSection>

      <ActionButton onClick={handleSave}>{texts?.offers?.save}</ActionButton>
      <ActionButton onClick={() => generateOfferPDF(offerData, texts)}>{texts?.offers?.downloadPDF}</ActionButton>
    </OfferDetailsContainer>
  );
};

export default OfferDetail;
