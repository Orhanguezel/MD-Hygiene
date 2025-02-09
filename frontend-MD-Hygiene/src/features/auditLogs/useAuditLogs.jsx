
// ✅ src/features/auditLogs/useAuditLogs.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addLog, clearLogs } from './auditLogsSlice';
import { createWebSocketConnection } from '@/services/WebSocketService';

export const useAuditLogs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.auditLogs);

  const handleAddLog = (eventType, user, status = 'Bilgi') => {
    const newLog = {
      id: Date.now(),
      eventType,
      user,
      date: new Date().toLocaleString(),
      status,
    };
    dispatch(addLog(newLog));
  };

  const handleClearLogs = () => {
    dispatch(clearLogs());
  };

  useEffect(() => {
    const unsubscribe = createWebSocketConnection((data) => {
      handleAddLog(data.title, data.user, data.status || 'Bilgi');
    });

    return () => {
      if (unsubscribe) unsubscribe(); // ✅ Güvenli bağlantı kapatma
    };
  }, [dispatch]);

  return { logs, addLog: handleAddLog, clearLogs: handleClearLogs };
};
