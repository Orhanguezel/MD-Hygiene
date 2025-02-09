import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/productStyles.js";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
  });
  const [isEditing, setIsEditing] = useState(false); // ✅ Düzenleme modu

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct);
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        brand: selectedProduct.brand,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
      });
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({ ...product, ...formData });
    setIsEditing(false); // ✅ Düzenleme modunu kapat
  };

  if (!product) {
    return <p>Ürün bulunamadı.</p>;
  }

  return (
    <div className="form-container">
      <h2>📋 Ürün Detayları</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Ürün Adı</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEditing} // ✅ Düzenleme moduna göre aktif/pasif yap
          required
        />

        <label>Marka</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          disabled={!isEditing}
          required
        />

        <label>Fiyat (€)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={!isEditing}
          required
        />

        <label>Stok Miktarı</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          disabled={!isEditing}
          required
        />

        {isEditing ? (
          <button type="submit" className="submit-btn">
            💾 Kaydet
          </button>
        ) : (
          <button
            type="button"
            className="edit-btn"
            onClick={() => setIsEditing(true)} // ✅ Düzenleme modunu aktif et
          >
            ✏️ Düzenle
          </button>
        )}

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/products")}
        >
          ❌ Geri Dön
        </button>
      </form>
    </div>
  );
};

export default ProductDetails;
