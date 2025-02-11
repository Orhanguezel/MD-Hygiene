// src/pages/modules/products/components/EditProduct.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../styles/productStyles.js";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const productToEdit = products.find((p) => p.id === id);
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        brand: productToEdit.brand,
        price: productToEdit.price,
        stock: productToEdit.stock,
      });
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({ id, ...formData }); // ✅ Güncelleme
    alert("✅ Ürün başarıyla güncellendi!");
    navigate("/products"); // Listeye yönlendirme
  };

  return (
    <div className="form-container">
      <h2>✏️ Ürünü Düzenle</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Ürün Adı</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Marka</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <label>Fiyat (€)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Stok Miktarı</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          💾 Kaydet
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/products")}
        >
          ❌ İptal
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
