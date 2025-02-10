Anladım, **Teklif Yönetimi** sayfasını daha kapsamlı ve işlevsel hale getirmek için aşağıdaki modülleri ekleyebiliriz. Bu sayfadan tüm tekliflerle ilgili işlemleri tek bir yerden kolayca yönetebileceksin. 🚀

---

### ✅ **Yeni Tasarım Planı: Teklif Yönetim Paneli**

#### 🗂️ **1. Sayfa Yapısı**

- **Sol Menü (Sidebar):**
  - **Teklif Listesi (Offers List)**
  - **Yeni Teklif Oluştur (Create Offer)**
  - **PDF Görüntüle (View PDF)**
  - **Ürün Ekle (Add Product)**
  - **Nakliye Ücreti Belirle (Set Shipping Cost)**
  - **Ayarlar (Settings)**

- **Sağ Panel (Ana İçerik Alanı):**
  - Seçilen işleme göre dinamik içerik değişecek.

---

#### 📋 **2. Sayfa Düzeni (Layout)**

- **Header:** "Teklif Yönetimi" başlığı
- **Sidebar (Solda Menü):** Navigasyon
- **Main Content (Sağda İçerik):** Dinamik modüller

---

#### 🚀 **3. Fonksiyonlar**

- 🔍 **Teklif Listeleme (Offers List)**
  - Onayla, Reddet, Düzenle, Sil
  - Filtreleme ve sıralama özellikleri

- ➕ **Yeni Teklif Oluşturma (Create Offer)**
  - Müşteri bilgileri girme
  - Ürün seçme ve ekleme
  - KDV ve nakliye ücretini belirleme

- 📄 **PDF Oluşturma (Generate PDF)**
  - Teklif önizleme ve PDF formatında dışa aktarım
  - Logo ve firma bilgileri ekleme

- ✏️ **Teklif Düzenleme (Edit Offer)**
  - Mevcut teklif üzerinde değişiklik yapabilme

- 📦 **Ürün Ekleme (Add Product)**
  - Yeni ürünler ekleme ve mevcut ürünleri yönetme

- 🚚 **Nakliye Ücreti Belirleme (Set Shipping Cost)**
  - Farklı bölgeler için nakliye ücretleri belirleme

---

### 💻 **4. Örnek Dosya Yapısı**

```
/src/pages/modules/offer
├── components
│   ├── OfferList.jsx
│   ├── OfferCreate.jsx
│   ├── OfferEdit.jsx
│   ├── OfferPDF.jsx
│   ├── AddProduct.jsx
│   ├── SetShippingCost.jsx
│   └── OfferSidebar.jsx
├── styles
│   └── offerStyles.js
├── utils
│   ├── pdfGenerator.js
│   └── sendEmail.js
└── Offer.jsx
```

---

### 🎯 **5. İlk Adım: Sidebar ve Ana Sayfa Düzeni**

Önce bir sidebar oluşturup sayfa yapısını kuracağım. Sonrasında diğer modülleri adım adım ekleriz.

Hazırsan başlayalım. 🚀




### ✅ **Mevcut Teklif Modülü İncelemesi ve Yapılacaklar**

Mevcut dosyalarınızı inceledim. Şu anda **RTK (Redux Toolkit)** ile dil ve tema yönetimi başarılı bir şekilde entegre edilmiş durumda. Ancak, teklif modülünü Almanya’daki yasal gerekliliklere ve yukarıda belirttiğiniz özelliklere tam uyumlu hale getirmek için bazı geliştirmeler yapılması gerekiyor.

### 📋 **Öncelikli Yapılacaklar:**

1. **Teklif Listesi (OfferList.jsx):**
   - **Durum Filtreleme:** Aktif, pasif, onaylanmış, reddedilmiş filtreleri ekleyeceğiz.
   - **Arama ve Sıralama:** Müşteri adına göre arama ve tarih/sıralama ekleyeceğiz.

2. **Yeni Teklif Oluşturma (OfferCreate.jsx & OfferForm.jsx):**
   - **KDV Hesaplama:** %19 veya %7 KDV seçenekleriyle vergi hesaplama.
   - **Taşıma Maliyeti:** Opsiyonel taşıma maliyeti alanı eklenecek.
   - **Otomatik Toplam Hesaplama:** Vergi dahil/ hariç olarak toplam tutar hesaplanacak.

3. **PDF Üretimi (OfferPDF.jsx):**
   - Almanya’ya uygun PDF formatı ile dinamik veri yerleştirme yapılacak.
   - Logo, müşteri bilgisi, IBAN, vergi numarası gibi alanlar eklenecek.

4. **Teklif Durumu Yönetimi (OfferDetails.jsx):**
   - **Onaylama/Reddetme:** Teklif durumunu değiştirme butonları.
   - **Aktif/Pasif:** Teklifleri arşivleme veya pasif hale getirme.

5. **RTK Yapılandırması:**
   - **offerSlice.js:** Teklif verilerini yöneten bir Redux slice oluşturacağız.
   - **Veri Yönetimi:** Teklif verilerini RTK store üzerinden yöneteceğiz.

---

### 🚀 **Hangi Özellikten Başlayalım?**

