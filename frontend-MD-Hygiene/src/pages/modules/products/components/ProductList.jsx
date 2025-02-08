import React from "react";
import { useProducts } from "../context/ProductContext";

const ProductList = () => {
  const { products, deleteProduct } = useProducts();

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <table>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Marka</th>
            <th>Fiyat (₺)</th>
            <th>Stok</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
