## **MD-Hygiene Projesi - Güncellenmiş Talimatlar**

### **📌 Genel Gereksinimler ve İhtiyaç Analizi**
- Kullanıcı Rolleri: **Admin, Müşteri**
- Ürün Yönetimi, Sipariş Takibi, Stok Durumu
- Ödeme Sistemleri: **Stripe, PayPal** (Şu an pasif, altyapı hazır olacak)
- GDPR ve **Almanya’daki vergi mevzuatına uygun fatura yönetimi** (**Çok önemli!**)

### **📌 Veritabanı Modelleme (MongoDB)**
- **Koleksiyonlar:** Users, Products, Orders, Invoices, Payments
- **İlişkiler:** Kullanıcılar ve siparişler, siparişler ve faturalar
- **Indexleme:** Performans için gerekli indekslemeler uygulanacak

### **📌 UI/UX Tasarım Standartları**
- **Styled Components** kullanılacak (**Başka CSS yöntemi kabul edilmeyecek!**)
- Kullanıcı dostu ve **mobil uyumlu** olacak
- **Admin Paneli ve Müşteri Paneli** ayrı yönetilecek

### **📌 Teknoloji Stack**
- **React.js** (Next.js **kullanılmayacak**)
- **Node.js + Express** (REST API için)
- **MongoDB**
- **Styled Components** (Tek stil yöntemi olarak kullanılacak)
- **Redux Toolkit** (State yönetimi için)

### **📌 RESTful API Geliştirme**
- Kullanıcı Kayıt ve Giriş (**JWT ile güvenli oturum yönetimi**)
- **Ürün Yönetimi API’si (CRUD İşlemleri)**
- **Sipariş ve Fatura Yönetimi API’si**
- **Ödeme Entegrasyonu API’si (Stripe, PayPal)**
- **Admin Paneli API’si**
- **Lojistik ve Kargo Takibi API’si**

### **📌 Ortam Yönetimi ve Dinamik Yapı**
- **Geliştirme ve Üretim Ortamları Ayrılacak**
- **`.env` dosyaları ortama göre dinamik yüklenmeli**
- **Dosya Yapısı:**
  ```
  /backend-MD-Hygiene/
    ├── .env                  # Ortak değişkenler (isteğe bağlı)
    ├── .env.development      # Development için özel değişkenler
    ├── .env.production       # Production için özel değişkenler

  /frontend-MD-Hygiene/
    ├── .env                  # Ortak değişkenler (isteğe bağlı)
    ├── .env.development      # Development için özel değişkenler
    ├── .env.production       # Production için özel değişkenler
  ```

### **📌 Test ve Performans Gereksinimleri**
✅ **Unit ve Integration Testler:** Jest + Mocha/Chai
✅ **Performans Artırımı:** Redis Cache, Lazy Loading, MongoDB Indexleme
✅ **Güvenlik Önlemleri:** JWT Refresh Token, CORS, Rate Limiting, XSS Koruma

### **📌 CI/CD, Deployment ve Sunucu Yapılandırması**
✅ **CI/CD Pipeline:** GitHub Actions veya Jenkins
✅ **Deployment:**
- **Backend:** PM2 + Reverse Proxy (NGINX)
- **Frontend:** Vercel
✅ **Loglama ve İzleme:** Winston, Prometheus, Grafana

### **📌 Güncellenen ve Kaldırılan Talimatlar**
❌ **Docker kaldırıldı, artık kullanılmayacak.**
❌ **Next.js kullanılmayacak.**
❌ **Başka CSS yöntemi kabul edilmeyecek, sadece Styled Components.**
✅ **MongoDB bağlantıları sadece `mongosh` ile yapılacak.**
✅ **Tüm ortamlar için `.env` dosyaları dinamik olarak yüklenmeli.**

---

### **📌 Sonuç ve Yönlendirme**
Bu doküman, **projenin gelişim sürecinde sürekli güncellenecek** bir temel rehberdir.
Gerekli değişiklikler ve eklemeler için **önce bu dosyaya bakılmalı, ardından düzenleme yapılmalıdır.**

