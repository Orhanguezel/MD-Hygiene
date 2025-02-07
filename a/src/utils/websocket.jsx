const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "ws://localhost:5000";

export const connectWebSocket = (onMessage) => {
  const socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    console.log("WebSocket bağlantısı kuruldu.");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket Hatası:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket bağlantısı kapatıldı.");
  };

  return socket;
};
