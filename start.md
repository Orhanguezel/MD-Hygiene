🚀 **Başarılı Başlatma!**  
Tüm servisler **başarıyla başlatıldı** ve **çalışıyor gibi görünüyor.** Şimdi adım adım **Docker ile geliştirme ve prod ortamında nasıl çalıştırılacağını** anlatayım.  

---

## **✅ 1. Çalışan Container’ları Kontrol Et**
Eğer tüm servislerin düzgün çalıştığını görmek istiyorsan şu komutu çalıştır:
```bash
docker ps
```
Bu çıktıda **mongo, backend ve frontend container'larının** **çalışır durumda** olup olmadığını göreceksin.

Eğer hepsi **UP (Çalışıyor)** ise, her şey **sorunsuz** demektir! 🎉

---

## **🛠 2. Geliştirme Ortamında (Local) Çalıştırma**
Geliştirme ortamında tüm servisleri **Docker kullanarak** ayağa kaldırmak için:

```bash
docker-compose up -d --build
```
Bu komut **MongoDB, Backend ve Frontend’i** güncelleyerek çalıştırır.  
**Backend** şu adreste çalışıyor olmalı:
```bash
http://localhost:5010
```
**Frontend** şu adreste çalışıyor olmalı:
```bash
http://localhost:3001
```
Eğer Swagger UI aktifse:
```bash
http://localhost:5010/api-docs
```

Eğer bir hata alırsan logları incelemek için:
```bash
docker logs -f md-hygiene_backend
```
veya
```bash
docker logs -f md-hygiene_frontend
```

---

## **🚀 3. Üretim Ortamında (Hostinger veya Sunucu) Çalıştırma**
Eğer **prod ortamında** çalıştırmak istiyorsan:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
📌 **ÖNEMLİ:**  
- **Env dosyalarının doğru olduğuna emin ol.**  
- **Prod ortamı için doğru MONGO_URI_PROD ayarlı olmalı.**  
- **Frontend için VITE_API_URL doğru olmalı.**  

---

## **📌 4. Servisleri Kapatmak ve Temizlemek**
Tüm servisleri durdurup temizlemek için:
```bash
docker-compose down
```
Eğer **tüm container’ları ve cache’leri sıfırlamak istersen:**
```bash
docker system prune -a
```

---

## **🔥 5. Her Şey Tamamsa!**
Artık **Docker ile hem yerelde hem de prod ortamında** MD-Hygiene projen çalışıyor! 🎉  
Sorun yaşarsan **logları** kontrol et ve buradan bana sorabilirsin. 🚀



Güncellenmiş **server.js** ve **config/db.js** dosyalarıyla birlikte tüm ortam değişkenlerini doğru şekilde okuyan bir yapı oluşturuyorum. **Development** ve **Production** ortamlarının otomatik seçilmesini sağlayacağım.

---

### **📌 Özetle:**
✅ `dotenv.config({ path: \`.env.${process.env.NODE_ENV || "development"}\` })` kullanarak, hangi ortamda çalışıyorsak **o ortamın** `.env` dosyasını yükleyecek.  
✅ `MONGO_URI`, `CORS_ORIGIN`, `VITE_API_URL` gibi değişkenler **otomatik olarak seçilecek**.  
✅ **Tüm ortam değişkenleri doğru şekilde okunacak** ve **log olarak terminale yazdırılacak**.  

Bundan sonra **development** ortamında çalıştırmak için:
```bash
export NODE_ENV=development
docker-compose up --build -d
```

**Production ortamında çalıştırmak için:**
```bash
export NODE_ENV=production
docker-compose up --build -d
```

Artık **her ortamda doğru `.env` dosyası yükleniyor!** 🚀
