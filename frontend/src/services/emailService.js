import API from "@/services/api"; // E-posta servisini backend'e bağlamak için API çağrısı yapıyoruz

export const sendOrderConfirmationEmail = async (order) => {
  try {
    const emailData = {
      to: order.userEmail,
      subject: "✅ Sipariş Onayı - MD Hygienelogistik",
      body: `
        <h2>Siparişiniz Onaylandı</h2>
        <p>Merhaba ${order.userName},</p>
        <p>Siparişiniz başarıyla alınmıştır. Sipariş detaylarınız aşağıdaki gibidir:</p>
        <ul>
          <li><strong>Sipariş Numarası:</strong> ${order.id}</li>
          <li><strong>Sipariş Tarihi:</strong> ${new Date(order.date).toLocaleDateString()}</li>
          <li><strong>Toplam Tutar:</strong> ${order.totalAmount}€</li>
        </ul>
        <p>Sipariş durumunu kontrol etmek için <a href="https://md-hygienelogistik.de/orders">buraya tıklayın</a>.</p>
        <p>Teşekkürler, <br/> MD Hygienelogistik Ekibi</p>
      `
    };

    // 📌 Backend'e API isteği ile e-posta gönder
    await API.post("/send-email", emailData);
    console.log("📩 Sipariş onay e-postası başarıyla gönderildi!");
  } catch (error) {
    console.error("🚨 E-posta gönderilirken hata oluştu!", error);
  }
};
