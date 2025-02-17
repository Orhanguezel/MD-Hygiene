### 🚀 **Geliştirme Planı: Ziyaretçi Ana Sayfası İyileştirmeleri**

Ana hedefimiz modern, şık ve kullanıcı dostu bir ana sayfa oluşturmak. Bunu yaparken **UI/UX**, **veri yönetimi**, ve **performans** odaklı ilerleyeceğiz.

---

## ✅ **1. Genel Yapı ve İyileştirme Planı**

### 🎯 **Amaç:**  
- Modern ve çekici bir ana sayfa (Hero, Kategoriler, Ürünler, Testimonials, Bülten)
- Responsive uyumluluk (Mobil, Tablet, Desktop)
- API veya dummy verilerle stabil veri akışı
- Redux Toolkit ile kolay yönetim

---

## 📊 **2. Planlanan Bileşenler**

1. **Hero Section (Tanıtım Alanı)**
   - Büyük başlık, alt metin, CTA (Call-to-Action) butonu
   - Tam ekran genişliği, ilgi çekici arka plan

2. **Category Section (Kategoriler)**
   - Grid yapısında kategori kartları
   - İkonlar veya görsellerle desteklenen sade tasarım

3. **Product Carousel (Ürün Slaytı)**
   - Yatay kayan ürünler
   - API’den veya dummy verilerden veri çekme

4. **Featured Products (Öne Çıkan Ürünler)**
   - Popüler ürünleri öne çıkarma
   - Basit kart tasarımı + hover efektleri

5. **Testimonials (Müşteri Yorumları)**
   - Slayt şeklinde dönen müşteri yorumları
   - Kullanıcı avatarları ile destekleme

6. **Newsletter (Bülten Aboneliği)**
   - Basit form (E-posta girişi + abone ol butonu)
   - Mailchimp veya dummy işlemle entegrasyon

---

## 🗂️ **3. Dosya Yapısı (pages/visitor/home)**

```
/home
 ├── components
 │   ├── HeroSection.jsx
 │   ├── CategorySection.jsx
 │   ├── ProductCarousel.jsx
 │   ├── FeaturedProducts.jsx
 │   ├── Testimonials.jsx
 │   └── Newsletter.jsx
 ├── styles
 │   ├── HeroSectionStyles.js
 │   ├── CategorySectionStyles.js
 │   ├── ProductCarouselStyles.js
 │   ├── FeaturedProductsStyles.js
 │   ├── TestimonialsStyles.js
 │   └── NewsletterStyles.js
 └── Home.jsx
```

---

## 🗃️ **4. Veri Yönetimi (Redux Toolkit)**

- **productSlice.js**: API’den ürünleri almak
- **categorySlice.js**: Statik veya API tabanlı kategori verisi
- **testimonialSlice.js**: Müşteri yorumları için dummy veriler
- **newsletterSlice.js**: Abonelik işlemleri için basit state yönetimi

---

## 🎨 **5. Stil ve UI İyileştirmeleri**

- **Styled-Components** ile modüler ve kolay stil yönetimi
- Responsive tasarım için **Flexbox ve CSS Grid** kullanımı
- **Hover efektleri** ve **buton animasyonları** ile etkileşim artırma

---

## 🚀 **6. Geliştirme Aşamaları**

1. **Hero Section Düzenlemesi**  
2. **Category Section Tasarımı**  
3. **Product Carousel API Entegrasyonu**  
4. **Featured Products Yapısı**  
5. **Testimonials Slider Düzenlemesi**  
6. **Newsletter Formu ve İşlevsellik**  
7. **Responsive Düzenlemeler (Mobil Uyum)**  
8. **Performans Optimizasyonları**  

---

## 🤝 **Nasıl Devam Edelim?**

- **Önce Hero Section'ı düzenleyelim mi?**  
- Veya istersen **API entegrasyonları** ile başlayabiliriz.  

📢 **Seçimini yap, ona göre başlayalım!** 🚀
### **Home Modülü İncelemesi ve Yapılacaklar**

**📌 Genel Yapı**  
Home modülü, ziyaretçilerin ana sayfada görebileceği bileşenleri içeriyor ve **Redux Store'dan** gelen verileri kullanarak dinamik olarak çalışıyor. Mevcut yapı **kategori bazlı filtreleme, ürün listeleme, favorilere ekleme, sepete ekleme ve dil desteği** gibi özellikleri içeriyor.

---

## **🛠 Mevcut Kodların İncelenmesi**

### **1️⃣ `Home.jsx` (Ana Sayfa)**
- Ana sayfayı oluşturan temel bileşenleri içeriyor:
  - **HeroSection**: Ürünleri slayt olarak gösteriyor.
  - **CategorySection**: Ürünleri kategorilere göre filtreleme işlevi sağlıyor.
  - **ProductCarousel**: Öne çıkan ürünleri listeleyen kaydırılabilir bileşen.
  - **Testimonials**: Müşteri yorumlarını içeriyor.
  - **Newsletter**: Kullanıcıların e-posta aboneliğini sağlıyor.
- **Yapılacaklar:**
  - Redux ile entegre edilmeyen bazı bileşenler hâlâ **axios ile API çağrısı yapıyor.** Bunları **Redux Store'dan** veri alacak şekilde değiştirmeliyiz.
  - **ProductCarousel bileşeni `useState` ile API çağrısı yapıyor.** Bunun yerine Redux'tan verileri çekmeliyiz.

---

