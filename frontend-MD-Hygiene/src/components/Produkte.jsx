import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";

function Produkte() {
  const [produkte, setProdukte] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then((response) => {
        setProdukte(response.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Produkte:", err);
        setError("Fehler beim Laden der Produkte.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Produkte</h2>
      {loading ? <p>Laden...</p> : error ? <p>{error}</p> : (
        <ul>
          {produkte.map((produkt) => (
            <li key={produkt._id}>
              {produkt.name} - {produkt.price} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Produkte;
