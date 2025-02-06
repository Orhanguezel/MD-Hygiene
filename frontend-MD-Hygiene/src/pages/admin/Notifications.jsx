import { NotificationsContainer, NotificationsList, NotificationItem, NotificationText, StatusBadge, ActionButton } from "../../styles/notificationsStyles";
import { useLanguage } from "../../context/LanguageContext";

const Notifications = () => {
  const { texts } = useLanguage();

  const dummyNotifications = [
    { id: 1, title: "Sipariş Tamamlandı", message: "Ali Veli'nin siparişi tamamlandı.", date: "2024-04-01", status: "Okundu" },
    { id: 2, title: "Yeni Kayıt", message: "Ayşe Yılmaz kayıt oldu.", date: "2024-04-02", status: "Okunmadı" },
    { id: 3, title: "Fatura Oluşturuldu", message: "Mehmet Demir için fatura oluşturuldu.", date: "2024-04-03", status: "Okunmadı" },
  ];

  return (
    <NotificationsContainer>
      <h1>{texts.notifications.title}</h1>
      <NotificationsList>
        {dummyNotifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationText>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <small>{notification.date}</small>
            </NotificationText>
            <StatusBadge status={notification.status}>{notification.status}</StatusBadge>
            <ActionButton>{texts.notifications.markAsRead}</ActionButton>
          </NotificationItem>
        ))}
      </NotificationsList>
    </NotificationsContainer>
  );
};

export default Notifications;
