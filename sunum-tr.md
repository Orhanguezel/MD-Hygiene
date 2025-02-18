# **MD-Hygiene – E-Ticaret ve Teklif Yönetim Sistemi Sunumu**

## **📌 1. Giriş (Hoş Geldiniz ve Proje Tanıtımı – 1 Dakika)**
Merhaba ve hoş geldiniz! Bugün sizlere **MD-Hygiene** adlı projemizi tanıtacağım.
Bu proje, **bireysel ve kurumsal müşteriler için geliştirilmiş modern bir e-ticaret ve teklif yönetim sistemidir.**
Hem **bireysel kullanıcılar hem de firmalar**, ürünleri inceleyebilir, sepetlerine ekleyebilir, sipariş oluşturabilir ve siparişlerinin takibini yapabilir.
Adminler ise **siparişleri yönetebilir, faturaları oluşturabilir, ürün stoklarını kontrol edebilir ve teklif oluşturabilir.**

Proje, **React + Vite** kullanılarak geliştirildi ve **Redux Toolkit** ile global state yönetimi sağlandı.
Ayrıca **JSON Server** kullanılarak veri yönetimi yapıldı ve sistem, **canlıya alındığında gerçek API ile entegre edilebilir** bir altyapıya sahiptir.

---

## **📌 2. Müşterinin Alışveriş Süreci (3 Dakika)**
Şimdi, **müşterinin e-ticaret sitesinde nasıl bir deneyim yaşadığını** adım adım gözden geçirelim.

### **1️⃣ Ana Sayfa (Home Page)**
- Ana sayfada **öne çıkan ürünler ve kategoriler** bulunmaktadır.
- Kullanıcılar **ürünleri inceleyebilir, favorilere ekleyebilir ve sepete ekleyebilir.**
- Kategorilere tıklayarak **ilgili ürünleri filtreleyebilir.**
- Kullanıcı **ürün detaylarına** tıklayarak daha fazla bilgiye ulaşabilir.

### **2️⃣ Sepet Yönetimi (Cart)**
- Kullanıcı **sepete eklediği ürünleri görebilir.**
- **Vergiler ve kargo ücretleri otomatik hesaplanır.**
- **Ürün adedi artırılıp azaltılabilir.**
- Kullanıcı ödeme yapmadan önce toplam tutarı görebilir.
- **“Ödeme Yap” butonuna basarak sipariş sürecini başlatabilir.**

### **3️⃣ Sipariş Oluşturma (Checkout)**
- Kullanıcı, ödeme bilgilerini ve adresini girerek **sipariş oluşturur.**
- Sipariş **Redux Store’a ve veritabanına kaydedilir.**
- Kullanıcı, oluşturduğu siparişi **sipariş geçmişinde görüntüleyebilir.**

---

## **📌 3. Admin Paneli ve Sipariş Yönetimi (3 Dakika)**
Şimdi **adminin sistem üzerindeki rolünü** ele alalım.

### **📦 Sipariş Yönetimi**
Admin, **siparişleri listeleyebilir ve durumlarını değiştirebilir.**
📦 **Sipariş Durumları:**
1. **Pending** → Sipariş alındı ama işlenmedi.
2. **Processing** → Sipariş onaylandı ve hazırlanıyor.
3. **Shipped** → Sipariş kargoya verildi, fatura oluşturuldu.
4. **Delivered** → Sipariş teslim edildi.
5. **Archived** → Sipariş geçmişe taşındı.

Her sipariş durumu değiştiğinde, **kullanıcıya otomatik bildirim gönderilmektedir.**

### **📜 Fatura Yönetimi**
- Sipariş "shipped" durumuna geldiğinde **otomatik fatura oluşturulur.**
- Kullanıcı ve admin, **faturayı PDF olarak indirebilir.**
- **Faturalar, Almanya yasalarına uygun şekilde KDV hesaplanarak oluşturulur.**
- **Firma bilgileri ve banka bilgileri dinamik olarak güncellenebilir.**

---

## **📌 4. Teklif (Angebot) Yönetimi (2 Dakika)**
Bu sistemde sadece e-ticaret değil, **B2B müşterilere özel teklif hazırlama süreci de bulunmaktadır.**

- **Admin, firma bazlı teklifler oluşturabilir.**
- Ürün seçerek, **özel fiyatlar ve vergiler belirleyebilir.**
- **Teklif PDF formatında oluşturulup e-posta ile gönderilebilir.**
- Teklifler **"Gönderildi", "Beklemede", "Onaylandı", "Reddedildi"** gibi durumlarla takip edilebilir.

Bu sayede, **kurumsal müşterilere daha iyi bir teklif yönetimi sunulmuş olur.**

---

## **📌 5. Kullanılan Teknolojiler (1 Dakika)**
Projede **modern ve optimize bir yapı** oluşturabilmek için aşağıdaki teknolojiler kullanıldı:
- **React + Vite** – Hızlı frontend geliştirme
- **Redux Toolkit** – Global state yönetimi
- **JSON Server** – Geliştirme ortamında API
- **RTK Query & Axios** – API yönetimi
- **Styled Components** – UI yönetimi
- **Framer Motion** – Animasyonlar
- **Toastify** – Kullanıcı bildirimleri

Bu sayede, **hızlı, modern ve ölçeklenebilir bir sistem tasarlandı.**

---

## **📌 6. Gelecek Geliştirmeler (1 Dakika)**
Peki, sistemde bundan sonra hangi geliştirmeler planlanıyor?

✅ **Stok Yönetimi** – Ürün stok takibi yapılabilecek.  
✅ **Satış Analizleri ve Raporlar** – Satış istatistikleri admin panelinde yer alacak.  
✅ **Bildirim Sistemi & Sistem Logları** – Kullanıcı ve admin için bildirim ve log kaydı tutulacak.  
✅ **Daha gelişmiş teklif modülü** – Ödeme entegrasyonu ile tekliflerin tam yönetimi sağlanacak.  

Bunlar tamamlandığında, **sistem çok daha güçlü ve kurumsal bir yapı kazanmış olacak.**

---

## **📌 7. Sonuç ve Kapanış (1 Dakika)**
🚀 **MD-Hygiene, bireysel ve kurumsal müşteriler için geliştirilmiş, tam fonksiyonel bir e-ticaret ve teklif yönetim sistemidir.**

✅ **Siparişler, teklifler ve faturalar eksiksiz şekilde yönetilebilir.**
✅ **Tamamen dinamik ve yönetici panelinden esnek şekilde düzenlenebilir bir sistem oluşturulmuştur.**

🔜 **Sonraki adım: Stok ve bildirim modüllerinin entegrasyonu!**

Teşekkür ederim, sorularınız varsa şimdi yanıtlamaya hazırım! 🎤

