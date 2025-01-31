# Frontend için doğru Node.js sürümü
FROM node:20-alpine

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# React uygulamasını build et
COPY . .
RUN npm run build

# Frontend’i sunucu olarak çalıştır (React için)
CMD ["npx", "serve", "-s", "dist"]