### **2️⃣ `HeroSection.jsx` (Ana Sayfa Ürün Slaytı)**
- **Redux Store’dan** gelen ürünleri belirli aralıklarla döndürerek slayt gösterimi yapıyor.
- Mevcut yapı Redux kullanıyor, ancak **otomatik slayt değişimi** için ek bir `useEffect` mevcut.
- **Yapılacaklar:**
  - **Slaytın daha iyi çalışması için ürünlerin sayısını kontrol etmeliyiz.** Eğer ürün sayısı 1 ise kaydırma işlemini engellemeliyiz.
  - **Görselliği daha profesyonel hâle getirmek için slayt geçiş animasyonları eklenebilir.**

---

### **3️⃣ `ProductCarousel.jsx` (Ürün Karusel Bileşeni)**
- **Şu an API çağrısı yapıyor.** Ancak **Redux Store'dan veri çekmelidir.**
- **Favorilere ekleme işlemi `localStorage` ile yapılıyor.** Bu işlem **Redux Store** üzerinden yönetilmelidir.
- **Ürünler filtrelenirken `selectedCategory` kullanılıyor.** Ancak **Redux Store’da kategori bazlı filtreleme özelliği zaten mevcut.**
- **Yapılacaklar:**
  - `fetchProducts` ve `fetchCategories` çağrıları Redux üzerinden yapılmalı.
  - `localStorage` yerine favoriler **Redux Store’a taşınmalı.**
  - Kategori seçildiğinde ürünleri filtrelemek için **Redux'taki `filterByCategory` fonksiyonunu kullanmalıyız.**

---

### **4️⃣ `ProductCard.jsx` (Tekil Ürün Kartı)**
- Kullanıcı ürünü sepete ekleyebilir.
- Sepete ekleme işlemi **Redux Store’a veri göndererek yapılıyor (✅ Doğru yapı).**
- **Yapılacaklar:**
  - Favorilere ekleme işlemi burada da geçerli olabilir. Bunu **Redux Store’a taşımalıyız.**
  - Ürün fiyatı **para birimine göre gösterilebilir (Settings modülüyle entegre edilecek).**

---

### **5️⃣ `Newsletter.jsx` (E-Bülten)**
- Kullanıcıların e-posta aboneliğini yapmasını sağlıyor.
- **Şu an sadece bir `alert()` ile çalışıyor, veriler kaydedilmiyor.**
- **Yapılacaklar:**
  - Kullanıcıların abone oldukları e-postaları kaydetmek için **Redux Store’a veya API’ye gönderim yapılabilir.**
  - Kullanıcının daha önce abone olup olmadığını kontrol eden bir sistem entegre edilebilir.

---

### **6️⃣ `CategorySection.jsx` (Kategori Seçimi)**
- **Şu an API çağrısı yapıyor.** Ancak **Redux Store’dan kategori çekmelidir.**
- **Ürünleri kategorilere göre filtrelemek için kendi içinde `useState` kullanıyor.** Ancak **Redux'taki `filterByCategory` fonksiyonunu kullanmalıyız.**
- **Yapılacaklar:**
  - API çağrıları **Redux Store'dan çekilecek.**
  - **Seçilen kategori Redux Store’a gönderilmeli ve filtreleme burada yapılmalı.**
  - **Kategori listesi değişirse güncellenmeli (örn: yeni kategori eklenirse Redux güncellenmeli).**

---

## **📌 Sonuç ve Yapılacaklar**

| Modül | Mevcut Durum | Yapılacaklar |
|--------|-------------|-------------|
| **Home.jsx** | Redux kullanılıyor, ama bazı bileşenler **API çağrısı yapıyor.** | **Redux Store’a tamamen entegre edilmeli.** |
| **HeroSection.jsx** | Ürünleri slayt olarak döndürüyor, **Redux kullanıyor.** | Slayt **görsel iyileştirme** ve animasyonlarla profesyonelleştirilmeli. |
| **ProductCarousel.jsx** | API çağrısı yapıyor, **Redux kullanılmalı.** | `fetchProducts` ve `fetchCategories` Redux ile çekilecek, **favoriler Redux Store'a alınacak.** |
| **ProductCard.jsx** | Sepete ekleme **Redux ile çalışıyor.** | Favoriler Redux’a taşınacak, **para birimi ayarı eklenecek.** |
| **Newsletter.jsx** | E-postalar **alert ile gösteriliyor.** | **E-postalar Redux veya API’ye kaydedilmeli.** |
| **CategorySection.jsx** | API çağrısı yapıyor, **Redux kullanılmalı.** | **Kategori seçimi Redux’a entegre edilmeli, filtreleme Redux üzerinden yapılmalı.** |

---

## **🛠 Öncelik Sırası**
1️⃣ **ProductCarousel.jsx ve CategorySection.jsx** Redux Store’a entegre edilecek.  
2️⃣ **Favoriler `localStorage` yerine Redux Store’da yönetilecek.**  
3️⃣ **Para birimi ve fiyat gösterimi Settings modülü ile entegre edilecek.**  
4️⃣ **HeroSection slayt sistemi iyileştirilecek.**  
5️⃣ **Newsletter abonelikleri Redux veya API’ye entegre edilecek.**  

---

## **📌 Şimdi Ne Yapıyoruz?**
Şimdi önce **ProductCarousel** ve **CategorySection** Redux Store’a entegre edilecek. **Bunları düzeltmeye başlayalım mı?** 🚀