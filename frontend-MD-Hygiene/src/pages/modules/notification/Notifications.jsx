
// ✅ Notifications.jsx
import { NotificationsContainer, NotificationsList, NotificationItem, NotificationText, StatusBadge, ActionButton } from "./styles/notificationsStyles";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";

const Notifications = () => {
  const { texts } = useLanguage();
  const { notifications, markAsRead } = useNotifications();

  return (
    <NotificationsContainer>
      <h1>{texts.notifications.title}</h1>
      <NotificationsList>
        {notifications.length === 0 ? (
          <p>{texts.notifications.noNotifications}</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem key={notification.id}>
              <NotificationText>
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <small>{notification.date}</small>
              </NotificationText>
              <StatusBadge status={notification.status}>
                {notification.status === "Unread"
                  ? texts.notifications.unread
                  : texts.notifications.read}
              </StatusBadge>
              {notification.status === "Unread" && (
                <ActionButton onClick={() => markAsRead(notification.id)}>
                  {texts.notifications.markAsRead}
                </ActionButton>
              )}
            </NotificationItem>
          ))
        )}
      </NotificationsList>
    </NotificationsContainer>
  );
};

export default Notifications;
