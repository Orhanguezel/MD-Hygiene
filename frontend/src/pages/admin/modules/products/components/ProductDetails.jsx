import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/features/products/productSlice";
import { toast } from "react-toastify";
import "../styles/productStyles.js";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    images: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setFormData({
        name: selectedProduct.title,
        brand: selectedProduct.category?.name || "Bilinmiyor",
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        images: selectedProduct.images,
      });
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, ...formData }));
    setIsEditing(false);
    toast.success("✅ Ürün başarıyla güncellendi!");
  };

  if (!product) {
    return <p>Ürün bulunamadı.</p>;
  }

  return (
    <div className="form-container">
      <h2>📋 Ürün Detayları</h2>
      <img 
        src={product.images?.[0] || "/placeholder.jpg"} 
        alt={product.title} 
        width="200" 
      />
      <form onSubmit={handleSubmit} className="product-form">
        <label>Ürün Adı</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} required />

        <label>Kategori</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} disabled={!isEditing} required />

        <label>Fiyat (€)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} disabled={!isEditing} required />

        <label>Stok Miktarı</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} disabled={!isEditing} required />

        {isEditing ? (
          <button type="submit" className="submit-btn">💾 Kaydet</button>
        ) : (
          <button type="button" className="edit-btn" onClick={() => setIsEditing(true)}>✏️ Düzenle</button>
        )}

        <button type="button" className="cancel-btn" onClick={() => navigate("/products")}>❌ Geri Dön</button>
      </form>
    </div>
  );
};

export default ProductDetails;
