import { createContext, useContext, useState, useEffect } from "react";
import { createWebSocketConnection } from "../services/WebSocketService"; // ✅ WebSocket dosyanı buraya ekle

const AuditLogsContext = createContext();

export const AuditLogsProvider = ({ children }) => {
  const [logs, setLogs] = useState([
    { id: 1, eventType: "Giriş", user: "Orhan Admin", date: "2024-04-01", status: "Bilgi" },
    { id: 2, eventType: "Veri Güncelleme", user: "Ali Veli", date: "2024-04-02", status: "Uyarı" },
    { id: 3, eventType: "Silme İşlemi", user: "Ayşe Yılmaz", date: "2024-04-03", status: "Hata" },
  ]);

  const STATUS = {
    INFO: "Bilgi",
    WARNING: "Uyarı",
    ERROR: "Hata",
  };
  

  const addLog = (eventType, user, status = "Bilgi") => {
    const newLog = {
      id: Date.now(),
      eventType,
      user,
      date: new Date().toLocaleString(),
      status,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // ✅ WebSocket bağlantısını başlat
  useEffect(() => {
    const unsubscribe = createWebSocketConnection((data) => {
      addLog(data.title, data.user, data.status || STATUS.INFO)
    });

    return () => unsubscribe(); // ✅ Bağlantıyı temizle
  }, []);

  return (
    <AuditLogsContext.Provider value={{ logs, addLog }}>
      {children}
    </AuditLogsContext.Provider>
  );
};

export const useAuditLogs = () => {
  const context = useContext(AuditLogsContext);
  if (!context) {
    throw new Error("useAuditLogs must be used within an AuditLogsProvider");
  }
  return context;
};
