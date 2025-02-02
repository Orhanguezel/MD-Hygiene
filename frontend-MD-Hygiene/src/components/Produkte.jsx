import { useEffect, useState } from "react";
import axios from "axios";
import {
  ProdukteContainer,
  ProduktListe,
  ProduktElement,
  ProduktTitel,
  LadeText,
  FehlerText,
} from "../styles/ProdukteStyles";

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
    <ProdukteContainer>
      <ProduktTitel>Produkte</ProduktTitel>
      {loading ? <LadeText>Laden...</LadeText> : error ? <FehlerText>{error}</FehlerText> : (
        <ProduktListe>
          {produkte.map((produkt) => (
            <ProduktElement key={produkt._id}>
              {produkt.name} - <strong>{produkt.price} €</strong>
            </ProduktElement>
          ))}
        </ProduktListe>
      )}
    </ProdukteContainer>
  );
}

export default Produkte;
