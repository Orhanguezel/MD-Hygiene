import { useEffect, useState, useContext } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaPlusCircle, FaDownload } from "react-icons/fa";
import { getOffers, createOffer, updateOfferStatus } from "../../api/offerApi";
import { getProducts } from "../../api/productApi";
import { generateOfferPDF } from "../../utils/pdfUtils";
import AuthContext from "../../context/AuthContext";
import {
  Table, TableRow, TableHeader, TableData, Button, StatusBadge, Modal, Input, Select
} from "../../styles/dashboardStyles";

const OfferManagement = () => {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newOffer, setNewOffer] = useState({ user: user?.id, items: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersData, productsData] = await Promise.all([
          getOffers(user.token),
          getProducts(user.token)
        ]);
        setOffers(offersData);
        setProducts(productsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleCreateOffer = async () => {
    try {
      const createdOffer = await createOffer(newOffer, user.token);
      setOffers([...offers, createdOffer]);
      setShowModal(false);
    } catch (error) {
      console.error("Teklif oluşturulamadı:", error);
    }
  };

  const handleStatusChange = async (offerId, newStatus) => {
    try {
      await updateOfferStatus(offerId, newStatus, user.token);
      setOffers(prev => prev.map(offer => offer._id === offerId ? { ...offer, status: newStatus } : offer));
    } catch (error) {
      console.error("Teklif durumu güncellenemedi:", error);
    }
  };

  const handleDownloadPDF = (offer) => {
    generateOfferPDF(offer);
  };

  const handleAddProductToOffer = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      setNewOffer(prev => ({
        ...prev,
        items: [...prev.items, { product: productId, name: product.name, unitPrice: product.price, quantity: 1 }]
      }));
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...newOffer.items];
    updatedItems[index].quantity = quantity;
    setNewOffer(prev => ({ ...prev, items: updatedItems }));
  };

  return (
    <div>
      <h3>📜 Teklif Yönetimi</h3>
      {loading && <p>⏳ Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button onClick={() => setShowModal(true)}>
        <FaPlusCircle /> Yeni Teklif Oluştur
      </Button>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Müşteri</TableHeader>
            <TableHeader>Toplam (€)</TableHeader>
            <TableHeader>Durum</TableHeader>
            <TableHeader>İşlem</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <TableRow key={offer._id}>
              <TableData>{offer._id}</TableData>
              <TableData>{offer.user?.name}</TableData>
              <TableData>€{offer.totalAmount.toFixed(2)}</TableData>
              <TableData>
                <StatusBadge status={offer.status}>{offer.status}</StatusBadge>
              </TableData>
              <TableData>
                <Button onClick={() => handleStatusChange(offer._id, "approved")}>
                  <FaCheckCircle /> Onayla
                </Button>
                <Button onClick={() => handleStatusChange(offer._id, "rejected")}>
                  <FaTimesCircle /> Reddet
                </Button>
                <Button onClick={() => handleDownloadPDF(offer)}>
                  <FaDownload /> PDF İndir
                </Button>
                <Button>
                  <FaInfoCircle /> Detaylar
                </Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <Modal>
          <h4>Yeni Teklif</h4>
          <Input type="text" placeholder="Müşteri ID" onChange={(e) => setNewOffer({ ...newOffer, user: e.target.value })} />
          
          <Select onChange={(e) => handleAddProductToOffer(e.target.value)}>
            <option>Ürün Seç</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>{product.name} - €{product.price}</option>
            ))}
          </Select>

          {newOffer.items.length > 0 && (
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Ürün</TableHeader>
                  <TableHeader>Adet</TableHeader>
                  <TableHeader>Birim Fiyat (€)</TableHeader>
                  <TableHeader>Toplam (€)</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {newOffer.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableData>{item.name}</TableData>
                    <TableData>
                      <Input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      />
                    </TableData>
                    <TableData>€{item.unitPrice.toFixed(2)}</TableData>
                    <TableData>€{(item.quantity * item.unitPrice).toFixed(2)}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}

          <Button onClick={handleCreateOffer}>Kaydet</Button>
          <Button onClick={() => setShowModal(false)}>Kapat</Button>
        </Modal>
      )}
    </div>
  );
};

export default OfferManagement;
