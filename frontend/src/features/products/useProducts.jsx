// ✅ src/features/products/useProducts.js
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice"; // ✅ Sadece fetchProducts kullanılıyor

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const handleFetchProducts = () => dispatch(fetchProducts());

  return {
    products,
    loading,
    error,
    fetchProducts: handleFetchProducts,
  };
};
