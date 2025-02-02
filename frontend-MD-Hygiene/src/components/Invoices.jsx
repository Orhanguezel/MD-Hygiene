import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Local Storage'dan JWT Token Al
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/invoices`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ JWT token ekleniyor
        },
      })
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Rechnungen:", err);
        setError("Fehler beim Laden der Rechnungen.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Rechnungen</h2>

      {loading && <p>⏳ Laden...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice._id}>
              Rechnung #{invoice._id} - Gesamt: {invoice.totalAmount} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Invoices;
