### **📌 Backend Test Endpointleri - Postman ile Test İçin Hazır Hale Getirelim**  
Backend’in doğru çalıştığını test etmek için **Postman veya herhangi bir API test aracı** kullanarak aşağıdaki endpointleri deneyebiliriz.  

---

## **📌 1. Review (Yorum) Test Endpointleri**
| **Metod** | **Endpoint** | **Açıklama** | **Kimlik Doğrulama** |
|-----------|------------|--------------|------------------|
| **GET** | `/api/reviews/:productId` | Belirli bir ürünün tüm yorumlarını getir | Gerekli değil |
| **POST** | `/api/reviews` | Yeni bir yorum ekle | Kullanıcı giriş yapmalı |
| **PUT** | `/api/reviews/:id` | Kullanıcının kendi yorumunu güncellemesi | Kullanıcı giriş yapmalı |
| **DELETE** | `/api/reviews/:id` | Kullanıcının kendi yorumunu silmesi | Kullanıcı giriş yapmalı |

### **✅ 1.1. Belirli Bir Ürünün Yorumlarını Getir**
📌 **Endpoint:** `GET /api/reviews/:productId`  
**Test İçin:**  
- `productId` yerine **gerçek bir ürün ID’si** girerek ürüne yapılan tüm yorumları çekebiliriz.  

```json
GET http://localhost:5000/api/reviews/656d3b8e7c53a31f8e5c9b67
```

**Beklenen Yanıt (200 OK)**
```json
[
  {
    "_id": "657c2b3b8f53a31f8e5c9b12",
    "user": {
      "_id": "656d2b9e7c53a31f8e5c9a44",
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com"
    },
    "product": "656d3b8e7c53a31f8e5c9b67",
    "rating": 5,
    "comment": "Harika bir ürün!",
    "createdAt": "2024-04-10T15:23:45.678Z"
  }
]
```

---

### **✅ 1.2. Yeni Yorum Ekle (Auth Gerekli)**
📌 **Endpoint:** `POST /api/reviews`  
📌 **Header:** `Authorization: Bearer <JWT_TOKEN>`  
📌 **Body (JSON Formatı)**
```json
{
  "productId": "656d3b8e7c53a31f8e5c9b67",
  "rating": 4,
  "comment": "Gayet başarılı, ama biraz pahalı."
}
```

**Beklenen Yanıt (201 Created)**
```json
{
  "message": "Yorum başarıyla eklendi!",
  "review": {
    "_id": "657c2b3b8f53a31f8e5c9b12",
    "user": "656d2b9e7c53a31f8e5c9a44",
    "product": "656d3b8e7c53a31f8e5c9b67",
    "rating": 4,
    "comment": "Gayet başarılı, ama biraz pahalı.",
    "createdAt": "2024-04-10T15:25:00.123Z"
  }
}
```

📌 **Hata Testi:**  
Eğer aynı kullanıcı aynı ürüne tekrar yorum eklemeye çalışırsa:  
```json
{
  "error": "Bu ürüne zaten yorum yaptınız!"
}
```

---

### **✅ 1.3. Yorumu Güncelle (Kendi Yorumu)**
📌 **Endpoint:** `PUT /api/reviews/:id`  
📌 **Header:** `Authorization: Bearer <JWT_TOKEN>`  
📌 **Body (JSON Formatı)**
```json
{
  "rating": 5,
  "comment": "Ürünü bir kez daha denedim, mükemmel!"
}
```

**Beklenen Yanıt (200 OK)**
```json
{
  "message": "Yorum başarıyla güncellendi!",
  "review": {
    "_id": "657c2b3b8f53a31f8e5c9b12",
    "rating": 5,
    "comment": "Ürünü bir kez daha denedim, mükemmel!",
    "editedAt": "2024-04-10T16:10:32.456Z"
  }
}
```

📌 **Hata Testi:**  
Eğer farklı bir kullanıcı başka birinin yorumunu güncellemeye çalışırsa:  
```json
{
  "error": "Bu yorumu güncelleme yetkiniz yok!"
}
```

---

### **✅ 1.4. Yorumu Sil (Kendi Yorumu)**
📌 **Endpoint:** `DELETE /api/reviews/:id`  
📌 **Header:** `Authorization: Bearer <JWT_TOKEN>`  

**Beklenen Yanıt (200 OK)**
```json
{
  "message": "Yorum başarıyla silindi!"
}
```

📌 **Hata Testi:**  
Eğer farklı bir kullanıcı başka birinin yorumunu silmeye çalışırsa:  
```json
{
  "error": "Bu yorumu silme yetkiniz yok!"
}
```

---

## **📌 2. Backend Başlatma**
Şimdi backend’i çalıştırarak testleri Postman veya herhangi bir API test aracı ile deneyebiliriz.  

📌 **Terminalde Backend’i Başlatın:**
```bash
npm run dev
```

📌 **MongoDB bağlantısı kontrol edin:**  
Eğer bir hata alırsanız `.env` dosyanızı ve **MongoDB bağlantınızı** kontrol edin.  

📌 **JWT ile test etmek için:**  
- `/api/auth/login` endpointine giriş bilgilerini göndererek token alın.  
- Sonrasında API isteklerine `Authorization: Bearer <TOKEN>` header’ı ekleyin.  

---

## **📌 3. Sonraki Adım?**
1️⃣ **Frontend'de ürün detay sayfasına yorum ekleme ve yorumları listeleme bileşeni yapalım mı?**  
2️⃣ **Admin paneline kullanıcı yorumlarını onaylama/reddetme özelliği ekleyelim mi?**  
3️⃣ **Kullanıcının yorumları için puan ve sıralama ekleyelim mi?**  

Ne yapalım? 🚀