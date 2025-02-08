// ✅ AuditLogsContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import auditLogsData from "../data/auditLogsData.json"; // ✅ JSON dosyasından import
import { createWebSocketConnection } from "../services/WebSocketService";
import { auditLogsReducer } from "./auditLogsReducer"; // ✅ Reducer dosyasından import

const AuditLogsContext = createContext();

export const AuditLogsProvider = ({ children }) => {
  const [logs, dispatch] = useReducer(auditLogsReducer, auditLogsData || []); // ✅ Varsayılan değer eklendi

  const addLog = (eventType, user, status = "Bilgi") => {
    const newLog = {
      id: Date.now(),
      eventType,
      user,
      date: new Date().toLocaleString(),
      status,
    };
    dispatch({ type: "ADD_LOG", payload: newLog });
  };

  const clearLogs = () => {
    dispatch({ type: "CLEAR_LOGS" });
  };

  // ✅ WebSocket bağlantısını başlat
  useEffect(() => {
    const unsubscribe = createWebSocketConnection((data) => {
      addLog(data.title, data.user, data.status || "Bilgi");
    });

    return () => {
      if (unsubscribe) unsubscribe(); // ✅ Güvenli bağlantı kapatma
    };
  }, []);

  return (
    <AuditLogsContext.Provider value={{ logs, addLog, clearLogs }}>
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