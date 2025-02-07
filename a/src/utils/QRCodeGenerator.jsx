import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { generateQRCode } from "../api/orderApi";
import { generateQRCodeImage } from "./qrCodeUtils";
import {
  QRCodeContainer,
  QRCodeImage,
  GenerateButton,
} from "../styles/dashboardStyles";

const QRCodeGenerator = ({ orderId }) => {
  const { user } = useContext(AuthContext);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      if (!user?.token) return;
      try {
        const qrData = await generateQRCode(orderId, user.token);
        const qrImage = await generateQRCodeImage(qrData.qrCode);
        setQrCode(qrImage);
      } catch (error) {
        console.error("QR kod oluşturulamadı:", error);
      }
    };

    fetchQRCode();
  }, [user, orderId]);

  return (
    <QRCodeContainer>
      <h4>📌 Sipariş QR Kodu</h4>
      {qrCode ? (
        <QRCodeImage src={qrCode} alt="Sipariş QR Kodu" />
      ) : (
        <p>QR kod oluşturuluyor...</p>
      )}
      <GenerateButton onClick={() => window.print()}>
        QR Kod Yazdır
      </GenerateButton>
    </QRCodeContainer>
  );
};

export default QRCodeGenerator;
