// ✅ src/features/orders/useOrders.js
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, updateOrder, deleteOrder } from './ordersSlice';

export const useOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const handleAddOrder = (order) => {
    dispatch(addOrder(order));
  };

  const handleUpdateOrder = (order) => {
    dispatch(updateOrder(order));
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return { orders, addOrder: handleAddOrder, updateOrder: handleUpdateOrder, deleteOrder: handleDeleteOrder };
};
