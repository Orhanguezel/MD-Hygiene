import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateAddress } from "@/features/users/userSlice";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { Section, AddressCard, Button, AddressDetails } from "../styles/profileStyles";

const AddressInfo = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  // ✅ Adres bilgisini kontrol et, yoksa varsayılan bir nesne ata
  const defaultAddress = user?.addresses?.find(addr => addr.isDefault) || {};
  const [address, setAddress] = useState(defaultAddress.street || "");

  const handleSave = () => {
    if (user?.id) {
      dispatch(updateAddress({ userId: user.id, address }));
      setIsEditing(false);
    }
  };

  return (
    <Section theme={theme}>
      <h2>{texts?.profile?.address || "Adres Bilgileri"}</h2>
      <AddressCard theme={theme}>
        {Object.keys(defaultAddress).length > 0 ? (
          <AddressDetails>
            <p><strong>{texts?.profile?.street || "Sokak"}:</strong> {defaultAddress.street || "-"}</p>
            <p><strong>{texts?.profile?.city || "Şehir"}:</strong> {defaultAddress.city || "-"}</p>
            <p><strong>{texts?.profile?.postalCode || "Posta Kodu"}:</strong> {defaultAddress.postalCode || "-"}</p>
            <p><strong>{texts?.profile?.country || "Ülke"}:</strong> {defaultAddress.country || "-"}</p>
          </AddressDetails>
        ) : (
          <p>{texts?.profile?.noAddress || "Adres bilgisi bulunamadı."}</p>
        )}

        {isEditing ? (
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={texts?.profile?.enterAddress || "Adresinizi girin"}
            />
            <Button theme={theme} onClick={handleSave}>{texts?.profile?.save || "Kaydet"} ✅</Button>
          </div>
        ) : (
          <Button theme={theme} onClick={() => setIsEditing(true)}>{texts?.profile?.editAddress || "Düzenle"} ✏️</Button>
        )}
      </AddressCard>
    </Section>
  );
};

export default AddressInfo;
