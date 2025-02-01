# Node.js 20 Alpine sürümü ile başlat
FROM node:20-alpine

# Çalışma dizinini belirle
WORKDIR /app

# package.json ve bağımlılıkları kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm install

# `serve` paketini global olarak yükle (📌 Yeni eklendi)
RUN npm install -g serve

# Proje dosyalarını kopyala
COPY . .

# Frontend build işlemini gerçekleştir
RUN npm run build

# `dist` klasörünü doğrula (kontrol amaçlı)
RUN ls -la dist

# `serve` paketi ile statik dosyaları sun (📌 Güncellendi)
CMD ["serve", "-s", "dist", "-l", "3003"]
