// src/pages/modules/offer/components/OfferSidebar.jsx
import React from "react";

const OfferSidebar = ({ setActiveSection }) => {
  return (
    <div style={{ width: "200px", background: "#f0f0f0", padding: "10px" }}>
      <h3>Teklif Yönetimi</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><button onClick={() => setActiveSection("list")}>📋 Teklif Listesi</button></li>
        <li><button onClick={() => setActiveSection("create")}>➕ Yeni Teklif Oluştur</button></li>
        <li><button onClick={() => setActiveSection("pdf")}>📄 PDF Görüntüle</button></li>
        <li><button onClick={() => setActiveSection("addProduct")}>📦 Ürün Ekle</button></li>
        <li><button onClick={() => setActiveSection("shipping")}>🚚 Nakliye Ücreti</button></li>
      </ul>
    </div>
  );
};

export default OfferSidebar;
