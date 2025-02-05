import { useState, useEffect, useContext } from "react";
import { FaBox, FaStore, FaShoppingCart, FaCalendarAlt, FaEuroSign } from "react-icons/fa";
import AuthContext from "../AuthContext";
import { API } from "../services/api"; 
import { 
  SalesContainer, 
  SalesWrapper, 
  TableWrapper, 
  SalesTable, 
  TableHeader, 
  TableRow, 
  TableData,
  TitleContainer,
  TitleIcon,
  LoadingMessage,
  ErrorMessage,
} from "../styles/SalesStyles";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    if (user) fetchSalesData();
  }, [user]);

  const fetchSalesData = async () => {
    try {
      const response = await fetch(`${API.SALES}/get/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (!response.ok) throw new Error("⚠️ Verkaufsdaten konnten nicht geladen werden.");
      const data = await response.json();
      setSales(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SalesContainer>
      <TitleContainer>
        <TitleIcon />
        <h1>📊 Verkaufsverwaltung</h1>
      </TitleContainer>

      {/* 📌 Yükleme Mesajı */}
      {loading && <LoadingMessage>⏳ Daten werden geladen...</LoadingMessage>}

      {/* 📌 Hata Mesajı */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* 📌 Satış Verileri */}
      <SalesWrapper>
        <TableWrapper>
          <SalesTable>
            <thead>
              <tr>
                <TableHeader><FaBox /> Produktname</TableHeader>
                <TableHeader><FaStore /> Geschäft</TableHeader>
                <TableHeader><FaShoppingCart /> Verkaufte Menge</TableHeader>
                <TableHeader><FaCalendarAlt /> Verkaufsdatum</TableHeader>
                <TableHeader><FaEuroSign /> Gesamtumsatz</TableHeader>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 && !loading && (
                <tr>
                  <TableData colSpan="5">🚀 Keine Verkaufsdaten vorhanden.</TableData>
                </tr>
              )}
              {sales.map((sale) => (
                <TableRow key={sale._id}>
                  <TableData>{sale.ProductID?.name || "Unbekannt"}</TableData>
                  <TableData>{sale.StoreID?.name || "Unbekannt"}</TableData>
                  <TableData>{sale.StockSold}</TableData>
                  <TableData>{new Date(sale.SaleDate).toLocaleDateString()}</TableData>
                  <TableData>€{sale.TotalSaleAmount.toFixed(2)}</TableData>
                </TableRow>
              ))}
            </tbody>
          </SalesTable>
        </TableWrapper>
      </SalesWrapper>
    </SalesContainer>
  );
}

export default Sales;
