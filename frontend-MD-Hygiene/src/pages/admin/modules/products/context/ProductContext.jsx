import React, { createContext, useReducer, useContext, useEffect } from "react";
import { productReducer, initialProductState } from "./productReducer";
import productsData from "../data/products.json";

const ProductContext = createContext();

// ✅ LocalStorage'dan verileri al
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("❌ LocalStorage verisi okunamadı:", error);
    return null;
  }
};

// ✅ LocalStorage'a veri kaydet
const saveToLocalStorage = (products) => {
  try {
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error("❌ LocalStorage'a veri kaydedilemedi:", error);
  }
};

export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, initialProductState);

  // ✅ İlk Yükleme: LocalStorage'dan veri al, yoksa JSON'dan yükle
  useEffect(() => {
    const storedProducts = loadFromLocalStorage();

    if (storedProducts && storedProducts.length > 0) {
      dispatch({ type: "SET_PRODUCTS", payload: storedProducts });
    } else {
      console.log("📥 JSON'dan veri yükleniyor...");
      dispatch({ type: "SET_PRODUCTS", payload: productsData });
      saveToLocalStorage(productsData); // İlk veri kaydı
    }
  }, []);

  // ✅ Ürünlerde değişiklik olduğunda LocalStorage'a kaydet
  useEffect(() => {
    if (products.length > 0) {
      console.log("💾 LocalStorage güncelleniyor...");
      saveToLocalStorage(products);
    }
  }, [products]);

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
