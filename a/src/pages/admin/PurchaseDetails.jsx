import { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaEuroSign, FaClipboardList } from "react-icons/fa";
import AuthContext from "../AuthContext";
import { API } from "../../services/api";
import {
  PurchaseContainer,
  PurchaseWrapper,
  TableWrapper,
  PurchaseTable,
  TableHeader,
  TableRow,
  TableData,
  Section,
  SectionTitle,
  StatGrid,
  StatCard,
} from "../../styles/PurchaseStyles";

function PurchaseDetails() {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${API.PURCHASES}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!response.ok) throw new Error("Einkaufsdaten konnten nicht geladen werden.");
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Fehler beim Laden der Einkäufe:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PurchaseContainer>
      <PurchaseWrapper>
        <Section>
          <SectionTitle>🛒 Einkaufsverwaltung</SectionTitle>
          <StatGrid>
            <StatCard>
              <FaClipboardList />
              <span>Gesamtbestellungen</span>
              <h2>{purchases.length}</h2>
            </StatCard>
            <StatCard>
              <FaEuroSign />
              <span>Gesamtkosten</span>
              <h2>€{purchases.reduce((acc, item) => acc + item.TotalPurchaseAmount, 0).toFixed(2)}</h2>
            </StatCard>
          </StatGrid>
        </Section>

        <TableWrapper>
          <h2>📋 Bestelldetails</h2>

          {loading ? (
            <p>⏳ Daten werden geladen...</p>
          ) : error ? (
            <p style={{ color: "red" }}>❌ {error}</p>
          ) : (
            <PurchaseTable>
              <thead>
                <tr>
                  <TableHeader>📦 Produkt</TableHeader>
                  <TableHeader>📊 Menge</TableHeader>
                  <TableHeader>📅 Bestelldatum</TableHeader>
                  <TableHeader>💰 Gesamtpreis</TableHeader>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <TableRow key={purchase._id}>
                    <TableData>{purchase.ProductID?.name || "Unbekannt"}</TableData>
                    <TableData>{purchase.QuantityPurchased}</TableData>
                    <TableData>
                      <FaCalendarAlt /> {new Date(purchase.PurchaseDate).toLocaleDateString()}
                    </TableData>
                    <TableData>€{purchase.TotalPurchaseAmount.toFixed(2)}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </PurchaseTable>
          )}
        </TableWrapper>
      </PurchaseWrapper>
    </PurchaseContainer>
  );
}

export default PurchaseDetails;
