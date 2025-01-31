## 

```bash 
docker-compose down
docker-compose up --build -d

```

# Adım 2: Backend Loglarını Kontrol Et

```bash

docker logs md-hygiene_backend

```

# maili kontrol et. gidip gitmedigini. 
# sudo docker exec -it md-hygiene_backend sh
# env | grep SMTP

---
## **✅ Docker Servislerini Tamamen Yeniden Başlat (Cache Temizleme)**

```bash
docker-compose down  # Tüm containerları kapat
docker volume prune -f  # Kullanılmayan tüm volume'leri temizle
docker network prune -f  # Kullanılmayan tüm network'leri temizle
docker system prune -a -f  # Docker cache’i ve kullanılmayan dosyaları temizle
docker-compose up --build -d  # Servisleri yeniden başlat
```
---
## **✅ Docker Ortam Değişkenlerini Manuel Olarak Ayarla**
Eğer yukarıdaki adımlar işe yaramazsa, **Docker ortam değişkenlerini doğrudan docker-compose.yml içinde tanımlayarak** sorunu tamamen çözebiliriz:

**Sonrasında şunları çalıştır:**
```bash
docker-compose down
docker-compose up --build -d
```

Bundan sonra **container içine girip değişkenleri tekrar kontrol et**:
```bash
docker exec -it md-hygiene_backend sh
env | grep SMTP
```


