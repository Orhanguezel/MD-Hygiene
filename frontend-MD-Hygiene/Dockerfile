# 1️⃣ Node'un en küçük ve hızlı versiyonunu kullan
FROM node:20-alpine

# 2️⃣ Çalışma dizinini ayarla
WORKDIR /app

# 3️⃣ Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# 4️⃣ Kodları kopyala
COPY . .

# 5️⃣ Production build oluştur
RUN npm run build

# 6️⃣ Serve kullanarak frontend’i başlat
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
