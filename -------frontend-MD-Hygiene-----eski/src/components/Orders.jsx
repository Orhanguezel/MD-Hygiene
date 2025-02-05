import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Local Storage'dan JWT Token Al
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ JWT token ekleniyor
        },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Bestellungen:", err);
        setError("Fehler beim Laden der Bestellungen.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Bestellungen</h2>

      {loading && <p>⏳ Laden...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Bestellung #{order._id} - Gesamt: {order.totalAmount} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
