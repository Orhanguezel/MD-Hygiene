
// ✅ src/features/notification/useNotifications.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addNotification, markAsRead, deleteNotification } from './notificationSlice';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);

  const handleAddNotification = (notification) => {
    dispatch(addNotification(notification));
  };

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleDeleteNotification = (id) => {
    dispatch(deleteNotification(id));
  };

  // ✅ Dummy Bildirim Ekleme (sayfa yüklenince)
  useEffect(() => {
    const dummyNotification = {
      id: Date.now(),
      title: 'Sistem Güncellemesi',
      message: 'Sistem başarıyla güncellendi!',
      date: new Date().toLocaleString(),
      status: 'Unread',
    };
    handleAddNotification(dummyNotification);
  }, [dispatch]);

  return { notifications, addNotification: handleAddNotification, markAsRead: handleMarkAsRead, deleteNotification: handleDeleteNotification };
};