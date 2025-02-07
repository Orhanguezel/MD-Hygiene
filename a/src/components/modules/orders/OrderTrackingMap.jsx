import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AuthContext from "../../../context/AuthContext";
import { getOrderLocation } from "../../../api/orderApi";

const OrderTrackingMap = ({ order }) => {
  const { user } = useContext(AuthContext);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!user?.token) return;
      try {
        const data = await getOrderLocation(order.id, user.token);
        setLocation(data);
      } catch (error) {
        console.error("Sipariş konumu alınamadı:", error);
      }
    };

    fetchLocation();
  }, [user, order]);

  return (
    <div>
      <h3>📍 Sipariş Konumu</h3>
      {location ? (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              {order.customerName} için sipariş burada teslim ediliyor.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Konum yükleniyor...</p>
      )}
    </div>
  );
};

export default OrderTrackingMap;
