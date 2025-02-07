// ✅ WebSocketService.js
export const createWebSocketConnection = (onMessage, onError) => {
    const socket = new WebSocket("wss://echo.websocket.org");
  
    const isJSON = (str) => {
      try {
        const parsed = JSON.parse(str);
        return parsed && typeof parsed === "object";
      } catch {
        return false;
      }
    };
  
    socket.onmessage = (event) => {
  
      if (isJSON(event.data)) {
        const data = JSON.parse(event.data);
  
        // ✅ Mesajda title ve message varsa işleme al
        if (data.title && data.message) {
          if (onMessage) onMessage(data);
        } else {
          console.warn("⚠️ Geçerli bildirim değil:", data);
        }
      }
    };
  
    socket.onerror = (error) => {
      console.error("🚨 WebSocket hatası:", error);
      if (onError) onError(error);
    };
  
    return () => socket.close();
  };
