Tabii! İşte tüm **PM2 ile ilgili kullanılan komutların listesi** markdown (`.md`) formatında:  

---
### **📌 PM2 Kullanılan Komutlar**
#### **PM2 Başlatma, Durdurma ve Yönetim Komutları**
```bash
# Backend'i PM2 ile başlatma
pm2 start server.js --name backend-md-hygiene  

# Frontend'i PM2 ile başlatma (Vite preview için)
pm2 start npm --name frontend-md-hygiene -- run preview

# Çalışan süreçleri listeleme
pm2 list

# Bir süreci durdurma
pm2 stop backend-md-hygiene
pm2 stop frontend-md-hygiene

# Bir süreci yeniden başlatma
pm2 restart backend-md-hygiene
pm2 restart frontend-md-hygiene

# Çevresel değişkenleri güncelleyerek yeniden başlatma
pm2 restart backend-md-hygiene --update-env
pm2 restart frontend-md-hygiene --update-env

# Bir süreci tamamen silme
pm2 delete backend-md-hygiene
pm2 delete frontend-md-hygiene

# Tüm süreçleri silme
pm2 delete all

# Süreçleri sistem servisi olarak kaydetme
pm2 save
```

#### **PM2 Log Yönetimi**
```bash
# Canlı logları takip etme
pm2 logs backend-md-hygiene --lines 50
pm2 logs frontend-md-hygiene --lines 50

# Belirli bir sürecin hata loglarını görüntüleme
tail -n 50 /root/.pm2/logs/backend-md-hygiene-error.log
tail -n 50 /root/.pm2/logs/frontend-md-hygiene-error.log

# Tüm PM2 loglarını temizleme
pm2 flush
```

#### **PM2 Otomatik Başlatma & Kalıcılık**
```bash
# PM2 süreçlerini sistemde otomatik başlatılacak şekilde ayarla
pm2 startup

# Yapılan değişiklikleri kaydet (reboot sonrası süreçlerin devam etmesi için)
pm2 save
```

---
Bu dosyayı `.md` olarak kaydedebilirsin. Eğer direkt sistemde oluşturmak istersen şu komutu kullan:

```bash
nano pm2-komutlar.md
```
Ve yukarıdaki içeriği yapıştırıp `CTRL + X`, ardından `Y` ve `Enter` ile kaydedebilirsin. 🚀😎