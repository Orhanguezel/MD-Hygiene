# 1️⃣ Node.js 20 Alpine sürümü ile başlat
FROM node:20-alpine

# 2️⃣ Çalışma dizinini belirle
WORKDIR /app

# 3️⃣ package.json ve bağımlılıkları kopyala
COPY package.json package-lock.json ./

# 4️⃣ Bağımlılıkları yükle
RUN npm install

# 5️⃣ Proje dosyalarını kopyala
COPY . .

# 6️⃣ Frontend build işlemini gerçekleştir
RUN npm run build

# 7️⃣ `dist` klasörünü doğrula (kontrol amaçlı)
RUN ls -la dist

# 8️⃣ Serve paketi ile statik dosyaları sun
RUN npm install -g serve

# 9️⃣ `dist` klasörünü root klasör olarak belirle
CMD ["serve", "-s", "dist", "-l", "3000"]

