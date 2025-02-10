import { createContext, useContext, useReducer, useEffect } from "react";
import { notificationReducer, initialNotificationState } from "./notificationReducer";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, initialNotificationState);

  const addNotification = (notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };

  const markAsRead = (id) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  };

  const deleteNotification = (id) => {
    dispatch({ type: "DELETE_NOTIFICATION", payload: id });
  };

  // ✅ Dummy Bildirim Ekleme (sayfa yüklenince)
  useEffect(() => {
    const dummyNotification = {
      id: Date.now(),
      title: "Sistem Güncellemesi",
      message: "Sistem başarıyla güncellendi!",
      date: new Date().toLocaleString(),
      status: "Unread",
    };
    addNotification(dummyNotification);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
