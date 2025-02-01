# 1️⃣ Production için daha hafif bir Node.js sürümü kullan
FROM node:18-alpine

# 2️⃣ Çalışma dizinini ayarla
WORKDIR /app

# 3️⃣ Sadece package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# 4️⃣ Production bağımlılıklarını yükle (devDependencies dahil değil)
RUN npm install --only=production

# 5️⃣ Tüm kodları kopyala
COPY . .

# 6️⃣ Port tanımla (Docker Compose içinde de belirtilecek)
EXPOSE 5010

# 7️⃣ Backend'i production modda başlat
CMD ["node", "server.js"]


