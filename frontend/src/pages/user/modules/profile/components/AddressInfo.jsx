import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateAddress } from "@/features/users/userSlice";
import { Section, AddressCard, Button, AddressDetails } from "../styles/profileStyles";

const AddressInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user.address || ""); // ✅ İlk olarak basit adresi kontrol et
  const defaultAddress = user.addresses?.find(addr => addr.isDefault); // ✅ Varsayılan adresi al

  const handleSave = () => {
    dispatch(updateAddress({ userId: user.id, address }));
    setIsEditing(false);
  };

  return (
    <Section>
      <h2>📍 Adres Bilgisi</h2>
      <AddressCard>
        {defaultAddress ? (
          <AddressDetails>
            <p><strong>Sokak:</strong> {defaultAddress.street}</p>
            <p><strong>Şehir:</strong> {defaultAddress.city}</p>
            <p><strong>Posta Kodu:</strong> {defaultAddress.postalCode}</p>
            <p><strong>Ülke:</strong> {defaultAddress.country}</p>
          </AddressDetails>
        ) : (
          <p>{address || "Adres bilgisi bulunmamaktadır."}</p>
        )}

        {isEditing ? (
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adres bilgisi girin"
            />
            <Button onClick={handleSave}>Kaydet ✅</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Adres Düzenle ✏️</Button>
        )}
      </AddressCard>
    </Section>
  );
};

export default AddressInfo;
