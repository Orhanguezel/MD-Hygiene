// ✅ src/pages/products/ProductList.jsx
import React from "react";
import { useProducts } from "@/features/products/useProducts";
import { useLanguage } from "@/features/language/useLanguage";
import { ListContainer, ProductItem } from "../styles/productStyles";

const ProductList = () => {
  const { products } = useProducts();
  const { texts } = useLanguage();

  return (
    <ListContainer>
      <h2>{texts?.products?.list || "Ürün Listesi"}</h2>
      {products.length === 0 ? (
        <p>{texts?.products?.noProducts || "Ürün bulunamadı."}</p>
      ) : (
        products.map((product) => (
          <ProductItem key={product.id}>
            <strong>{product.name}</strong> - {product.price} ₺ ({product.stock} adet stokta)
          </ProductItem>
        ))
      )}
    </ListContainer>
  );
};

export default ProductList;