import { useEffect, useState } from "react";
import { FaBoxOpen, FaTags, FaDollarSign } from "react-icons/fa";
import { API } from "../../services/api";
import {
  ProductsContainer,
  ProductList,
  ProductItem,
  SectionTitle,
  TitleContainer,
  TitleIcon,
  ProductImage,
  ProductName,
  ProductPrice,
  LoadingMessage,
  ErrorMessage,
} from "../../styles/ProductsStyles";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API.PRODUCTS);
        if (!response.ok) throw new Error("❌ Produkte konnten nicht geladen werden!");

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContainer>
      <TitleContainer>
        <TitleIcon>
          <FaBoxOpen />
        </TitleIcon>
        <SectionTitle>Produktverwaltung</SectionTitle>
      </TitleContainer>

      {loading ? (
        <LoadingMessage>⏳ Daten werden geladen...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : products.length === 0 ? (
        <ErrorMessage>🚀 Keine Produkte gefunden.</ErrorMessage>
      ) : (
        <ProductList>
          {products.map((product) => (
            <ProductItem key={product._id}>
              <ProductImage src={product.imageUrl || "/default-product.png"} alt={product.name} />
              <ProductName>
                <FaTags /> {product.name}
              </ProductName>
              <ProductPrice>
                <FaDollarSign /> {product.price} €
              </ProductPrice>
            </ProductItem>
          ))}
        </ProductList>
      )}
    </ProductsContainer>
  );
};

export default Products;
