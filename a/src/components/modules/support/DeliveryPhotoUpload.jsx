import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { uploadDeliveryPhoto } from "../../api/orderApi";
import {
  UploadContainer,
  FileInput,
  UploadButton,
} from "../../styles/dashboardStyles";

const DeliveryPhotoUpload = ({ orderId }) => {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = async () => {
    if (!photo) return;
    try {
      await uploadDeliveryPhoto(orderId, photo, user.token);
      alert("Fotoğraf başarıyla yüklendi!");
      setPhoto(null);
    } catch (error) {
      console.error("Fotoğraf yüklenemedi:", error);
    }
  };

  return (
    <UploadContainer>
      <h4>📷 Teslimat Fotoğrafı Yükle</h4>
      <FileInput type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <UploadButton onClick={handlePhotoUpload}>Yükle</UploadButton>
    </UploadContainer>
  );
};

export default DeliveryPhotoUpload;
