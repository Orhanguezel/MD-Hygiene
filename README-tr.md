# **MD-Hygiene – E-Ticaret ve Teklif Yönetim Sistemi**

## 🚀 **Proje Açıklaması**
MD-Hygiene, bireysel müşteriler ve kurumsal firmalar için **toplu mal satışı** gerçekleştiren bir **e-ticaret ve teklif yönetim sistemi**dir. Bu platform, **ürün yönetimi, sipariş oluşturma, teklif hazırlama ve fatura işlemleri** gibi geniş kapsamlı ticari süreçleri kapsar.

Bu proje **React + Vite** kullanılarak geliştirilmiş olup, **Redux Toolkit** ile **global state yönetimi** sağlanmaktadır. Geliştirme sürecinde **JSON Server** kullanılarak veri yönetimi yapılmış ve canlıya alındığında **API entegrasyonu** ile genişletilebilir yapı oluşturulmuştur.

---

## 🌍 **Canlı Demo ve Kullanıcı Türleri**
🔗 **Canlı Demo:** *(Henüz bir canlı adres belirtilmedi.)*  
🖼️ **Demo Görselleri:** *(Proje ekran görüntüleri burada paylaşılabilir.)*

Projede **üç farklı kullanıcı türü** bulunmaktadır:

1️⃣ **Misafir Kullanıcı** – Ürünleri inceleyebilir, sepete ekleyebilir ancak satın alma yapamaz.  
2️⃣ **Üye Kullanıcı** – Sipariş oluşturabilir, siparişlerini takip edebilir ve faturalarını görüntüleyebilir.  
3️⃣ **Admin** – Ürün, sipariş ve kullanıcı yönetimi gibi geniş yetkilere sahiptir.  

Tüm kullanıcı tipleri, **yetkilendirme mekanizması ile korunmaktadır** ve **roller bazında farklı erişim seviyeleri** sunmaktadır.

---

## ⚙️ **Özellikler**
### 🛒 **Müşteri İşlemleri**
✔️ Ürünleri **beğenme, sepete ekleme ve satın alma**  
✔️ **Sipariş oluşturma ve sipariş takibi yapma**  
✔️ **Bildirim alma** (Toastify ile)  
✔️ **Sipariş geçmişi ve fatura görüntüleme**  
✔️ **Faturaları PDF olarak indirme**  

### 🏢 **Admin Paneli İşlemleri**
✔️ **Siparişleri yönetme ve durum değiştirme**  
✔️ **Sipariş kargoya verildiğinde otomatik fatura oluşturma**  
✔️ **Ürün ekleme, stok takibi ve fiyat belirleme**  
✔️ **Kullanıcıları pasif etme, aktif etme ve yetkilendirme**  

### 📑 **Teklif (Angebot) Yönetimi**
✔️ **Firmalara özel teklif oluşturma**  
✔️ **Vergi, fiyat ve kargo hesaplamaları**  
✔️ **PDF formatında teklif oluşturma ve e-posta ile gönderme**  
✔️ **Tekliflerin durum takibi (Gönderildi, Beklemede, Onaylandı, Reddedildi)**  

### 📜 **Fatura Yönetimi**
✔️ **Otomatik fatura oluşturma**  
✔️ **Vergi hesaplamalarının Almanya yasalarına uygun yapılması**  
✔️ **Faturaları PDF formatında indirme ve paylaşma**  
✔️ **Şirket bilgilerini düzenleme**  

---

## 🔧 **Kullanılan Teknolojiler**
### 📌 **Frontend**
- **React.js + Vite** – Modern frontend geliştirme
- **Redux Toolkit** – Global state yönetimi
- **React Router** – Sayfa yönlendirmeleri
- **Styled Components** – Tema ve UI yönetimi
- **Framer Motion** – UI animasyonları
- **Toastify** – Kullanıcı bildirimleri

### 📌 **Backend**
- **JSON Server** – Geliştirme sürecinde API yönetimi için
- **Gerçek API Entegrasyonu** – Proje canlıya alındığında gerçek API bağlantıları sağlanabilir

### 📌 **Veri Yönetimi**
- **RTK Query & Axios** – API çağrıları için
- **Redux Persist** – Kullanıcı verilerinin kalıcı olması için

---

## 🛠 **Projeyi Çalıştırma**
### 📥 **Bağımlılıkları Yükleme**
```sh
npm install
```

### 🚀 **Geliştirme Ortamında Başlatma**
```sh
npm run dev
```

### 📦 **JSON Server (Geliştirme için API başlatma)**
```sh
npm install -g json-server
json-server --watch data.json --port 5000
```
**Not:** JSON Server, `data.json` dosyasından veri çekmektedir ve API isteklerini simüle etmektedir.

---

## 🔄 **Projeye Katkı Sağlama**
Projeye katkıda bulunmak isterseniz aşağıdaki adımları takip edebilirsiniz:

1. **Bu repoyu fork'layın**  
2. **Yeni bir branch oluşturun** (`feature/yeniozellik`)  
3. **Değişikliklerinizi yapın ve commitleyin** (`git commit -m 'Yeni özellik eklendi'`)  
4. **Branch'i gönderin** (`git push origin feature/yeniozellik`)  
5. **Pull Request (PR) açın**  

---

## 📩 **İletişim**
Eğer herhangi bir sorunuz varsa veya geri bildirimde bulunmak isterseniz, benimle iletişime geçebilirsiniz. 😊

