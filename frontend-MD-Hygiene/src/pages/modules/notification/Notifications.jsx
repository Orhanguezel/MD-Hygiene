import {
  NotificationsContainer,
  NotificationsList,
  NotificationItem,
  NotificationText,
  StatusBadge,
  ActionButton,
} from "./styles/notificationsStyles";
import { useLanguage } from "@/features/language/useLanguage";    // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";            // ✅ RTK Tema Yönetimi
import { useNotifications } from "@/features/notification/useNotifications";  // ✅ RTK Bildirim Yönetimi

const Notifications = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { notifications, markAsRead } = useNotifications();

  return (
    <NotificationsContainer theme={theme}>
      <h1>{texts?.notifications?.title || "Bildirimler"}</h1>
      
      <NotificationsList theme={theme}>
        {notifications.length === 0 ? (
          <p style={{ textAlign: "center", color: theme === "dark" ? "#ccc" : "gray" }}>
            {texts?.notifications?.noNotifications || "Henüz bildirim yok."}
          </p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} theme={theme}>
              <NotificationText theme={theme}>
                <h3>{notification.title || "-"}</h3>
                <p>{notification.message || "-"}</p>
                <small>{notification.date || "-"}</small>
              </NotificationText>

              <StatusBadge theme={theme} status={notification.status}>
                {notification.status === "Unread"
                  ? texts?.notifications?.unread || "Okunmadı"
                  : texts?.notifications?.read || "Okundu"}
              </StatusBadge>

              {notification.status === "Unread" && (
                <ActionButton theme={theme} onClick={() => markAsRead(notification.id)}>
                  {texts?.notifications?.markAsRead || "Okundu Olarak İşaretle"}
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
