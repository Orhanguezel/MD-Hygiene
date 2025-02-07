Tamam, **MongoDB'ye tekrar giriş yapalım** ve her şeyi baştan kontrol edelim.

---

## **1. MongoDB'ye Bağlan**
Sunucuda **terminal aç** ve şu komutu çalıştır:

```bash
mongosh "mongodb://admin:adminpassword@141.136.36.40:27017/admin"
```

Bu komut, **admin kullanıcısı ile bağlanmanı sağlar**. Eğer giriş başarılı olursa, aşağıdaki gibi bir çıktı alırsın:

```
Using MongoDB:          6.0.16
Using Mongosh:          2.3.8
Connected to:          mongodb://141.136.36.40:27017/admin
```

Eğer giriş başarısız olursa, şu hatalardan birini görebilirsin:

- **Authentication failed** → Şifre yanlış olabilir.
- **Connection timeout** → Sunucu çalışmıyor olabilir.

Eğer giriş başarılıysa, devam edelim.

---

## **2. Mevcut Veritabanlarını Göster**
MongoDB’ye girdikten sonra şu komutu çalıştır:

```javascript
show dbs
```

Bu, sunucuda **mevcut tüm veritabanlarını** listeler. Eğer **`antalya-doner-pizzeria` veritabanı listede yoksa**, muhtemelen silinmiş demektir.

---

## **3. Doğru Veritabanına Geç**
Eğer `antalya-doner-pizzeria` görünüyor, şu komut ile içine gir:

```javascript
use antalya-doner-pizzeria
```

Sonra koleksiyonları listelemek için:

```javascript
show collections
```

Eğer burada hiçbir koleksiyon görünmüyorsa, veritabanı boş olabilir.

---

## **4. İçinde Veri Var mı?**
Eğer koleksiyonlar görünüyorsa, **verilerin silinip silinmediğini** kontrol etmek için şu komutları deneyebilirsin:

```javascript
db.getCollectionNames()
```

Sonra olası koleksiyon isimlerini bulduysan:

```javascript
db.<koleksiyon_adi>.find().limit(5).pretty()
```

Örneğin, **ürünleri görmek için**:

```javascript
db.products.find().limit(5).pretty()
```

Eğer bu komutlar **boş döndürüyorsa**, veriler büyük ihtimalle silinmiş.

---

## **5. MongoDB Loglarını Kontrol Edelim**
Eğer veritabanı kaybolduysa, MongoDB loglarını inceleyelim. Terminalde şu komutu çalıştır:

```bash
sudo cat /var/log/mongodb/mongod.log | less
```

Bu log dosyasında **hangi işlemler yapıldığını görebilirsin**. Özellikle **"dropping database"** veya **"removing collection"** gibi ifadeleri ara.

- **Eğer biri yanlışlıkla veritabanını sildiyse**, burada görebilirsin.
- **Eğer MongoDB çökme yaşadıysa**, hata mesajlarını burada bulabilirsin.

Log dosyasındaki **ilgili satırları paylaş**, birlikte inceleyelim.

---

**Şimdi yukarıdaki adımları sırayla uygula ve çıktıları paylaş.**  
Eğer bir adımda hata alırsan, o hatayı da paylaş, hemen düzeltelim.

Tamam, **sıfırdan veritabanını oluşturalım** ve bağlantıyı test edelim.

---

## **1. MongoDB'ye Bağlan**
Öncelikle MongoDB’ye bağlanalım. Terminalde şu komutu çalıştır:

```bash
mongosh "mongodb://admin:adminpassword@141.136.36.40:27017/admin"
```

Eğer giriş yaptıysan, **şu çıktıyı almalısın**:

```
Using MongoDB:          6.0.16
Using Mongosh:          2.3.8
Connected to:          mongodb://141.136.36.40:27017/admin
```

Bağlantı sağlandıysa, veritabanını oluşturalım.

---

