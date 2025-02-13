// ✅ src/features/offer/components/OfferCreate.jsx
import { useState, useEffect } from "react";
//import { useProducts } from "@/features/products/useProducts";
import { useOffers } from "@/features/offer/useOffers";
import { v4 as uuidv4 } from "uuid";
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

const OfferCreate = ({ existingOffer, onOfferCreated }) => {
  //const { products } = useProducts();
  const { addOffer, updateOffer } = useOffers();
  const { texts } = useLanguage(); // ✅ Dil kullanımı
  const { theme } = useTheme();    // ✅ Tema kullanımı

  const [formData, setFormData] = useState({
    companyName: "",
    customerName: "",
    selectedProducts: [],
    shippingCost: 0,
  });

  useEffect(() => {
    if (existingOffer) {
      setFormData(existingOffer);
    }
  }, [existingOffer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId) => {
    const selectedProduct = products.find((p) => p.id === productId);
    if (selectedProduct && !formData.selectedProducts.some((p) => p.id === selectedProduct.id)) {
      setFormData((prev) => ({
        ...prev,
        selectedProducts: [
          ...prev.selectedProducts,
          {
            ...selectedProduct,
            quantity: 1,
            customPrice: selectedProduct.price,
            taxRate: 19,
          },
        ],
      }));
    }
  };

  const handleProductChange = (id, field, value) => {
    const updatedProducts = formData.selectedProducts.map((product) =>
      product.id === id ? { ...product, [field]: Number(value) } : product
    );
    setFormData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = formData.selectedProducts.filter((p) => p.id !== id);
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

  const handleSubmit = () => {
    if (!formData.companyName || !formData.customerName || formData.selectedProducts.length === 0) {
      alert(texts?.offers?.validationError || "Lütfen tüm zorunlu alanları doldurun ve en az bir ürün seçin.");
      return;
    }

    if (existingOffer) {
      updateOffer(formData);
      alert(texts?.offers?.updateSuccess || "Teklif Güncellendi!");
    } else {
      const newOffer = { ...formData, id: uuidv4() };
      addOffer(newOffer);
      alert(texts?.offers?.saveSuccess || "Teklif Kaydedildi!");
    }

    if (onOfferCreated) onOfferCreated();
  };

  return (
    <OfferFormContainer theme={theme} style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <h2>{existingOffer ? texts?.offers?.edit || "✏️ Teklif Düzenle" : texts?.offers?.create || "➕ Yeni Teklif Oluştur"}</h2>

      <label>{texts?.offers?.companyName || "🏢 Firma Adı"}:</label>
      <FormInput
        theme={theme}
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleInputChange}
        required
      />

      <label>{texts?.offers?.customerName || "👤 Müşteri Adı"}:</label>
      <FormInput
        theme={theme}
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={handleInputChange}
        required
      />

      <label>{texts?.offers?.selectProduct || "📦 Ürün Seç"}:</label>
      <select id="product-select">
        <option value="">{texts?.offers?.chooseProduct || "Ürün Seçin"}</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - {product.price} ₺
          </option>
        ))}
      </select>
      <ActionButton onClick={() => handleProductSelect(document.getElementById("product-select").value)}>
        ✅ {texts?.offers?.select || "Seç"}
      </ActionButton>

      {formData.selectedProducts.length > 0 && (
        <ProductTable theme={theme}>
          <thead>
            <tr>
              <th>{texts?.offers?.productName || "Ürün Adı"}</th>
              <th>{texts?.offers?.unitPrice || "Birim Fiyat (₺)"}</th>
              <th>{texts?.offers?.quantity || "Adet"}</th>
              <th>{texts?.offers?.taxRate || "KDV (%)"}</th>
              <th>{texts?.offers?.total || "Toplam (₺)"}</th>
              <th>{texts?.offers?.action || "İşlem"}</th>
            </tr>
          </thead>
          <tbody>
            {formData.selectedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <FormInput
                    theme={theme}
                    type="number"
                    value={product.customPrice}
                    onChange={(e) => handleProductChange(product.id, "customPrice", e.target.value)}
                  />
                </td>
                <td>
                  <FormInput
                    theme={theme}
                    type="number"
                    value={product.quantity}
                    min="1"
                    onChange={(e) => handleProductChange(product.id, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <TaxSelect
                    theme={theme}
                    value={product.taxRate}
                    onChange={(e) => handleProductChange(product.id, "taxRate", e.target.value)}
                  >
                    <option value="19">%19</option>
                    <option value="7">%7</option>
                  </TaxSelect>
                </td>
                <td>{(product.customPrice * product.quantity).toFixed(2)} ₺</td>
                <td>
                  <ActionButton onClick={() => handleRemoveProduct(product.id)}>❌</ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      )}

      <label>{texts?.offers?.shippingCost || "🚚 Nakliye Ücreti (₺)"}:</label>
      <FormInput
        theme={theme}
        type="number"
        name="shippingCost"
        value={formData.shippingCost}
        onChange={handleInputChange}
      />

      <TotalSection theme={theme}>
        <p>💰 {texts?.offers?.netTotal || "Net Tutar"}: <strong>{totals.netTotal.toFixed(2)} ₺</strong></p>
        <p>💸 {texts?.offers?.taxTotal || "KDV Tutarı"}: <strong>{totals.taxTotal.toFixed(2)} ₺</strong></p>
        <p>🚚 {texts?.offers?.shippingCost || "Nakliye Ücreti"}: <strong>{formData.shippingCost} ₺</strong></p>
        <hr />
        <h3>🔢 {texts?.offers?.grandTotal || "Genel Toplam"}: {totals.grandTotal.toFixed(2)} ₺</h3>
      </TotalSection>

      <ActionButton onClick={handleSubmit}>
        {existingOffer ? texts?.offers?.update || "💾 Güncelle" : texts?.offers?.save || "💾 Kaydet"}
      </ActionButton>
    </OfferFormContainer>
  );
};

export default OfferCreate; 
