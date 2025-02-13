import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateAddress } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage"; // ✅ Dil Desteği
import { useTheme } from "@/features/theme/useTheme"; // ✅ Tema Desteği
import { Section, AddressCard, Button, AddressDetails } from "../styles/profileStyles";

const AddressInfo = () => {
  const { texts } = useLanguage();  // ✅ Dil dosyasından çeviri al
  const { theme } = useTheme();  // ✅ Tema kontrolü
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user.address || ""); // ✅ Varsayılan adres kontrolü
  const defaultAddress = user.addresses?.find(addr => addr.isDefault); // ✅ Kullanıcının varsayılan adresini al

  const handleSave = () => {
    dispatch(updateAddress({ userId: user.id, address }));
    setIsEditing(false);
  };

  return (
    <Section theme={theme}>
      <h2>{texts.profile.address}</h2>
      <AddressCard theme={theme}>
        {defaultAddress ? (
          <AddressDetails>
            <p><strong>{texts.profile.street}:</strong> {defaultAddress.street}</p>
            <p><strong>{texts.profile.city}:</strong> {defaultAddress.city}</p>
            <p><strong>{texts.profile.postalCode}:</strong> {defaultAddress.postalCode}</p>
            <p><strong>{texts.profile.country}:</strong> {defaultAddress.country}</p>
          </AddressDetails>
        ) : (
          <p>{address || texts.profile.noAddress}</p>
        )}

        {isEditing ? (
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={texts.profile.enterAddress}
            />
            <Button theme={theme} onClick={handleSave}>{texts.profile.save} ✅</Button>
          </div>
        ) : (
          <Button theme={theme} onClick={() => setIsEditing(true)}>{texts.profile.editAddress} ✏️</Button>
        )}
      </AddressCard>
    </Section>
  );
};

export default AddressInfo;
