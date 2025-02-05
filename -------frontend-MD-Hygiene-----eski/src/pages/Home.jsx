import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, LoadingText, ErrorText, ProductGrid, ProductCard, ProductName, ProductPrice } from "../styles/HomeStyles";
import { Helmet } from "react-helmet-async";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5010/api";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (err) {
        console.error("Fehler beim Laden der Produkte:", err);
        setError("Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>MD Hygiene | Startseite</title>
        <meta name="description" content="Willkommen bei MD Hygiene - Ihre Quelle für Hygieneprodukte" />
        <meta name="keywords" content="Hygiene, Reinigung, Produkte, Desinfektion" />
        <meta property="og:title" content="MD Hygiene | Startseite" />
        <meta property="og:description" content="Willkommen bei MD Hygiene - Ihre Quelle für Hygieneprodukte" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Title>Unsere Produkte</Title>

      {loading && <LoadingText>⏳ Produkte werden geladen...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price.toFixed(2)} €</ProductPrice>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </Container>
  );
};

export default Home;
