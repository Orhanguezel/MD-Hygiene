// ✅ OrdersContext.js
import { createContext, useContext, useReducer } from "react";
import ordersData from "../data/orders.json"; 
import { ordersReducer, initialOrdersState } from "./orderReducer"; // Reducer import

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, dispatch] = useReducer(ordersReducer, ordersData || initialOrdersState);

  const addOrder = (order) => {
    dispatch({ type: "ADD_ORDER", payload: order });
  };

  const updateOrder = (order) => {
    dispatch({ type: "UPDATE_ORDER", payload: order });
  };

  const deleteOrder = (orderId) => {
    dispatch({ type: "DELETE_ORDER", payload: orderId });
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
