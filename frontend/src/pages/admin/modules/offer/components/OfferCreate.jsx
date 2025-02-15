import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOffer, updateOffer } from "@/features/offer/offerSlice";
import { fetchProducts } from "@/features/products/productSlice";
import { fetchCustomers } from "@/features/customer/customerSlice";
import { v4 as uuidv4 } from "uuid";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import {
  OfferFormContainer,
  FormInput,
  ActionButton,
  TotalSection,
  OfferHeader,
  OfferDetailsContainer,
  ProductLabel,
  ProductSelect,
  ProductOption,
} from "../styles/offerStyles";

const OfferCreate = ({ existingOffer, onOfferCreated }) => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  // 📌 Redux Store'dan verileri güvenli bir şekilde al
  const products = useSelector((state) => state.product.products) || [];
  const customers = useSelector((state) => state.customer.customers) || [];

  // 📌 Yükleme durumlarını kontrol et
  const productStatus = useSelector((state) => state.product.status);
  const customerStatus = useSelector((state) => state.customer.status);

  const isLoading =
    productStatus === "loading" ||
    customerStatus === "loading";

  // 📌 Form verileri
  const [formData, setFormData] = useState({
    offerNumber: `OFR-${Math.floor(1000 + Math.random() * 9000)}`,
    offerDate: new Date().toISOString().split("T")[0],
    companyName: "", // ✅ Firma ismini müşteri listesinden alacağız
    customerId: "",
    selectedProducts: [],
    shippingCost: 0,
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
    if (existingOffer) {
      setFormData(existingOffer);
    }
  }, [dispatch, existingOffer]);

  console.log("📡 Redux'tan Gelen Müşteri Listesi:", customers);

  // 📌 Benzersiz firma isimlerini bul (Müşterilerden al)
  const uniqueCompanies = [...new Set(customers.map(customer => customer.companyName))];

  // 📌 Firma seçildiğinde ilgili müşteri listesini filtrele
  const filteredCustomers = customers.filter(
    (customer) => customer.companyName === formData.companyName
  );

  // 📌 Firma veya müşteri seçildiğinde bilgileri güncelle
  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    if (name === "companyName") {
      setFormData({ ...formData, companyName: value, customerId: "" });
    } else if (name === "customerId") {
      setFormData({ ...formData, customerId: value });
    }
  };

  if (isLoading) return <p>⏳ Veriler yükleniyor...</p>;

  return (
    <OfferFormContainer theme={theme}>
      <OfferHeader>
        {existingOffer ? "✏️ Teklif Düzenle" : "➕ Yeni Teklif Oluştur"}
      </OfferHeader>

      <OfferDetailsContainer>
        <label>📄 {texts?.offers?.offerNumber || "Teklif Numarası"}:</label>
        <FormInput type="text" name="offerNumber" value={formData.offerNumber} readOnly />

        <label>📅 {texts?.offers?.offerDate || "Teklif Tarihi"}:</label>
        <FormInput type="date" name="offerDate" value={formData.offerDate} readOnly />

        {/* 📌 Firma Seçimi */}
        <label>🏢 {texts?.offers?.companyName || "Firma Adı"}:</label>
        <ProductSelect name="companyName" value={formData.companyName} onChange={handleSelectionChange}>
          <ProductOption value="">{texts?.offers?.chooseCompany || "Firma Seçin"}</ProductOption>
          {uniqueCompanies.map((companyName, index) => (
            <ProductOption key={index} value={companyName}>
              {companyName}
            </ProductOption>
          ))}
        </ProductSelect>

        {/* 📌 Müşteri Seçimi */}
        <label>👤 {texts?.offers?.customerName || "Müşteri Adı"}:</label>
        <ProductSelect name="customerId" value={formData.customerId} onChange={handleSelectionChange} disabled={!formData.companyName}>
          <ProductOption value="">{texts?.offers?.chooseCustomer || "Müşteri Seçin"}</ProductOption>
          {filteredCustomers.map((customer) => (
            <ProductOption key={customer.id} value={customer.id}>
              {customer.contactPerson}
            </ProductOption>
          ))}
        </ProductSelect>
      </OfferDetailsContainer>

      {/* 📌 Toplamlar ve Kaydet Butonu */}
      <TotalSection>
        <h3>🔢 {texts?.offers?.grandTotal || "Genel Toplam"}: 0.00 ₺</h3>
      </TotalSection>

      <ActionButton onClick={() => console.log("Kaydet butonu çalışıyor!")}>
        {existingOffer ? "💾 Güncelle" : "💾 Kaydet"}
      </ActionButton>
    </OfferFormContainer>
  );
};

export default OfferCreate;
