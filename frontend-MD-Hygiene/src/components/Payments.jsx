import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Local Storage'dan JWT Token Al
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ JWT token ekleniyor
        },
      })
      .then((response) => {
        setPayments(response.data);
      })
      .catch((err) => {
        console.error("Fehler beim Abrufen der Zahlungen:", err);
        setError("Fehler beim Abrufen der Zahlungen: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  return (
    <div>
      <h2>Zahlungen</h2>

      {loading && <p>⏳ Lade Zahlungen...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id}>
              Zahlung #{payment._id} - Betrag: {payment.amount} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Payments;
