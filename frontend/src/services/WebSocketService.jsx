// ✅ WebSocketService.js
export const createWebSocketConnection = (onMessage, onError) => {
  let socket;
  const SOCKET_URL = "wss://ws.postman-echo.com/raw";  // ✅ WebSocket URL

  const connect = () => {
    socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log("✅ WebSocket bağlantısı kuruldu.");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.title && data?.message) {
          onMessage(data);
        } else {
          console.warn("⚠️ Geçerli bildirim değil:", data);
        }
      } catch (error) {
        console.error("🚨 JSON parse hatası:", error);
      }
    };
    

    socket.onerror = (error) => {
      console.error("🚨 WebSocket hatası:", error);
      if (onError) onError(error);
    };

    socket.onclose = (event) => {
      console.warn("❌ WebSocket bağlantısı kapandı. Yeniden bağlanılıyor...");
      setTimeout(connect, 3000); // 3 saniye sonra yeniden bağlanmayı dene
    };
  };

  connect();

  // Bağlantıyı kapatma fonksiyonu
  return () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      console.log("🔒 WebSocket bağlantısı kapatıldı.");
    }
  };
};
