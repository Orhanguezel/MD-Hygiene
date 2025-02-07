import QRCode from "qrcode";

export const generateQRCodeImage = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error("QR kod oluşturulamadı:", err);
    return null;
  }
};
