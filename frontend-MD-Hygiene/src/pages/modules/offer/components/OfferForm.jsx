import { useState } from "react";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import ProductSelector from "./ProductSelector"; // ✅ Ürün Seçici
import {
  OfferFormContainer,
  FormInput,
  ProductList,
  ProductItem,
  SubmitButton,
} from "../styles/offerStyles";  // ✅ Stil dosyası

const OfferForm = ({ onSubmit }) => {
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    companyName: "",
    products: [],
  });

  const handleAddProduct = (product) => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, { ...product, quantity: 1 }],
    }));
  };

  return (
    <OfferFormContainer theme={theme}>
      <h2>{texts?.offers?.createOffer || "Teklif Formu"}</h2>

      <FormInput
        theme={theme}
        type="text"
        name="companyName"
        placeholder={texts?.offers?.companyNamePlaceholder || "Firma Adı"}
        value={formData.companyName}
        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
      />

      <ProductSelector onAddProduct={handleAddProduct} />

      <h3>{texts?.offers?.selectedProducts || "Seçilen Ürünler"}</h3>
      <ProductList>
        {formData.products.map((item, index) => (
          <ProductItem key={index} theme={theme}>
            <p>{item.name} - {item.price} €</p>
            <FormInput
              theme={theme}
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const updatedProducts = [...formData.products];
                updatedProducts[index].quantity = parseInt(e.target.value);
                setFormData({ ...formData, products: updatedProducts });
              }}
            />
          </ProductItem>
        ))}
      </ProductList>

      <SubmitButton theme={theme} onClick={() => onSubmit(formData)}>
        📤 {texts?.offers?.submit || "Teklif Oluştur"}
      </SubmitButton>
    </OfferFormContainer>
  );
};

export default OfferForm;
