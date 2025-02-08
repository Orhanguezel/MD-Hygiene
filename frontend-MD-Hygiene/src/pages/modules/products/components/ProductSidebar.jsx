import React from "react";

const ProductSidebar = ({ setActiveSection }) => {
  return (
    <div style={{ width: "200px", background: "#4CAF50", padding: "10px", color: "white" }}>
      <h3>Ürün Yönetimi</h3>
      <button onClick={() => setActiveSection("list")}>📦 Ürün Listesi</button>
      <button onClick={() => setActiveSection("create")}>➕ Yeni Ürün Ekle</button>
    </div>
  );
};

export default ProductSidebar;
