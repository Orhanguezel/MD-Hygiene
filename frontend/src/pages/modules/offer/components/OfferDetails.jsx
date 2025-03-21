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
  const { texts } = useLanguage(); // 🌍 Dil desteği aktif
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

  if (status === "loading") return <p>⏳ {texts?.loading}</p>;
  if (!offerData) return <p>❌ {texts?.errors?.notFound}</p>;

  // 📌 Müşteri Bilgilerini Redux Store'dan Al
  const customer = customers.find((c) => c._id === offerData.customer?._id) || {};

  // 📌 Ürün Güncelleme (KDV Seçilebilir)
  const handleProductUpdate = (id, field, value) => {
    let sanitizedValue = value.replace(/^0+/, ""); // Başındaki sıfırları kaldır
    sanitizedValue = sanitizedValue === "" ? "0" : sanitizedValue; // Boş girişleri sıfır olarak ayarla

    const updatedProducts = offerData.items.map((product) =>
      product._id === id ? { ...product, [field]: Number(sanitizedValue) } : product
    );

    setOfferData((prev) => ({ ...prev, items: updatedProducts }));
  };

  // 📌 Kargo Ücretini Güncelleme
  const handleShippingCostChange = (e) => {
    let value = e.target.value.replace(/^0+/, "");
    value = value === "" ? "0" : value;
    setOfferData((prev) => ({ ...prev, shippingCost: Number(value) }));
  };

  // 📌 Tutarları Hesapla
  const calculateTotals = () => {
    if (!offerData.items) return { netTotal: 0, taxTotal: 0, grandTotal: 0 };

    const netTotal = offerData.items.reduce(
      (acc, item) => acc + (item.customPrice || 0) * (item.quantity || 1),
      0
    );

    const taxTotal = offerData.items.reduce(
      (acc, item) =>
        acc + (item.customPrice || 0) * (item.quantity || 1) * ((item.taxRate || 19) / 100),
      0
    );

    const grandTotal = netTotal + taxTotal + Number(offerData.shippingCost || 0);

    return { netTotal, taxTotal, grandTotal };
  };

  const totals = calculateTotals();

  // 📌 Teklif Güncelleme Fonksiyonu
  const handleSave = () => {
    const updatedOffer = { ...offerData, totalAmount: totals.grandTotal.toFixed(2) };
    dispatch(updateOffer(updatedOffer))
      .unwrap()
      .then(() => toast.success(texts?.notifications?.offerUpdated))
      .catch(() => toast.error(texts?.notifications?.updateFailed));
  };

  return (
    <OfferDetailsContainer theme={theme}>
      <h2>📄 {texts?.offerDetails?.title}</h2>

      {/* 🏢 Şirket Bilgileri */}
      <h3>🏢 {texts?.offerDetails?.companyInfo}</h3>
      <p><strong>{company?.companyName || texts?.errors?.missingInfo}</strong></p>
      <p>{company?.email || texts?.errors?.missingInfo}</p>
      <p>📍 {texts?.offerDetails?.address}: {company?.address?.street}, {company?.address?.city}, {company?.address?.postalCode}, {company?.address?.country}</p>
      <p>📌 {texts?.offerDetails?.taxNumber}: {company?.taxNumber || texts?.errors?.missingInfo}</p>
      <p>🏦 IBAN: {company?.bankDetails?.iban || texts?.errors?.missingInfo}</p>
      <p>🏦 BIC: {company?.bankDetails?.bic || texts?.errors?.missingInfo}</p>

      {/* 👤 Müşteri Bilgileri */}
      <h3>👤 {texts?.offerDetails?.customerInfo}</h3>
      <p><strong>{texts?.offerDetails?.customerName}:</strong> {customer?.contactName || texts?.errors?.missingInfo}</p>
      <p><strong>{texts?.offerDetails?.companyName}:</strong> {customer?.companyName || texts?.errors?.missingInfo}</p>
      <p><strong>📍 {texts?.offerDetails?.address}:</strong> 
        {customer?.address?.street || texts?.errors?.missingInfo}, 
        {customer?.address?.city || texts?.errors?.missingInfo}, 
        {customer?.address?.postalCode || texts?.errors?.missingInfo}, 
        {customer?.address?.country || texts?.errors?.missingInfo}
      </p>
      <p><strong>📞 {texts?.offerDetails?.phone}:</strong> {customer?.phone || texts?.errors?.missingInfo}</p>

      {/* 📦 Ürün Listesi */}
      <ProductTable theme={theme}>
        <thead>
          <tr>
            <th>{texts?.offerDetails?.product}</th>
            <th>{texts?.offerDetails?.unitPrice}</th>
            <th>{texts?.offerDetails?.quantity}</th>
            <th>{texts?.offerDetails?.tax}</th>
            <th>{texts?.offerDetails?.total}</th>
          </tr>
        </thead>
        <tbody>
          {offerData.items.map((product) => (
            <tr key={product._id}>
              <td>{product.title || texts?.errors?.missingInfo}</td>
              <td>
                <FormInput
                  type="number"
                  value={product.customPrice || 0}
                  onChange={(e) => handleProductUpdate(product._id, "customPrice", e.target.value)}
                />
              </td>
              <td>
                <FormInput
                  type="number"
                  value={product.quantity || 1}
                  onChange={(e) => handleProductUpdate(product._id, "quantity", e.target.value)}
                />
              </td>
              <td>
                <TaxSelect
                  value={product.taxRate || 19}
                  onChange={(e) => handleProductUpdate(product._id, "taxRate", e.target.value)}
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

      {/* 💰 Toplamlar */}
      <SummaryBox theme={theme}>
        <h3>🚚 {texts?.offerDetails?.shippingCost}: 
          <FormInput type="number" value={offerData.shippingCost || 0} onChange={handleShippingCostChange} />
        </h3>
        <h3>💰 {texts?.offerDetails?.netTotal}: {totals.netTotal.toFixed(2)} ₺</h3>
        <h3>💸 {texts?.offerDetails?.taxTotal}: {totals.taxTotal.toFixed(2)} ₺</h3>
        <h2>🔢 {texts?.offerDetails?.grandTotal}: {totals.grandTotal.toFixed(2)} ₺</h2>
      </SummaryBox>

      <ActionButton onClick={handleSave}>💾 {texts?.buttons?.save}</ActionButton>
      <ActionButton onClick={() => generateOfferPDF(offerData, company, customers)}>📄 {texts?.buttons?.downloadPDF}</ActionButton>
    </OfferDetailsContainer>
  );
};

export default OfferDetail;
