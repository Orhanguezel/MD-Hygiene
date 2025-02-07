import { useEffect, useState, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../../api/productApi";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  ActionButton,
  FormContainer,
  Input,
  SubmitButton,
} from "../../styles/dashboardStyles";

const ProductManagement = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const createdProduct = await createProduct(newProduct, user.token);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: "", price: "", stock: "" });
    } catch (error) {
      console.error("Ürün eklenemedi:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(editProduct.id, editProduct, user.token);
      setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
      setEditProduct(null);
    } catch (error) {
      console.error("Ürün güncellenemedi:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, user.token);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Ürün silinemedi:", error);
    }
  };

  return (
    <div>
      <h3>🛒 Ürün Yönetimi</h3>

      {/* 📌 Yeni Ürün Ekleme Formu */}
      <FormContainer>
        <Input type="text" placeholder="Ürün Adı" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <Input type="number" placeholder="Fiyat (€)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <Input type="number" placeholder="Stok" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        <SubmitButton onClick={handleCreateProduct}><FaPlus /> Ekle</SubmitButton>
      </FormContainer>

      {/* 📌 Ürünleri Listeleme */}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Ürün</TableHeader>
            <TableHeader>Fiyat (€)</TableHeader>
            <TableHeader>Stok</TableHeader>
            <TableHeader>İşlemler</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableData>{product.id}</TableData>
              <TableData>{product.name}</TableData>
              <TableData>€{product.price}</TableData>
              <TableData>{product.stock}</TableData>
              <TableData>
                <ActionButton onClick={() => setEditProduct(product)}><FaEdit /> Düzenle</ActionButton>
                <ActionButton onClick={() => handleDeleteProduct(product.id)}><FaTrash /> Sil</ActionButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* 📌 Ürün Güncelleme Formu */}
      {editProduct && (
        <FormContainer>
          <Input type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
          <Input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
          <Input type="number" value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} />
          <SubmitButton onClick={handleUpdateProduct}>Güncelle</SubmitButton>
        </FormContainer>
      )}
    </div>
  );
};

export default ProductManagement;
