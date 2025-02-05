import { useState, useEffect, useContext } from "react";
import { FaStore, FaMapMarkerAlt, FaPlus } from "react-icons/fa"; // 📌 İkonlar eklendi
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import {
  StoreContainer,
  StoreHeader,
  StoreList,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreTitle,
  StoreLocation,
  StoreButton,
  ErrorMessage,
  LoadingMessage,
} from "../styles/StoreStyles";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // 📌 Mağaza verilerini çekme
  const fetchData = async () => {
    if (!user?.token) {
      setError("⚠️ Nicht angemeldet! (Giriş yapmalısınız.)");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/store/get/${user.token}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!response.ok) throw new Error("⚠️ Filialen konnten nicht geladen werden!");

      const data = await response.json();
      setAllStores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StoreContainer>
      {/* 📌 Başlık */}
      <StoreHeader>
        <FaStore size={24} />
        <h1>Filialverwaltung</h1>
        <StoreButton onClick={toggleModal}>
          <FaPlus /> Filiale hinzufügen
        </StoreButton>
      </StoreHeader>

      {/* 📌 Modal */}
      {showModal && <AddStore onClose={toggleModal} />}

      {/* 📌 Veri yükleniyor mesajı */}
      {loading && <LoadingMessage>⏳ Daten werden geladen...</LoadingMessage>}

      {/* 📌 Hata mesajı */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* 📌 Mağaza Listesi */}
      <StoreList>
        {stores.length === 0 && !loading && !error ? (
          <ErrorMessage>🚀 Keine Filialen gefunden.</ErrorMessage>
        ) : (
          stores.map((store) => (
            <StoreCard key={store._id}>
              <StoreImage src={store.image || "/default-store.png"} alt="store" />
              <StoreInfo>
                <StoreTitle>{store.name}</StoreTitle>
                <StoreLocation>
                  <FaMapMarkerAlt /> <span>{store.address + ", " + store.city}</span>
                </StoreLocation>
              </StoreInfo>
            </StoreCard>
          ))
        )}
      </StoreList>
    </StoreContainer>
  );
}

export default Store;
