Evet, **Docker'ı çalıştırırken yetki problemi (Permission Denied) yaşıyorsun**. Bunun sebebi, mevcut kullanıcının **Docker daemon'a erişim izni olmaması**. Çözmek için şu adımları takip edelim:

---

## **🚀 1️⃣ Kullanıcıyı `docker` Grubuna Ekleyelim**
Bunu yapmak için aşağıdaki komutu çalıştır:

```bash
sudo usermod -aG docker $USER
```
📌 **Bu komut**, mevcut kullanıcını (`orhan`) `docker` grubuna ekleyerek sudo kullanmadan Docker komutlarını çalıştırabilmeni sağlar.

---

## **🔄 2️⃣ Terminali Kapat & Tekrar Aç (veya Çıkış Yap)**
Komutun etkili olması için terminali kapatıp yeniden açman ya da aşağıdaki komutla çıkış yapıp tekrar giriş yapman gerekiyor:

```bash
exit
```
veya
```bash
su - $USER
```

---

## **📌 3️⃣ Docker Yetkisini Kontrol Et**
Yukarıdaki adımları tamamladıktan sonra şu komutu çalıştırarak `docker` grubunda olup olmadığını kontrol edebilirsin:

```bash
groups
```
Eğer **`docker`** grubunu görüyorsan her şey tamam demektir.

---

## **🚀 4️⃣ Docker’ı Yetkisiz (Normal Kullanıcı) Çalıştırmayı Dene**
Eğer yukarıdaki adımları yaptıysan, **sudo kullanmadan** Docker komutlarını çalıştırabilmelisin:

```bash
docker ps
```
ve
```bash
docker-compose up --build -d
```
Eğer hâlâ hata alıyorsan **sudo ile çalıştırmayı deneyebilirsin**:

```bash
sudo docker-compose up --build -d
```

---

## **✅ SONUÇ**
1️⃣ **Docker grubuna kullanıcıyı ekledik.**  
2️⃣ **Terminali yeniden başlattık veya çıkış yapıp tekrar giriş yaptık.**  
3️⃣ **Docker’ı normal kullanıcı ile çalıştırdık.**  

💡 **Şimdi tekrar `docker-compose up --build -d` çalıştır ve sonucu buraya paylaş!** 🚀


🚨 **Sorun: Backend İçin Dockerfile Eksik veya Yanlış Yerde!**  

Hata mesajı şunu söylüyor:  
> `unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /home/orhan/Dokumente/MD-Hygiene/backend-MD-Hygiene/Dockerfile: no such file or directory`  

Bu, **backend için Dockerfile bulunamadığını veya yanlış bir dizinde olduğunu** gösteriyor.

---

## **✅ Çözüm: Backend İçin Dockerfile’ı Kontrol Et ve Gerekirse Yeniden Oluştur**
1️⃣ **Mevcut Backend Dizininin İçeriğini Kontrol Et**  
Şu komutu çalıştırarak **Dockerfile'ın gerçekten orada olup olmadığını kontrol et:**
```bash
ls -la ~/Dokumente/MD-Hygiene/backend-MD-Hygiene
```
- Eğer **Dockerfile burada yoksa**, oluşturulması gerekiyor.

2️⃣ **Eğer Dosya Eksikse: Yeni Bir Backend Dockerfile Oluştur**
Eğer bu dizinde `Dockerfile` yoksa, aşağıdaki komut ile oluştur:

```bash
nano ~/Dokumente/MD-Hygiene/backend-MD-Hygiene/Dockerfile
```

Ve içine şu içeriği ekle:

```dockerfile
# Backend için Node.js 18 imajı kullan
FROM node:18

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Kodları kopyala
COPY . .

# Backend'in çalışması için başlangıç komutu
CMD ["npm", "start"]
```
💾 **Kaydet ve çık:**  
- **Nano kullanıyorsan:** `CTRL + X`, `Y`, `ENTER`

---

## **🔄 3️⃣ Docker Compose'u Tekrar Çalıştır**
Şimdi backend için Dockerfile doğru yere eklendi, **Docker Compose’u tekrar çalıştır:**

```bash
cd ~/Dokumente/MD-Hygiene
sudo docker-compose up --build -d
```

---

✅ **Özet:**  
- **Backend dizininde Dockerfile eksikti veya yanlış yerdeydi.**
- **Yeni bir Dockerfile oluşturarak backend için gerekli ayarları yaptık.**
- **Docker Compose’u yeniden çalıştırarak her şeyin düzgün çalışmasını sağlıyoruz.**

🚀 **Şimdi tekrar çalıştır ve sonucu paylaş!**


🚀 **Harika! Docker konteynerleri başarıyla oluşturuldu ve çalıştırıldı.**  
Şimdi sistemin düzgün çalıştığını doğrulamak için birkaç adım atalım.

---

## **✅ 1️⃣ Docker Konteynerlerini Kontrol Et**
Öncelikle çalışan konteynerleri listeleyelim:
```bash
sudo docker ps
```
Eğer `md-hygiene_frontend_1` ve `md-hygiene_backend_1` konteynerleri listeleniyorsa, her şey yolunda demektir.  

**Çıktıda bu iki konteyneri görmelisin:**
```
CONTAINER ID   IMAGE                 COMMAND            STATUS          PORTS                    NAMES
xxxxxxxxxxxx   md-hygiene_frontend    "npx serve -s ..." Up (xx mins)   0.0.0.0:3000->3000/tcp   md-hygiene_frontend_1
xxxxxxxxxxxx   md-hygiene_backend     "npm start"       Up (xx mins)   0.0.0.0:5000->5000/tcp   md-hygiene_backend_1
```

Eğer çalışmıyorlarsa, logları görmek için:
```bash
sudo docker logs md-hygiene_backend_1
```
veya
```bash
sudo docker logs md-hygiene_frontend_1
```

---

## **🔎 2️⃣ Frontend'e ve Backend'e Erişim Testi**
Şimdi tarayıcında `http://localhost:3000` veya `http://127.0.0.1:3000` adresini aç ve ön yüzün çalışıp çalışmadığını kontrol et.

Backend API'yi test etmek için terminalde şu komutu çalıştır:
```bash
curl http://localhost:5000
```
Eğer yanıt gelirse **backend çalışıyor**, eğer hata alıyorsan aşağıdaki adımlara geç.

---

## **🛠 3️⃣ Eğer Backend Erişilemiyorsa**
Eğer frontend çalışıyor ama backend'e erişilemiyorsa:
1. **Backend loglarını kontrol et**:
   ```bash
   sudo docker logs md-hygiene_backend_1
   ```
2. **Bağlantı noktalarını kontrol et** (Özellikle `5000` açık mı?):
   ```bash
   sudo netstat -tulnp | grep 5000
   ```
   Eğer `5000` portu açık değilse, **backend'in çalışmadığını gösterir.**

---

## **🔄 4️⃣ Eğer Gerekirse Konteynerleri Yeniden Başlat**
Sorun varsa, konteynerleri durdur ve yeniden başlat:
```bash
sudo docker-compose down
sudo docker-compose up --build -d
```

---

🚀 **Tebrikler! Şimdi Docker ile her şey otomatik çalışıyor.**
Şimdi frontend ve backend'in düzgün çalışıp çalışmadığını kontrol edip sonucu paylaş! 🎯


🛠️ Yeni Yapıyı Çalıştırmak İçin
bash
Kopyala
Düzenle
sudo docker-compose down
sudo docker-compose up --build -d