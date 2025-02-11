import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOffers } from "@/features/offer/useOffers";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OfferPDF from "./OfferPDF";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil desteği eklendi
import { useTheme } from "@/features/theme/useTheme";         // ✅ Tema desteği eklendi

import {
  OfferFormContainer,
  FormInput,
  ProductTable,
  ActionButton,
  TotalSection,
  TaxSelect,
} from "../styles/offerStyles";

const OfferDetailForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { offers, updateOffer, updateStatus } = useOffers();
  const [formData, setFormData] = useState(null);
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  useEffect(() => {
    const offer = offers.find((o) => o.id === id);
    if (offer) {
      setFormData(offer);
    }
  }, [id, offers]);

  if (!formData) return <p>{texts?.offers?.notFound || "Teklif bulunamadı!"}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (id, field, value) => {
    const updatedProducts = formData.selectedProducts.map((product) =>
      product.id === id ? { ...product, [field]: Number(value) } : product
    );
    setFormData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  const calculateTotals = () => {
    const netTotal = formData.selectedProducts.reduce(
      (acc, item) => acc + item.customPrice * item.quantity,
      0
    );
    const taxTotal = formData.selectedProducts.reduce(
      (acc, item) => acc + item.customPrice * item.quantity * (item.taxRate / 100),
      0
    );
    const grandTotal = netTotal + taxTotal + Number(formData.shippingCost);

    return { netTotal, taxTotal, grandTotal };
  };

  const totals = calculateTotals();

  const handleSave = () => {
    updateOffer(formData);
    localStorage.setItem("offers", JSON.stringify(offers));
    alert(texts?.offers?.updateSuccess || "Teklif başarıyla güncellendi!");
  };

  const handleApprove = () => {
    updateStatus(formData.id, "approved");
    alert(texts?.offers?.approved || "Teklif onaylandı!");
  };

  const handleReject = () => {
    updateStatus(formData.id, "rejected");
    alert(texts?.offers?.rejected || "Teklif reddedildi!");
    navigate("/offers");
  };

  const handleArchive = () => {
    updateStatus(formData.id, "archived");
    alert(texts?.offers?.archived || "Teklif arşivlendi!");
    navigate("/offers");
  };

  return (
    <OfferFormContainer style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>{texts?.offers?.detailsTitle || "📋 Teklif Detayları"}</h2>

      <label>{texts?.offers?.companyName || "🏢 Firma Adı"}:</label>
      <FormInput
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleInputChange}
      />

      <label>{texts?.offers?.customerName || "👤 Müşteri Adı"}:</label>
      <FormInput
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={handleInputChange}
      />

      <ProductTable>
        <thead>
          <tr>
            <th>{texts?.offers?.productName || "Ürün Adı"}</th>
            <th>{texts?.offers?.unitPrice || "Birim Fiyat (₺)"}</th>
            <th>{texts?.offers?.quantity || "Adet"}</th>
            <th>{texts?.offers?.taxRate || "KDV (%)"}</th>
            <th>{texts?.offers?.total || "Toplam (₺)"}</th>
          </tr>
        </thead>
        <tbody>
          {formData.selectedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <FormInput
                  type="number"
                  value={product.customPrice}
                  onChange={(e) => handleProductChange(product.id, "customPrice", e.target.value)}
                />
              </td>
              <td>
                <FormInput
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(product.id, "quantity", e.target.value)}
                />
              </td>
              <td>
                <TaxSelect
                  value={product.taxRate}
                  onChange={(e) => handleProductChange(product.id, "taxRate", e.target.value)}
                >
                  <option value="19">%19</option>
                  <option value="7">%7</option>
                </TaxSelect>
              </td>
              <td>{(product.customPrice * product.quantity).toFixed(2)} ₺</td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <TotalSection>
        <p>💰 {texts?.offers?.netTotal || "Net Tutar"}: <strong>{totals.netTotal.toFixed(2)} ₺</strong></p>
        <p>💸 {texts?.offers?.taxTotal || "KDV Tutarı"}: <strong>{totals.taxTotal.toFixed(2)} ₺</strong></p>
        <p>🚚 {texts?.offers?.shippingCost || "Nakliye Ücreti"}: <strong>{formData.shippingCost} ₺</strong></p>
        <hr />
        <h3>🔢 {texts?.offers?.grandTotal || "Genel Toplam"}: {totals.grandTotal.toFixed(2)} ₺</h3>
      </TotalSection>

      <ActionButton onClick={handleSave}>{texts?.offers?.update || "💾 Güncelle ve Kaydet"}</ActionButton>
      <ActionButton onClick={handleApprove} style={{ backgroundColor: "green" }}>
        ✅ {texts?.offers?.approve || "Onayla"}
      </ActionButton>
      <ActionButton onClick={handleReject} style={{ backgroundColor: "red" }}>
        ❌ {texts?.offers?.reject || "Reddet"}
      </ActionButton>
      <ActionButton onClick={handleArchive} style={{ backgroundColor: "gray" }}>
        📦 {texts?.offers?.archive || "Arşivle"}
      </ActionButton>

      {formData.status === "approved" && (
        <PDFDownloadLink
          document={<OfferPDF offer={formData} />}
          fileName={`teklif-${formData.id}.pdf`}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          📄 {texts?.offers?.generatePDF || "PDF Oluştur"}
        </PDFDownloadLink>
      )}
    </OfferFormContainer>
  );
};

export default OfferDetailForm; 
