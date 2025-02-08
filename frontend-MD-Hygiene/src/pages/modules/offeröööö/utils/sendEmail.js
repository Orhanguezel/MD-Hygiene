import emailjs from "emailjs-com";

export const sendOfferEmail = (offer, recipientEmail) => {
  const templateParams = {
    to_email: recipientEmail,
    subject: `Yeni Teklif - ${offer.id}`,
    message: `
      Merhaba,

      Aşağıda teklif detaylarını bulabilirsiniz:

      Teklif ID: ${offer.id}
      Müşteri: ${offer.user}
      Toplam Tutar: ${offer.totalAmount} ₺
      Durum: ${offer.status}

      Ürünler:
      ${offer.items.map(item => `- ${item.product}: ${item.quantity} adet (${item.unitPrice} ₺)`).join("\n")}

      Saygılarımızla,
      MD-Hygienelogistik Ekibi
    `
  };

  return emailjs.send("your_service_id", "your_template_id", templateParams, "your_user_id")
    .then(response => {
      console.log("E-posta başarıyla gönderildi!", response.status, response.text);
    })
    .catch(error => {
      console.error("E-posta gönderimi sırasında hata oluştu:", error);
    });
};
