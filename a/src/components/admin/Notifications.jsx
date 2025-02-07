import { useEffect, useState, useContext } from "react";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../../api/notificationApi";
import { connectWebSocket } from "../../utils/websocket";
import {
  NotificationContainer,
  NotificationItem,
  MarkAsReadButton,
} from "../../styles/dashboardStyles";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.token) return;
      try {
        const data = await getUserNotifications(user.token);
        setNotifications(data);
      } catch (error) {
        console.error("Bildirimler alınamadı:", error);
      }
    };

    fetchNotifications();

    // WebSocket ile gerçek zamanlı bildirimleri dinle
    const socket = connectWebSocket((data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => socket.close();
  }, [user]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId, user.token);
      setNotifications(notifications.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Bildirim okunamadı:", error);
    }
  };

  return (
    <div>
      <h3>🔔 Gerçek Zamanlı Bildirimler</h3>
      <NotificationContainer>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <p>{notification.message}</p>
            <MarkAsReadButton onClick={() => handleMarkAsRead(notification.id)}>
              <FaCheckCircle /> Okundu
            </MarkAsReadButton>
          </NotificationItem>
        ))}
      </NotificationContainer>
    </div>
  );
};

export default Notifications;
