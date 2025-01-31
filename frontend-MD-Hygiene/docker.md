### **🚀 Docker Yenileme ve Sorun Giderme Komutları**  
Aşağıdaki komutları kullanarak **Docker servislerini tamamen yeniden başlatabilir, cache temizleyebilir ve ortam değişkenlerini kontrol edebilirsin**.

---

## **📌 1. Tüm Servisleri Yeniden Başlat ve Güncelle**
```bash
docker-compose down
docker-compose up --build -d
```
✅ **Ne yapar?**  
- Tüm Docker containerlarını durdurur ve güncellenmiş yapı ile tekrar başlatır.

---

## **📌 2. Backend Loglarını Kontrol Et**
```bash
docker logs md-hygiene_backend --tail=50
```
✅ **Ne yapar?**  
- **Son 50 satırı göstererek** hata mesajlarını ve süreci kontrol etmeni sağlar.

---

## **📌 3. Mail Gönderme Durumunu Kontrol Et**
```bash
docker exec -it md-hygiene_backend sh -c "env | grep SMTP"
```
✅ **Ne yapar?**  
- SMTP kullanıcı adı ve şifresinin **container içinde doğru tanımlandığını** kontrol eder.

---

## **📌 4. Docker Servislerini Tamamen Yeniden Başlat (Cache Temizleme)**
Eğer yukarıdaki işlemler **sorunu çözmezse**, aşağıdaki komutları çalıştır:

```bash
docker-compose down  # Tüm containerları kapat
docker volume prune -f  # Kullanılmayan tüm volume'leri temizle
docker network prune -f  # Kullanılmayan tüm network'leri temizle
docker system prune -a -f  # Docker cache’i ve kullanılmayan dosyaları temizle
docker-compose up --build -d  # Servisleri yeniden başlat
```
✅ **Ne yapar?**  
- **Docker'daki tüm önbelleği ve gereksiz verileri temizleyerek** yeniden inşa eder.

---

## **📌 5. Docker Ortam Değişkenlerini Manuel Olarak Ayarla**
Eğer yukarıdaki adımlar **SMTP bilgilerini içeri çekmezse**, aşağıdaki komutları kullanarak ortam değişkenlerini **docker-compose.yml içine doğrudan tanımlayabilirsin**.

```yaml
backend:
  environment:
    - NODE_ENV=production
    - MONGO_URI=mongodb://mongo:27017/md-hygiene
    - SMTP_USER=info@md-hygienelogistik.de
    - SMTP_PASSWORD=AaBb1234,
```
Sonrasında **container içine girip değişkenleri tekrar kontrol et**:
```bash
docker exec -it md-hygiene_backend sh
env | grep SMTP
```

---

## **📌 6. Manuel Test: SMTP Sunucusuna Erişim Kontrolü**
Eğer **hala mail gönderilemiyorsa**, doğrudan SMTP sunucusuna erişimi şu komutla test edebilirsin:

```bash
openssl s_client -connect smtp.hostinger.com:465 -crlf -quiet
```
✅ **Eğer bağlantı başarısız olursa, sunucuya dış bağlantı engelleniyor olabilir.** 🔴

---

## **📌 7. Manuel Test: Mail Gönderimi**
Eğer **SMTP bağlantısı varsa**, Node.js içinde doğrudan mail gönderimini test et:

```javascript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "info@md-hygienelogistik.de",
        pass: "AaBb1234,"
    },
    logger: true,
    debug: true,
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP bağlantı hatası:", error);
    } else {
        console.log("SMTP bağlantısı başarılı!");
    }
});
```
✅ **Eğer hata alırsan**, muhtemelen **Hostinger SMTP bağlantısı engellenmiş olabilir.**

---

## **📌 8. Port Yapılandırmalarını Kontrol Et**
Bazı durumlarda, **SMTP bağlantı portları engellenebilir.** Aşağıdaki komutları çalıştırarak **bağlantıyı test et**:

```bash
nc -zv smtp.hostinger.com 465
nc -zv smtp.hostinger.com 587
```
- Eğer bağlantı başarısız olursa, **firewall veya güvenlik duvarı SMTP portlarını engelliyor olabilir.**  

Bunu kontrol etmek için:
```bash
sudo ufw status
```
Eğer firewall aktifse, SMTP portlarını açmak için:
```bash
sudo ufw allow 465/tcp
sudo ufw allow 587/tcp
sudo ufw reload
```
✅ **Bu işlem SMTP bağlantılarını açar ve mail gönderimi için gerekli erişimi sağlar.**

---

### **📌 Sonuç ve Uygulanması Gereken Adımlar**  
1️⃣ **İlk olarak basit restart yap:**  
   ```bash
   docker-compose down && docker-compose up --build -d
   ```
2️⃣ **Backend loglarını kontrol et:**  
   ```bash
   docker logs md-hygiene_backend --tail=50
   ```
3️⃣ **SMTP değişkenlerini doğrula:**  
   ```bash
   docker exec -it md-hygiene_backend sh -c "env | grep SMTP"
   ```
4️⃣ **Eğer SMTP değişkenleri görünmüyorsa, docker-compose.yml içine doğrudan ekle.**  
5️⃣ **Eğer hala hata varsa, `openssl s_client` komutu ile doğrudan SMTP bağlantısını test et.**  
6️⃣ **Eğer bağlantı başarısızsa, firewall’u kontrol et ve gerekli portları aç.**

🔹 **Yukarıdaki adımları uyguladıktan sonra tekrar mail göndermeyi dene!** 🚀