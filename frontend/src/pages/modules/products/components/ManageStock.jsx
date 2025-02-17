import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/features/products/productSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { toast } from "react-toastify";
import { ListContainer, ProductItem, ProductImage, ProductDetails, FormInput, SubmitButton } from "../styles/productStyles";

const ManageStock = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const [updatedProducts, setUpdatedProducts] = useState([]);

  useEffect(() => {
    setUpdatedProducts(products.map(product => ({
      ...product,
      newPrice: product.price,
      newStock: product.stock,
    })));
  }, [products]);

  const handleChange = (id, field, value) => {
    setUpdatedProducts(updatedProducts.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  const handleSave = (product) => {
    dispatch(updateProduct({ 
      id: product.id, 
      price: product.newPrice, 
      stock: product.newStock 
    }));
    toast.success(`✅ ${product.title} ${texts?.products?.updated || "güncellendi"}!`);
  };

  return (
    <ListContainer>
      <h2>{texts?.products?.manageStock || "📦 Fiyat ve Stok Yönetimi"}</h2>

      {updatedProducts.map((product) => (
        <ProductItem key={product.id}>
          <ProductImage src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} />
          <ProductDetails>
            <label>{texts?.products?.price || "Fiyat"}:</label>
            <FormInput theme={theme} type="number" value={product.newPrice} onChange={(e) => handleChange(product.id, "newPrice", e.target.value)} />
            <label>{texts?.products?.stock || "Stok"}:</label>
            <FormInput theme={theme} type="number" value={product.newStock} onChange={(e) => handleChange(product.id, "newStock", e.target.value)} />
          </ProductDetails>
          <SubmitButton theme={theme} onClick={() => handleSave(product)}>💾 {texts?.products?.save || "Kaydet"}</SubmitButton>
        </ProductItem>
      ))}
    </ListContainer>
  );
};

export default ManageStock;
