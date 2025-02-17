## **📌 Settings (Ayarlar) Modülü Raporu**  

---

### **🔍 Genel Bakış**  
**Settings modülü**, kullanıcıların site ve finansal ayarları yönetmesini sağlar. Bu modül sayesinde:  
- **Dil, tema ve para birimi** değiştirilebilir.  
- **Vergi oranı ve kargo ücreti** belirlenebilir.  
- **Ödeme yöntemleri** aktif veya pasif hale getirilebilir.  
- **Şirket ve müşteri bilgileri** düzenlenebilir.  

Bu rapor, **Settings Modülü’nün** işleyişi, mevcut özellikleri ve yapılan iyileştirmeleri içermektedir.  

---

## **📌 Mevcut Özellikler**  

### ✅ **1. Dil ve Tema Yönetimi**  
- Kullanıcılar **Türkçe 🇹🇷, İngilizce 🇺🇸 ve Almanca 🇩🇪** dilleri arasında geçiş yapabilir.  
- **Tema Yönetimi**: Light / Dark modları arasında geçiş sağlanır.  
- **Dil ve tema ayarları** **Redux Store** üzerinden yönetilmektedir.  
- Kullanıcı değişiklik yaptığında **global state anında güncellenir** ve **localStorage** ile saklanır.  

---

### ✅ **2. Finansal Ayarlar**  
- **Para birimi seçimi**: Kullanıcılar **EUR 💶, USD 💵 ve TRY 🇹🇷** arasında seçim yapabilir.  
- **Vergi oranı belirleme**: Varsayılan olarak %19 KDV uygulanmaktadır.  
- **Kargo ücreti**: Kullanıcılar kargo ücretini özelleştirebilir.  
- **Değişiklikler Redux Store’a kaydedilir ve uygulamaya yansıtılır.**  

---

### ✅ **3. Ödeme Yöntemleri Yönetimi**  
- **PayPal, Stripe ve Banka Havalesi** ödeme yöntemleri yönetilebilir.  
- Kullanıcı, ödeme yöntemlerini **aktif/pasif** yapabilir.  
- Aktif ödeme yöntemleri **otomatik olarak ödeme ekranında gösterilir**.  
- **Redux Store ile entegre** olup, değişiklikler anında uygulanır.  

---

### ✅ **4. Şirket ve Müşteri Yönetimi**  
- **Şirket Bilgileri Güncellenebilir:**  
  - Şirket ismi, adresi, vergi numarası, banka bilgileri değiştirilebilir.  
  - **Tüm güncellemeler Redux Store’a ve veritabanına işlenir.**  
- **Müşteri Yönetimi:**  
  - Müşteri listesi görüntülenebilir, yeni müşteri eklenebilir ve mevcut müşteriler düzenlenebilir.  
  - **Müşteri ID, isim, iletişim bilgileri gibi detaylar saklanır ve güncellenebilir.**  

---

## **📌 Yapılan İyileştirmeler**  

### 🔹 **1. Tema ve Dil Yönetimi Güncellendi**  
- **`useLanguage` ve `useTheme` hook’ları güncellendi.**  
- **Styled-components** ile **dark/light mode geçişleri sorunsuz hale getirildi.**  
- **Dil dosyaları ayrıştırıldı** ve **gereksiz tekrarlardan kaçınıldı**.  

### 🔹 **2. Finansal Hesaplamalar Merkezi Hale Getirildi**  
- **Vergi oranı ve kargo ücreti, Redux Store üzerinden merkezi olarak yönetiliyor.**  
- **Fatura ve sipariş hesaplamaları doğru çalışacak şekilde düzenlendi.**  
- **Para birimi değiştirildiğinde, sipariş özetindeki tüm tutarlar otomatik güncelleniyor.**  

### 🔹 **3. Ödeme Yöntemleri Yönetimi Daha Kullanıcı Dostu Hale Getirildi**  
- **Ödeme butonları `ToggleButton` ile modern hale getirildi.**  
- **DOM hatalarını engellemek için `active` prop’u `$active` olarak değiştirildi.**  
- **Redux ile tam senkronizasyon sağlandı.**  

### 🔹 **4. Şirket ve Müşteri Yönetimi Optimize Edildi**  
- **Müşteri ekleme ve güncelleme işlemleri daha güvenli hale getirildi.**  
- **Şirket bilgileri artık Redux Store’da saklanıyor ve PDF fatura oluşturma işleminde otomatik kullanılıyor.**  
- **Eksik veri kontrolleri artırıldı, böylece boş veriler kaydedilmiyor.**  

---

## **📌 Önerilen Geliştirmeler**  

✅ **1. Daha Gelişmiş Raporlama**  
- Kullanıcıların geçmiş finansal ayarları görüntüleyebilmesi için bir **değişiklik geçmişi (audit log) oluşturulabilir.**  
- **Vergi oranı değiştiğinde eski siparişlerde nasıl bir değişiklik olacağı analiz edilebilir.**  

✅ **2. Otomatik Vergi Hesaplama**  
- Vergi oranı değiştirildiğinde, **siparişlerin ve faturaların otomatik olarak güncellenmesi sağlanabilir.**  

✅ **3. Daha Esnek Para Birimi Yönetimi**  
- Kullanıcılar **sadece sabit para birimleri yerine manuel para birimi ekleyebilir.**  
- Döviz kurlarına bağlı olarak **dinamik dönüşüm yapılabilir.**  

✅ **4. Kullanıcı Rollerine Göre Yetkilendirme**  
- Şirket ve müşteri bilgilerini **sadece adminler güncelleyebilir.**  
- **Normal kullanıcılar yalnızca kendi ödeme yöntemlerini değiştirebilir.**  

---

## **📌 Sonuç**  
**Settings modülü**, şu anda **stabil, modern ve kullanıcı dostu bir yapıdadır**.  
Özellikle **Redux ile tam senkronizasyon, dark/light mode desteği ve ödeme yöntemi yönetimi** ile **tam fonksiyonel hale getirilmiştir**.  

Bundan sonraki geliştirmelerde **daha kapsamlı raporlama, otomatize vergi hesaplamaları ve dinamik para birimi yönetimi** eklenerek **daha güçlü bir yapı** oluşturulabilir. 🚀