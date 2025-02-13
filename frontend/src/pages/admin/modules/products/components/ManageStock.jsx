import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/features/products/productSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
import { ListContainer, ProductItem, ProductImage, ProductDetails, FormInput, SubmitButton } from "../styles/productStyles";

const ManageStock = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { texts } = useLanguage();
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
    toast.success(`✅ ${product.title} güncellendi!`);
  };

  return (
    <ListContainer>
      <h2>{texts?.products?.manageStock || "📦 Fiyat ve Stok Yönetimi"}</h2>

      {updatedProducts.map((product) => (
        <ProductItem key={product.id}>
          <ProductImage src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} />
          <ProductDetails>
            <label>Fiyat:</label>
            <FormInput type="number" value={product.newPrice} onChange={(e) => handleChange(product.id, "newPrice", e.target.value)} />
            <label>Stok:</label>
            <FormInput type="number" value={product.newStock} onChange={(e) => handleChange(product.id, "newStock", e.target.value)} />
          </ProductDetails>
          <SubmitButton onClick={() => handleSave(product)}>💾 Kaydet</SubmitButton>
        </ProductItem>
      ))}
    </ListContainer>
  );
};

export default ManageStock;