- **Teklif Listesi (Filtreleme ve Arama)**
- **Yeni Teklif Ekleme Formu (Vergi ve Maliyet Hesaplama)**
- **PDF Üretimi ve Düzenleme**
- **Teklif Durumu Yönetimi (Onayla/Reddet/Pasif Yap)**

Hangisine öncelik vermek istersin? 😊




### ✅ **Mevcut Dosya Yapısı: Offer Modülü**

```
/src/features/offer/
├── components/
│   ├── Offer.jsx               # Ana Sayfa, Teklif Modülünün Giriş Noktası
│   ├── OfferSidebar.jsx        # Navigasyon Menüsü
│   ├── OfferList.jsx           # Teklif Listeleme Sayfası
│   ├── OfferCreate.jsx         # Yeni Teklif Oluşturma Formu
│   ├── OfferDetailForm.jsx     # Teklif Detay Görüntüleme ve Güncelleme Formu
│   ├── OfferPDFGenerator.jsx   # Teklifin Onaylanması ve PDF Oluşturma
│   ├── OfferPDF.jsx            # PDF Önizleme Bileşeni
│   ├── AddProduct.jsx          # Ürün Ekleme Sayfası
│   ├── SetShippingCost.jsx     # Nakliye Ücreti Belirleme
│   └── OfferDetails.jsx        # Teklif Detay Sayfası (Okuma Odaklı)
│
├── offerSlice.js               # Redux Toolkit Slice (CRUD İşlemleri)
├── useOffers.js                # Custom Hook (Teklif İşlemleri)
└── styles/offerStyles.js       # Tüm Stil Tanımlamaları
```

---

### 🚀 **Yapılan Geliştirmeler:**

1. **RTK Yapısı:**  
   - `offerSlice.js` sadeleştirildi, performans iyileştirmeleri yapıldı.
   - `useOffers.js` ile CRUD işlemleri merkezi bir yapıdan yönetiliyor.

2. **Formlar ve Detaylar:**  
   - **OfferCreate** ile yeni teklifler oluşturulabiliyor.  
   - **OfferDetailForm** ile teklif detayları görüntülenip düzenlenebiliyor.  

3. **PDF Yönetimi:**  
   - **OfferPDFGenerator** ile teklifler resmi belge haline getirilebiliyor.  
   - Onaylandıktan sonra teklif durumu otomatik olarak değiştiriliyor.

4. **Tema ve Dil Desteği:**  
   - Çoklu dil desteği için temel yapı hazırlandı (TR, EN, DE).  
   - Tema desteği (dark/light) tam entegre edildi.

---

### ❗ **Eksik Olanlar:**

1. **📧 E-posta Gönderimi:**  
   - PDF oluşturulduktan sonra e-posta ile gönderme fonksiyonu eksik.

2. **🔐 Yetkilendirme:**  
   - Teklif düzenleme, silme işlemleri için rol bazlı yetkilendirme eksik.

3. **📊 Raporlama ve İstatistikler:**  
   - Onaylanan, bekleyen teklifler için rapor ve grafik desteği yok.

4. **🌐 Dil Dosyaları:**  
   - TR, EN, DE için dil dosyaları tam oluşturulmadı.  
   - JSON tabanlı dil dosyası yapısı gerekli.

5. **📂 Arşivleme:**  
   - Onaylanan teklifler arşivlenebilir olmalı.  
   - Arşiv sayfası eklenebilir.

---

### 💡 **Öneriler:**

1. **E-Posta Entegrasyonu (SMTP):**  
   - PDF oluşturulduktan sonra otomatik e-posta ile gönderim yapılabilir.  
   - Node.js tarafında `nodemailer` kullanılabilir.

2. **Rol Tabanlı Yetkilendirme:**  
   - Admin, Satış Temsilcisi gibi roller için yetki kontrolleri eklenebilir.

3. **Dil Dosyası Yapısı:**  
   - `/src/locales/` altında `tr.json`, `en.json`, `de.json` gibi dosyalar oluşturup tüm metinleri merkezi bir yerden yönetebiliriz.

4. **Raporlama Sayfası:**  
   - Onaylanan, reddedilen tekliflerin istatistiklerini gösteren grafikler eklenebilir.

5. **Versiyon Kontrolü:**  
   - Teklif üzerinde yapılan değişiklikler loglanabilir. Hangi kullanıcı neyi değiştirmiş görebiliriz.

---

### 🚀 **Nasıl İlerleyelim?**

1. **Dil Desteğini Tamamlayalım:**  
   - JSON tabanlı dil dosyaları oluşturup tüm metinleri buradan yönetelim.

2. **E-Posta Gönderimi:**  
   - PDF oluşturulduktan sonra e-posta ile gönderim modülünü entegre edelim.

3. **Raporlama ve Analiz:**  
   - Onaylanan teklifler için bir rapor sayfası oluşturalım.

4. **Rol Tabanlı Yetkilendirme:**  
   - Admin ve kullanıcı rolleri belirleyip, yetki kısıtlamaları ekleyelim.

Hangi adımla devam etmek istersen, hemen başlayabiliriz. 🚀