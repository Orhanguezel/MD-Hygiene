import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOffer, updateOffer } from "@/features/offer/offerSlice";
import { fetchProducts } from "@/features/products/productSlice";
import { fetchCustomers } from "@/features/customer/customerSlice";
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
  ProductSelect,
  ProductOption,
  ProductTable,
} from "../styles/offerStyles";

const OfferCreate = ({ existingOffer, onOfferCreated }) => {
  const dispatch = useDispatch();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const products = useSelector((state) => state.product.products) || [];
  const customers = useSelector((state) => state.customer.customers) || [];
  const isLoading =
    useSelector((state) => state.product.status) === "loading" ||
    useSelector((state) => state.customer.status) === "loading";

  const [formData, setFormData] = useState({
    company: "",
    customer: "",
    selectedProducts: [],
    shippingCost: 0,
    validUntil: "",
    paymentTerms: "30 gün içinde ödeme",
    notes: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
    if (existingOffer) {
      setFormData(existingOffer);
    }
  }, [dispatch, existingOffer]);

  // 📌 Seçim değişikliği
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Ürün seçme
  const handleProductSelect = (productId) => {
    const selectedProduct = products.find((p) => p._id === productId);
    if (selectedProduct && !formData.selectedProducts.some((p) => p._id === selectedProduct._id)) {
      setFormData((prev) => ({
        ...prev,
        selectedProducts: [
          ...prev.selectedProducts,
          {
            _id: selectedProduct._id,
            title: selectedProduct.title,
            description: selectedProduct.description,
            quantity: 1,
            customPrice: selectedProduct.price,
            taxRate: 19, // 📌 Varsayılan KDV oranı
          },
        ],
      }));
    }
  };

  // 📌 Ürün güncelleme
  const handleProductUpdate = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.map((product) =>
        product._id === id ? { ...product, [field]: Number(value) } : product
      ),
    }));
  };

  // 📌 Ürün silme
  const handleRemoveProduct = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((p) => p._id !== id),
    }));
  };

  // 📌 Toplamları hesapla
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

  // 📌 Teklif kaydetme işlemi
  const handleSave = () => {
    if (!formData.company || !formData.customer || formData.selectedProducts.length === 0) {
      toast.error(texts?.offers?.errors?.missingFields);
      return;
    }

    const newOffer = { ...formData, status: "draft", totalAmount: totals.grandTotal };
    dispatch(addOffer(newOffer))
      .unwrap()
      .then(() => toast.success(texts?.offers?.success?.created))
      .catch(() => toast.error(texts?.offers?.errors?.createFailed));

    if (onOfferCreated) onOfferCreated();
  };

  if (isLoading) return <p>{texts?.offers?.loading}</p>;

  return (
    <OfferFormContainer theme={theme}>
      <OfferHeader>{existingOffer ? texts?.offers?.editOffer : texts?.offers?.createOffer}</OfferHeader>

      <OfferDetailsContainer>
        <label>{texts?.offers?.companyName}:</label>
        <ProductSelect name="company" value={formData.company} onChange={handleChange}>
          <ProductOption value="">{texts?.offers?.selectCompany}</ProductOption>
          {customers.map((customer) => (
            <ProductOption key={customer._id} value={customer._id}>
              {customer.companyName}
            </ProductOption>
          ))}
        </ProductSelect>

        <label>{texts?.offers?.customerName}:</label>
        <ProductSelect name="customer" value={formData.customer} onChange={handleChange} disabled={!formData.company}>
          <ProductOption value="">{texts?.offers?.selectCustomer}</ProductOption>
          {customers
            .filter((c) => c.company === formData.company)
            .map((customer) => (
              <ProductOption key={customer._id} value={customer._id}>
                {customer.contactName} - {customer.email}
              </ProductOption>
            ))}
        </ProductSelect>

        <label>{texts?.offers?.selectProduct}:</label>
        <ProductSelect onChange={(e) => handleProductSelect(e.target.value)}>
          <ProductOption value="">{texts?.offers?.selectProduct}</ProductOption>
          {products.map((product) => (
            <ProductOption key={product._id} value={product._id}>
              {product.title} - {product.price} ₺
            </ProductOption>
          ))}
        </ProductSelect>
      </OfferDetailsContainer>

      <ProductTable>
        <thead>
          <tr>
            <th>{texts?.offers?.product}</th>
            <th>{texts?.offers?.quantity}</th>
            <th>{texts?.offers?.price}</th>
            <th>{texts?.offers?.remove}</th>
          </tr>
        </thead>
        <tbody>
          {formData.selectedProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <FormInput type="number" value={product.quantity} onChange={(e) => handleProductUpdate(product._id, "quantity", e.target.value)} />
              </td>
              <td>{product.customPrice} ₺</td>
              <td>
                <ActionButton onClick={() => handleRemoveProduct(product._id)}>🗑️</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <label>{texts?.offers?.shippingCost}:</label>
      <FormInput type="number" name="shippingCost" value={formData.shippingCost} onChange={handleChange} />

      <TotalSection>
        <h2>{texts?.offers?.total}: {totals.grandTotal.toFixed(2)} ₺</h2>
        <p>{texts?.offers?.taxTotal}: {totals.taxTotal.toFixed(2)} ₺</p>
      </TotalSection>

      <ActionButton onClick={handleSave}>{texts?.offers?.save}</ActionButton>
    </OfferFormContainer>
  );
};

export default OfferCreate;
