import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductSidebar from "./components/ProductSidebar";
import { ProductProvider } from "./context/ProductContext";

const Products = () => {
  const [activeSection, setActiveSection] = useState("list");

  const renderContent = () => {
    switch (activeSection) {
      case "create":
        return <ProductForm />;
      default:
        return <ProductList />;
    }
  };

  return (
    <ProductProvider>
      <div style={{ display: "flex" }}>
        <ProductSidebar setActiveSection={setActiveSection} />
        <div style={{ padding: "20px", flexGrow: 1 }}>{renderContent()}</div>
      </div>
    </ProductProvider>
  );
};

export default Products;
