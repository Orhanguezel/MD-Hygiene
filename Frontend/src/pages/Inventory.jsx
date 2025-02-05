import { useEffect, useState, useContext } from "react";
import { FaBox, FaStore, FaEuroSign, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import AuthContext from "../AuthContext";
import { API } from "../services/api";
import {
  InventoryContainer,
  InventoryWrapper,
  Section,
  SectionTitle,
  StatGrid,
  StatCard,
  TableWrapper,
  SearchInputContainer,
  SearchInput,
  Button,
  InventoryTable,
  TableHeader,
  TableRow,
  TableData,
  StatusBadge,
} from "../styles/InventoryStyles";

function Inventory() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchStores();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API.PRODUCTS}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) throw new Error("Produkte konnten nicht geladen werden.");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fehler beim Laden der Produkte:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await fetch(`${API.STORES}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) throw new Error("Shops konnten nicht geladen werden.");
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error("Fehler beim Laden der Shops:", error);
    }
  };

  return (
    <InventoryContainer>
      <InventoryWrapper>
        <Section>
          <SectionTitle>📦 Inventarverwaltung</SectionTitle>
          <StatGrid>
            <StatCard>
              <FaBox />
              <span>Produkte</span>
              <h2>{products.length}</h2>
            </StatCard>
            <StatCard>
              <FaStore />
              <span>Shops</span>
              <h2>{stores.length}</h2>
            </StatCard>
            <StatCard>
              <FaEuroSign />
              <span>Gesamteinnahmen</span>
              <h2>€2000</h2>
            </StatCard>
          </StatGrid>
        </Section>

        <TableWrapper>
          <h2>📋 Produktliste</h2>
          <SearchInputContainer>
            <FaSearch />
            <SearchInput
              type="text"
              placeholder="🔍 Produkt suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputContainer>

          {loading ? (
            <p>⏳ Produkte werden geladen...</p>
          ) : error ? (
            <p style={{ color: "red" }}>❌ {error}</p>
          ) : (
            <InventoryTable>
              <thead>
                <tr>
                  <TableHeader>📦 Produkt</TableHeader>
                  <TableHeader>📊 Bestand</TableHeader>
                  <TableHeader>⚙️ Aktionen</TableHeader>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <TableRow key={product._id}>
                      <TableData>{product.name}</TableData>
                      <TableData>
                        <StatusBadge status={product.stock}>
                          {product.stock > 10
                            ? "Auf Lager"
                            : product.stock > 0
                            ? "Begrenzt"
                            : "Nicht vorrätig"}
                        </StatusBadge>
                      </TableData>
                      <TableData>
                        <Button>
                          <FaEdit /> Bearbeiten
                        </Button>
                        <Button danger>
                          <FaTrash /> Löschen
                        </Button>
                      </TableData>
                    </TableRow>
                  ))}
              </tbody>
            </InventoryTable>
          )}
        </TableWrapper>
      </InventoryWrapper>
    </InventoryContainer>
  );
}

export default Inventory;
