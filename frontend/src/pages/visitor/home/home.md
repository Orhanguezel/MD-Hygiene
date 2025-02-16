### **🏠 Home Modülü Özeti ve Kabiliyetleri**  

Home modülü, ziyaretçilerin mağazayı keşfetmesini, ürünleri görüntülemesini ve alışveriş yapmasını sağlayan **ana giriş noktasıdır**. **Tamamen dinamik**, **çok dilli**, **redux ile entegre edilmiş** ve **responsive** bir yapıya sahiptir.  

---

## **📌 Home Modülünün Ana Kabiliyetleri**
### **1️⃣ Hero Section (Ana Banner)**
- 🔄 **Otomatik geçişli ürün slaytı** (4 saniyede bir değişir).
- 📸 Ürün resmi, başlığı, açıklaması ve fiyatı gösterilir.
- ◀▶ **Navigasyon butonları** ile manuel slayt değişimi.
- 📱 **Mobilde ürün bilgisi aşağıda, slayt yukarıda olacak şekilde dizilim**.

---

### **2️⃣ Kategori Bölümü**
- ✅ **API’den gelen tüm kategoriler** listelenir.
- 🎯 **Kategoriye tıklandığında ilgili ürünler filtrelenir**.
- 🔥 **Seçilen kategori aktif görünür** (hover ve aktif stil desteği var).
- 📱 **Mobil uyumlu** (kategoriler kaydırılabilir halde).

---

### **3️⃣ Öne Çıkan Ürünler (Product Carousel)**
- 🔄 **Otomatik kayan ürün listesi**.
- ✅ Redux store’dan gelen ürünleri filtreleyerek gösterir.
- 🛒 **Sepete ekleme ve "Hemen Satın Al" butonları** ile hızlı alışveriş imkanı.
- ❤️ **Favorilere ekleme ve kaldırma desteği**.
- 📱 **Mobilde yatay kaydırma ile ürün listesi**.

---

### **4️⃣ Ürün Kartı (Product Card)**
- 📷 **Ürün resmi, başlığı ve fiyatı gösterilir**.
- 🛒 **Sepete ekleme** (Başarı durumunda toast bildirimi).
- 🏷️ **"Hemen Satın Al" butonu ile doğrudan ödeme sayfasına yönlendirme**.
- 🌟 **Favorilere ekleme / kaldırma**.
- 📱 **Mobil uyumlu, duyarlı tasarım**.

---

### **5️⃣ Ürün Detay Sayfası (Product Detail)**
- 🖼️ **Birden fazla ürün resmi arasında geçiş yapma (Thumbnail desteği)**.
- 📌 **Ürün başlığı, fiyatı, stok durumu ve açıklaması gösterilir**.
- 🛒 **Sepete ekleme ve favorilere ekleme** işlemleri yapılabilir.
- 🔙 **Geri dön butonu** ile önceki sayfaya dönüş.
- 📱 **Tam mobil uyumluluk**.

---

### **6️⃣ Müşteri Yorumları (Testimonials)**
- 🌟 **Mevcut müşteri yorumlarını listeler**.
- 📝 **Sadece giriş yapan kullanıcılar yorum yapabilir**.
- ❌ **Admin, yorumları silebilir**.
- ✅ **Redux store üzerinden yorumlar dinamik olarak yönetilir**.
- 📱 **Mobil uyumlu, duyarlı tasarım**.

---

### **7️⃣ Bülten Aboneliği (Newsletter)**
- 📩 **Kullanıcılar e-posta adreslerini girerek bültene abone olabilir**.
- ✅ **Başarılı abonelik durumunda teşekkür mesajı gösterilir**.
- 🔴 **Hatalı e-posta girildiğinde uyarı verir**.
- 📱 **Tam mobil desteği ile ekran uyumlu**.

---

### **8️⃣ Çok Dilli Destek (Türkçe, İngilizce, Almanca)**
- 🏳️ **Kullanıcıların dil tercihi Redux store üzerinden yönetilir**.
- 📝 **Home modülündeki tüm metinler dinamik olarak dilden bağımsızdır**.
- ✅ **Her dil için eksiksiz JSON desteği**.

---

### **📌 Genel Teknik Özellikler**
✔ **Redux Toolkit ile global state yönetimi**  
✔ **Styled-components ile tema desteği (light/dark)**  
✔ **React Router kullanarak yönlendirme (Sayfa içi & dışı)**  
✔ **Toastify ile bildirim desteği**  
✔ **Tamamen duyarlı (mobile-first) tasarım**  
✔ **Framer Motion ile animasyon desteği**  

---

### **🎯 Sonuç:**
✅ **Home modülü**, **ziyaretçilere en iyi alışveriş deneyimini sunmak için tasarlandı**.  
🔹 **Kategoriler, ürün listesi, öne çıkan ürünler, müşteri yorumları ve bülten aboneliği** ile **dinamik ve etkileşimli** bir yapıya sahip.  
🔹 **Redux ile tamamen merkezi bir veri yönetimi var**, böylece **sepet, favoriler, dil yönetimi ve kullanıcı bilgileri** dinamik olarak yönetilebiliyor.  
🔹 **Tam responsive**, **çok dilli** ve **gelişmiş tema desteği** ile modern bir e-ticaret giriş sayfası oluşturuldu. 🚀