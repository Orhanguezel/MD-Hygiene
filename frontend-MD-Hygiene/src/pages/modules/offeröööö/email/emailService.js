import axios from "axios";

export const sendOfferEmail = async (recipient, subject, message, attachment) => {
  try {
    const response = await axios.post("/api/send-offer-email", {
      recipient,
      subject,
      message,
      attachment,  // PDF dosyası buradan gönderilir
    });

    return response.data;
  } catch (error) {
    console.error("E-posta gönderimi başarısız:", error);
    throw error;
  }
};
