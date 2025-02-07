import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { verifyQRCode } from "../api/orderApi";
import QrScanner from "react-qr-scanner";
import {
  ScannerContainer,
  ScanResult,
  ScanButton,
} from "../styles/dashboardStyles";

const QRCodeScanner = ({ orderId }) => {
  const { user } = useContext(AuthContext);
  const [scanResult, setScanResult] = useState("");

  const handleScan = async (data) => {
    if (data) {
      try {
        const result = await verifyQRCode(orderId, data.text, user.token);
        setScanResult(result.message);
      } catch (error) {
        console.error("QR kod doğrulama hatası:", error);
        setScanResult("QR kod geçersiz!");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR tarama hatası:", err);
  };

  return (
    <ScannerContainer>
      <h4>📸 QR Kod Tarayıcı</h4>
      <QrScanner delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
      <ScanResult>{scanResult}</ScanResult>
      <ScanButton onClick={() => setScanResult("")}>Tekrar Tara</ScanButton>
    </ScannerContainer>
  );
};

export default QRCodeScanner;
