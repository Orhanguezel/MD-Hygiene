import { createContext, useContext, useState } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: "001",
      customer: "Ali Veli",
      status: "delivered",
      totalAmount: 250,
      taxAmount: 20,
      paymentStatus: "paid",
      shippingAddress: {
        street: "Ataturk Cad. 123",
        city: "Istanbul",
        postalCode: "34000",
        country: "Turkey",
      },
      products: [
        { product: "Product A", quantity: 2, unitPrice: 100 },
        { product: "Product B", quantity: 1, unitPrice: 50 },
      ],
    },
    {
      id: "002",
      customer: "Ayşe Yılmaz",
      status: "pending",
      totalAmount: 150,
      taxAmount: 15,
      paymentStatus: "pending",
      shippingAddress: {
        street: "Cumhuriyet Mah. 45",
        city: "Ankara",
        postalCode: "06000",
        country: "Turkey",
      },
      products: [
        { product: "Product C", quantity: 3, unitPrice: 50 },
      ],
    },
  ]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);