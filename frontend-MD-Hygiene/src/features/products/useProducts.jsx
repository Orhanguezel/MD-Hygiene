
// ✅ src/features/products/useProducts.js
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, deleteProduct, setProducts } from './productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  const handleAddProduct = (product) => dispatch(addProduct(product));
  const handleUpdateProduct = (product) => dispatch(updateProduct(product));
  const handleDeleteProduct = (id) => dispatch(deleteProduct(id));
  const handleSetProducts = (products) => dispatch(setProducts(products));

  return {
    products,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    setProducts: handleSetProducts,
  };
};
