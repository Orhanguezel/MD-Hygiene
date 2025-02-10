import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOffers } from "@/features/offers/useOffers"; // RTK'dan verileri alıyoruz
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

  // ✅ Redux Toolkit'ten gelen veriyi çekiyoruz
  useEffect(() => {
    const offer = offers.find((o) => o.id === id);
    if (offer) {
      setFormData(offer);
    }
  }, [id, offers]);

  if (!formData) return <p>Teklif bulunamadı!</p>;

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
    localStorage.setItem("offers", JSON.stringify(offers)); // ✅ localStorage'a kaydediyoruz
    alert("Teklif başarıyla güncellendi!");
    navigate("/offers"); // ✅ Onay sonrası listeye dön
  };

  const handleApprove = () => {
    updateStatus(formData.id, "approved");
    alert("Teklif onaylandı!");
    navigate("/offers"); // ✅ Onay sonrası listeye dön
  };

  const handleReject = () => {
    updateStatus(formData.id, "rejected");
    alert("Teklif reddedildi!");
    navigate("/offers"); // ✅ Reddetme sonrası listeye dön
  };

  return (
    <OfferFormContainer>
      <h2>📋 Teklif Detayları</h2>

      <label>🏢 Firma Adı:</label>
      <FormInput
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleInputChange}
      />

      <label>👤 Müşteri Adı:</label>
      <FormInput
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={handleInputChange}
      />

      <ProductTable>
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
          {formData.selectedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <FormInput
                  type="number"
                  value={product.customPrice}
                  onChange={(e) =>
                    handleProductChange(product.id, "customPrice", e.target.value)
                  }
                />
              </td>
              <td>
                <FormInput
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(product.id, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <TaxSelect
                  value={product.taxRate}
                  onChange={(e) =>
                    handleProductChange(product.id, "taxRate", e.target.value)
                  }
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
        <p>💰 Net Tutar: <strong>{totals.netTotal.toFixed(2)} ₺</strong></p>
        <p>💸 KDV Tutarı: <strong>{totals.taxTotal.toFixed(2)} ₺</strong></p>
        <p>🚚 Nakliye Ücreti: <strong>{formData.shippingCost} ₺</strong></p>
        <hr />
        <h3>🔢 Genel Toplam: {totals.grandTotal.toFixed(2)} ₺</h3>
      </TotalSection>

      <ActionButton onClick={handleSave}>💾 Güncelle ve Kaydet</ActionButton>
      <ActionButton onClick={handleApprove} style={{ backgroundColor: "green" }}>
        ✅ Onayla
      </ActionButton>
      <ActionButton onClick={handleReject} style={{ backgroundColor: "red" }}>
        ❌ Reddet
      </ActionButton>
    </OfferFormContainer>
  );
};

export default OfferDetailForm;
