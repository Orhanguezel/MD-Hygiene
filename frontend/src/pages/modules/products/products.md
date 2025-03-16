### **📘 Güncellenmiş Ürün Modülü Dokümantasyonu**

Bu dokümantasyon, **Ürün Yönetim Modülü** ile ilgili tüm detayları içerir. Modül, **ürünlerin yönetilmesi, stok takibi, kategori bazlı filtreleme ve ürün güncellemeleri** gibi işlemleri kapsar.  

---

## **🚀 Modül Özellikleri**

### **1️⃣ Ürün Listesi (`ProductList.jsx`)**
✅ **Tüm ürünleri listeleme**  
✅ **Kategori bazında filtreleme**  
✅ **Ürünlere ait detayları görüntüleme**  
✅ **Ürünleri silme**  
✅ **Ürün fiyat ve stok bilgisini güncelleme (resme tıklayarak)**  
✅ **Kategori butonları ile dinamik filtreleme**  

---

### **2️⃣ Ürün Ekleme (`ProductForm.jsx`)**
✅ **Yeni ürün ekleme**  
✅ **Ürün ismi, fiyatı, stoğu ve resmini girme**  
✅ **Kategori seçimi yaparak ürün ekleme**  
✅ **Kategorilerin otomatik yüklenmesi**  
✅ **Çoklu resim yükleme desteği (Maksimum 5 resim)**  
✅ **Karanlık ve açık tema desteği**  
✅ **Eksik alanları kontrol etme ve hata mesajları gösterme**  

---

### **3️⃣ Stok ve Fiyat Yönetimi (`ManageStock.jsx`)**
✅ **Tüm ürünlerin stok ve fiyatlarını listeleme**  
✅ **Ürün stok ve fiyatlarını düzenleme**  
✅ **Güncellenen bilgilerin anında kaydedilmesi**  
✅ **Başarılı işlem sonrası kullanıcıya geri bildirim verme**  
✅ **Redux Store ile anlık güncellenme**  

---

### **4️⃣ Ürün Paneli - Sidebar (`ProductSidebar.jsx`)**
✅ **Ürün yönetimi için sabit yan panel**  
✅ **Sayfalar arası geçiş için butonlar**  
✅ **Mevcut sekmeye göre buton aktifliği**  
✅ **Tamamen tema destekli (koyu/açık mod uyumlu)**  

---

### **5️⃣ Redux Toolkit ile Entegre Ürün Yönetimi (`productSlice.js`)**
✅ **Ürünleri API’den çekme**  
✅ **Ürün ekleme, silme ve güncelleme**  
✅ **Fiyat ve stok yönetimi**  
✅ **Kategori bazlı filtreleme**  
✅ **Çoklu resim yükleme desteği**  
✅ **Hata ve yükleme durumları için state yönetimi**  
✅ **Redux Store ile tüm bileşenlerin senkronize olması**  

---

## **🔗 API Kullanımı**
Tüm ürün işlemleri, **Node.js + Express + MongoDB** altyapısıyla sağlanan API üzerinden gerçekleştirilmektedir.  

📌 **Mevcut API endpoint'leri:**  

| İşlem | Yöntem | URL |
|--------|--------|------|
| Ürünleri Getir | `GET` | `/api/products` |
| Ürün Ekle | `POST` | `/api/products` |
| Ürün Güncelle | `PUT` | `/api/products/:id` |
| Ürün Sil | `DELETE` | `/api/products/:id` |
| Kategorileri Getir | `GET` | `/api/categories` |
| Yeni Kategori Ekle | `POST` | `/api/categories` |
| Kategori Güncelle | `PUT` | `/api/categories/:id` |
| Kategori Sil | `DELETE` | `/api/categories/:id` |

---

## **🖼️ Resim Yönetimi**
✔ **Ürün resimleri `/uploads/products/` klasörüne kaydedilir.**  
✔ **Maksimum 5 resim yüklenebilir.**  
✔ **Kategori resimleri `/uploads/categories/` klasörüne kaydedilir.**  
✔ **Backend URL’leri ile resimlerin doğru gösterilmesi sağlanır.**  

---

## **🎨 Tema ve Stil Yönetimi**
✅ **Tüm bileşenler tema uyumlu hale getirildi.**  
✅ **Karanlık ve açık mod desteği sağlandı.**  
✅ **Sidebar, butonlar ve formlar tamamen uyumlu hale getirildi.**  
✅ **Kategori ve filtreleme butonları hover efektiyle güçlendirildi.**  

---

## **📌 Yapılacaklar Listesi**
🔲 **Ürün Detay Sayfası:**  
Bir ürüne tıkladığında detaylarının gösterileceği ayrı bir sayfa oluşturulacak.  

🔲 **Kategori Yönetimi:**  
Yeni kategori ekleme, düzenleme ve silme işlemleri için bir arayüz eklenecek.  

🔲 **Gelişmiş Arama & Filtreleme:**  
Ürün adı, fiyat aralığı ve stok durumuna göre arama seçenekleri eklenecek.  

🔲 **Teklif Modülü ile Entegrasyon:**  
Teklif oluştururken, ürünlerin teklif modülüne eklenmesi sağlanacak.  

---
