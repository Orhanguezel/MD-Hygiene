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
  ProductTable,
  DeleteButton
} from "../styles/offerStyles";

const OfferCreate = ({ existingOffer, onOfferCreated }) => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  // 📌 Redux Store'dan verileri al
  const products = useSelector((state) => state.product.products) || [];
  const customers = useSelector((state) => state.customer.customers) || [];

  const isLoading =
    useSelector((state) => state.product.status) === "loading" ||
    useSelector((state) => state.customer.status) === "loading";

  // 📌 Form verileri
  const [formData, setFormData] = useState({
    offerNumber: `OFR-${Math.floor(1000 + Math.random() * 9000)}`,
    offerDate: new Date().toISOString().split("T")[0],
    companyName: "",
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

  // 📌 Firma seçildiğinde ilgili müşteri listesini filtrele
  const uniqueCompanies = [...new Set(customers.map(customer => customer.companyName))];

  const filteredCustomers = customers.filter(
    (customer) => customer.companyName === formData.companyName
  );

  // 📌 Firma veya müşteri seçildiğinde bilgileri güncelle
  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Ürün seçimi ve listeye ekleme
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
            taxRate: 19, // Varsayılan %19 KDV
          },
        ],
      }));
    }
  };

  // 📌 Ürün miktarı, fiyatı veya KDV oranını değiştirme
  const handleProductChange = (id, field, value) => {
    const updatedProducts = formData.selectedProducts.map((product) =>
      product.id === id ? { ...product, [field]: Number(value) } : product
    );
    setFormData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  // 📌 Ürün kaldırma
  const handleRemoveProduct = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((p) => p.id !== id),
    }));
  };

  // 📌 Tutarları hesaplama
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

  // 📌 Teklifi Kaydetme
  const handleSave = () => {
    if (!formData.companyName || !formData.customerId || formData.selectedProducts.length === 0) {
      toast.error("❌ Lütfen tüm alanları doldurun ve en az bir ürün ekleyin.");
      return;
    }

    if (existingOffer) {
      dispatch(updateOffer(formData))
        .unwrap()
        .then(() => toast.success("✅ Teklif Güncellendi!"))
        .catch(() => toast.error("❌ Güncelleme başarısız!"));
    } else {
      const newOffer = { ...formData, id: uuidv4(), status: "draft" };
      dispatch(addOffer(newOffer))
        .unwrap()
        .then(() => toast.success("✅ Teklif Kaydedildi!"))
        .catch(() => toast.error("❌ Kaydetme başarısız!"));
    }

    if (onOfferCreated) onOfferCreated();
  };

  if (isLoading) return <p>⏳ Veriler yükleniyor...</p>;

  return (
    <OfferFormContainer theme={theme}>
      <OfferHeader>
        {existingOffer ? "✏️ Teklif Düzenle" : "➕ Yeni Teklif Oluştur"}
      </OfferHeader>

      <OfferDetailsContainer>
        <label>📄 Teklif Numarası:</label>
        <FormInput type="text" name="offerNumber" value={formData.offerNumber} readOnly />

        <label>📅 Teklif Tarihi:</label>
        <FormInput type="date" name="offerDate" value={formData.offerDate} readOnly />

        {/* 📌 Firma Seçimi */}
        <label>🏢 Firma Adı:</label>
        <ProductSelect name="companyName" value={formData.companyName} onChange={handleSelectionChange}>
          <ProductOption value="">Firma Seçin</ProductOption>
          {uniqueCompanies.map((companyName, index) => (
            <ProductOption key={index} value={companyName}>
              {companyName}
            </ProductOption>
          ))}
        </ProductSelect>

        {/* 📌 Müşteri Seçimi */}
        <label>👤 Müşteri Adı:</label>
        <ProductSelect name="customerId" value={formData.customerId} onChange={handleSelectionChange} disabled={!formData.companyName}>
          <ProductOption value="">Müşteri Seçin</ProductOption>
          {filteredCustomers.map((customer) => (
            <ProductOption key={customer.id} value={customer.id}>
              {customer.contactPerson}
            </ProductOption>
          ))}
        </ProductSelect>

        {/* 📌 Ürün Seçme Alanı */}
        <label>📦 Ürün Seç:</label>
        <ProductSelect onChange={(e) => handleProductSelect(e.target.value)}>
          <ProductOption value="">Ürün Seçin</ProductOption>
          {products.map((product) => (
            <ProductOption key={product.id} value={product.id}>
              {product.title} - {product.price} ₺
            </ProductOption>
          ))}
        </ProductSelect>
      </OfferDetailsContainer>

      {/* 📌 Seçilen Ürünler Tablosu */}
      <ProductTable>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Fiyat</th>
            <th>Adet</th>
            <th>KDV</th>
            <th>Toplam</th>
            <th>Sil</th>
          </tr>
        </thead>
      </ProductTable>

      <ActionButton onClick={handleSave}>💾 Kaydet</ActionButton>
    </OfferFormContainer>
  );
};

export default OfferCreate;
