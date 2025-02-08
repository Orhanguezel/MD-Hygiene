// ✅ ProductContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { productReducer, initialProductState } from "./productReducer";
import productsData from "../data/products.json";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, initialProductState);

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: productsData });
  }, []);

  const addProduct = (product) => dispatch({ type: "ADD_PRODUCT", payload: product });
  const updateProduct = (product) => dispatch({ type: "UPDATE_PRODUCT", payload: product });
  const deleteProduct = (id) => dispatch({ type: "DELETE_PRODUCT", payload: id });

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};

