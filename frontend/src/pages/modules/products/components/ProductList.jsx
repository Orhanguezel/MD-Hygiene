import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "@/features/products/productSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { toast } from "react-toastify";
import {
  ListContainer,
  ProductItem,
  ProductImage,
  DeleteButton,
  ProductDetails,
  CategoryButtonContainer,
  CategoryButton,
} from "../styles/productStyles";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { texts } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.warn(texts?.products?.deleteSuccess || "🗑️ Ürün başarıyla silindi!");
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  console.log("📌 Seçilen Kategori ID:", selectedCategory);
  console.log("📌 Ürünlerin Kategorileri:", products.map(p => p.category));
  console.log("📌 Kategori Listesi:", categories.map(c => c._id));

  // ✅ Ürünlerin kategoriye göre filtrelenmesi düzeltildi!
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category?._id?.toString() === selectedCategory);

  return (
    <ListContainer>
      <h2>{texts?.products?.list || "Ürün Listesi"}</h2>

      <CategoryButtonContainer>
        <CategoryButton
          $isActive={selectedCategory === "all"}
          onClick={() => handleCategorySelect("all")}
        >
          📌 {texts?.products?.allCategories || "Tüm Kategoriler"}
        </CategoryButton>

        {categories.map((category) => (
          <CategoryButton
            key={category._id}
            $isActive={selectedCategory === category._id}
            onClick={() => handleCategorySelect(category._id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryButtonContainer>

      {loading && <p>🔄 {texts?.products?.loading || "Yükleniyor..."}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredProducts.length === 0 ? (
        <p>{texts?.products?.noProducts || "Bu kategoride ürün bulunmamaktadır."}</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductItem key={product._id}>
            <ProductImage src={product.images?.[0] || "/placeholder.jpg"} alt={product.title} />
            <ProductDetails>
              <h5>{product.title}</h5>
              <p>{product.price} ₺</p>
              <p>{texts?.products?.stock || "Stok"}: {product.stock}</p>
            </ProductDetails>
            <DeleteButton onClick={() => handleDelete(product._id)}>🗑️</DeleteButton>
          </ProductItem>
        ))
      )}
    </ListContainer>
  );
};

export default ProductList;
