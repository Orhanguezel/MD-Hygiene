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


Ana sayfa üzerinde şu şekilde bir yol haritası izleyebiliriz:

### 1️⃣ **Kategoriler ve Ürün Listeleme:**
- Kategorilere tıklandığında ilgili ürünler listelenecek.
- API'den gelen kategorilerle dinamik listeleme yapılacak.
- Her ürün kartında "Sepete Ekle" butonu yer alacak.

### 2️⃣ **Carousel (Sağ-Sol Düğmeleri):**
- Sağ-sol gezinme düğmelerini işlevsel hale getireceğiz.
- Responsive olarak düzgün çalışması sağlanacak.

### 3️⃣ **Sepet ve Satın Alma Süreci:**
- "Sepete Ekle" butonuna basıldığında ürün sepete eklenecek.
- Sepete gitmek için bir buton veya ikon eklenecek.
- Satın alma işlemi için kullanıcı girişi zorunlu olacak.

### 4️⃣ **Üyelik Zorunluluğu:**
- Sepete eklenen ürünler için ödeme adımında kullanıcı giriş kontrolü yapılacak.
- Giriş yapılmadıysa Login/Register ekranına yönlendirme yapılacak.

İlk adım olarak, **kategorilere tıklayınca ürün listeleme** özelliğini geliştirmeye devam edelim mi?