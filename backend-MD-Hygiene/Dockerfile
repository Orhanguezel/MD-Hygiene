# Node.js Alpine sürümü ile başlat
FROM node:18-alpine

# Çalışma dizini oluştur
WORKDIR /app

# Package.json ve bağımlılıkları kopyala
COPY package.json package-lock.json ./

# Üretim bağımlılıklarını yükle
RUN npm install --only=production

# Proje dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["node", "server.js"]



