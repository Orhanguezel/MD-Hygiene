
// ✅ src/features/offer/components/OfferSidebar.jsx

const OfferSidebar = ({ setActiveSection }) => {
  return (
    <div style={{ width: "200px", backgroundColor: "#f4f4f4", padding: "20px" }}>
      <button onClick={() => setActiveSection("list")}>📋 Teklif Listesi</button>
      <button onClick={() => setActiveSection("create")}>➕ Yeni Teklif Oluştur</button>
      <button onClick={() => setActiveSection("addProduct")}>🛒 Ürün Ekle</button>
      <button onClick={() => setActiveSection("shipping")}>🚚 Nakliye Ücreti</button>
    </div>
  );
};

export default OfferSidebar;
