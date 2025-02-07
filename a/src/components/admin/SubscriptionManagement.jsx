import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getSubscriptions, createSubscription, cancelSubscription } from "../../api/subscriptionApi";
import {
  Table,
  TableRow,
  TableHeader,
  TableData,
  CancelButton,
  AddSubscriptionForm,
  SubmitButton,
} from "../../styles/dashboardStyles";

const SubscriptionManagement = () => {
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({ name: "", price: "", duration: "monthly" });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user?.token) return;
      try {
        const data = await getSubscriptions(user.token);
        setSubscriptions(data);
      } catch (error) {
        console.error("Abonelikler alınamadı:", error);
      }
    };

    fetchSubscriptions();
  }, [user]);

  const handleCreateSubscription = async () => {
    try {
      await createSubscription(newSubscription, user.token);
      setSubscriptions([...subscriptions, newSubscription]);
      setNewSubscription({ name: "", price: "", duration: "monthly" });
    } catch (error) {
      console.error("Abonelik oluşturulamadı:", error);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      await cancelSubscription(subscriptionId, user.token);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== subscriptionId));
    } catch (error) {
      console.error("Abonelik iptal edilemedi:", error);
    }
  };

  return (
    <div>
      <h3>📅 Abonelik Yönetimi</h3>
      <AddSubscriptionForm>
        <input type="text" placeholder="Abonelik Adı" value={newSubscription.name} onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })} />
        <input type="number" placeholder="Fiyat (€)" value={newSubscription.price} onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })} />
        <select value={newSubscription.duration} onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}>
          <option value="monthly">Aylık</option>
          <option value="yearly">Yıllık</option>
        </select>
        <SubmitButton onClick={handleCreateSubscription}>Ekle</SubmitButton>
      </AddSubscriptionForm>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Abonelik</TableHeader>
            <TableHeader>Fiyat (€)</TableHeader>
            <TableHeader>Süre</TableHeader>
            <TableHeader>İşlem</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableData>{subscription.name}</TableData>
              <TableData>€{subscription.price}</TableData>
              <TableData>{subscription.duration}</TableData>
              <TableData>
                <CancelButton onClick={() => handleCancelSubscription(subscription.id)}>İptal Et</CancelButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubscriptionManagement;
