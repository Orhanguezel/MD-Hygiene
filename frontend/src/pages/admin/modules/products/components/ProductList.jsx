import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "@/features/products/productSlice";
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
  const { texts } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.warn("🗑️ Ürün silindi!");
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleEdit = (product) => {
    setEditingProduct({
      ...product,
      newPrice: product.price,
      newStock: product.stock,
    });
  };

  const handleChange = (field, value) => {
    setEditingProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editingProduct) return;

    dispatch(
      updateProduct({
        id: editingProduct.id,
        price: editingProduct.newPrice,
        stock: editingProduct.newStock,
      })
    );

    toast.success(`✅ ${editingProduct.title} güncellendi!`);
    setEditingProduct(null); // 📌 Formu kapat
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category?.id === selectedCategory);

  return (
    <ListContainer>
      <h2>{texts?.products?.list || "Ürün Listesi"}</h2>

      {/* 📌 Kategori Butonları */}
      <CategoryButtonContainer>
        <CategoryButton
          $isActive={selectedCategory === "all"}
          onClick={() => handleCategorySelect("all")}
        >
          📌 {texts?.products?.allCategories || "Tüm Kategoriler"}
        </CategoryButton>

        {products
          .map((product) => product.category)
          .filter(
            (category, index, self) =>
              category && self.findIndex((c) => c.id === category.id) === index
          )
          .map((category) => (
            <CategoryButton
              key={category.id}
              $isActive={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoryButtonContainer>

      {loading && <p>🔄 {texts?.products?.loading || "Yükleniyor..."}</p>}
      {error && (
        <p style={{ color: "red" }}>
          {texts?.products?.error || "Ürünleri yüklerken hata oluştu."}
        </p>
      )}

      {filteredProducts.map((product) => (
        <ProductItem key={product.id}>
          <ProductImage
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
            onClick={() => handleEdit(product)} // 📌 Resme tıklayınca form açılır
          />
          <ProductDetails>
            <strong>{product.title}</strong>
            <p>{product.price} ₺</p>
            <p>
              {texts?.products?.stock || "Stok"}:{" "}
              {product.stock || "Bilinmiyor"}
            </p>
          </ProductDetails>
          <DeleteButton onClick={() => handleDelete(product.id)}>
            🗑️
          </DeleteButton>
        </ProductItem>
      ))}
    </ListContainer>
  );
};

export default ProductList;
