// ✅ NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { createWebSocketConnection } from "@/services/WebSocketService";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Hoş Geldiniz!",
      message: "Platforma giriş yaptınız.",
      date: new Date().toLocaleString(),
      status: "Unread",
      type: "info",
    },
  ]);

  const addNotification = (title, message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      date: new Date().toLocaleString(),
      status: "Unread",
      type,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: "Read" } : notif
      )
    );
  };

  useEffect(() => {
    const cleanup = createWebSocketConnection(
      (data) => addNotification(data.title, data.message, data.type),
      (error) => console.error("WebSocket Error:", error)
    );

    return cleanup;
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