## **2. Yeni Veritabanını Oluştur**
Şimdi yeni veritabanını oluşturalım. Örneğin, **MD-Hygiene** için:

```javascript
use md-hygiene
```

Bu komut **veritabanını oluşturur ve içine girer**.

---

## **3. İlk Koleksiyonu (Tablo) Oluştur**
Veritabanı boş olduğu için bir **koleksiyon (table)** oluşturalım. Örneğin, **kullanıcılar (users)** koleksiyonu:

```javascript
db.createCollection("users")
```

Eğer ürünler için bir koleksiyon istiyorsan:

```javascript
db.createCollection("products")
```

Bu komutları çalıştırdıktan sonra **koleksiyonların olup olmadığını kontrol etmek için**:

```javascript
show collections
```

Çıktı şöyle olmalı:

```
users
products
```

---

## **4. Test Verisi Ekleyelim**
Şimdi **örnek bir kullanıcı** ekleyelim:

```javascript
db.users.insertOne({
  name: "Orhan Güzel",
  email: "orhanguzell@gmail.com",
  role: "admin",
  createdAt: new Date()
})
```

Ve **örnek bir ürün** ekleyelim:

```javascript
db.products.insertOne({
  name: "Margherita Pizza",
  price: 9.99,
  category: "Pizza",
  available: true,
  createdAt: new Date()
})
```

Bu verileri ekledikten sonra **kontrol etmek için**:

```javascript
db.users.find().pretty()
db.products.find().pretty()
```

Eğer eklediğin verileri görebiliyorsan, veritabanın **çalışıyor demektir**.

---

## **5. Backend Bağlantısını Test Edelim**
Şimdi `.env` dosyasında bağlantıyı şu şekilde ayarlayalım:

```env
MONGO_URI=mongodb://admin:adminpassword@141.136.36.40:27017/md-hygiene?authSource=admin
```

Ardından backend’i tekrar başlat:

```bash
cd backend-MD-Hygiene
npm run dev
```

Eğer **başarıyla çalışırsa**, şu çıktıyı almalısın:

```
✅ MongoDB bağlantısı başarılı: mongodb://141.136.36.40:27017/md-hygiene
```

---

## **6. Frontend'i de Test Edelim**
Şimdi frontend’in doğru şekilde çalışıp çalışmadığını test edelim:

```bash
cd frontend-MD-Hygiene
npm run dev
```

Eğer her şey yolundaysa, `localhost:5173` veya Hostinger'daki domain üzerinden çalışmalıdır.

---

### **Özet**
✅ **Veritabanı oluşturuldu:** `md-hygiene`  
✅ **Koleksiyonlar oluşturuldu:** `users`, `products`  
✅ **Örnek veri eklendi ve test edildi**  
✅ **Backend bağlantısı sağlandı**  
✅ **Frontend test ediliyor**

Bu adımları uygulayıp her aşamada çıkan sonuçları paylaş, **eğer hata alırsan hemen çözelim.** 🚀




admin> db.createUser({
se", db: "admin" },
...   user: "admin",
...   pwd: "adminpassword",
...   roles: [
...     { role: "userAdminAnyDatabase", db: "admin" },
...     { role: "readWriteAnyDatabase", db: "admin" },
...     { role: "dbAdminAnyDatabase", db: "admin" },
...     { role: "clusterAdmin", db: "admin" }
...   ]
... })
{ ok: 1 }
admin> db.auth("admin", "adminpassword")
{ ok: 1 }
admin> use testDB
switched to db testDB
testDB> db.users.insertOne({ name: "Orhan", role: "Admin", age: 43 })
{
  acknowledged: true,
  insertedId: ObjectId('679af724788fcff144544ca7')
}
testDB> db.users.find().pretty()
[
  {
    _id: ObjectId('679af724788fcff144544ca7'),
    name: 'Orhan',
    role: 'Admin',
    age: 43
  }
]
testDB> 