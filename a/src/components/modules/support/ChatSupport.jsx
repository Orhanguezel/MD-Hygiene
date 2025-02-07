import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getChatMessages, sendMessage } from "../../api/chatApi";
import { connectWebSocket } from "../../../utils/websocket";
import {
  ChatContainer,
  MessageList,
  MessageItem,
  MessageInput,
  SendButton,
} from "../../styles/chatStyles";

const ChatSupport = ({ orderId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.token) return;
      try {
        const data = await getChatMessages(orderId, user.token);
        setMessages(data);
      } catch (error) {
        console.error("Mesajlar alınamadı:", error);
      }
    };

    fetchMessages();

    // WebSocket ile mesajlaşma
    const socket = connectWebSocket((data) => {
      if (data.orderId === orderId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.close();
  }, [user, orderId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await sendMessage(orderId, newMessage, user.token);
      setMessages([...messages, { sender: user.name, message: newMessage }]);
      setNewMessage("");
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    }
  };

  return (
    <ChatContainer>
      <h4>📩 Canlı Sohbet</h4>
      <MessageList>
        {messages.map((msg, index) => (
          <MessageItem key={index}>{msg.sender}: {msg.message}</MessageItem>
        ))}
      </MessageList>
      <MessageInput
        type="text"
        placeholder="Mesajınızı yazın..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <SendButton onClick={handleSendMessage}>Gönder</SendButton>
    </ChatContainer>
  );
};

export default ChatSupport;
