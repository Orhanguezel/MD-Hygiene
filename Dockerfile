# Kullanılacak base image (Node.js LTS sürümü)
FROM node:18

# Çalışma dizinini oluştur
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Uygulama kodlarını kopyala
COPY . .

# API ve frontend build işlemlerini yap
RUN cd backend && npm install
RUN cd frontend && npm install && npm run build

# Backend servisini başlat
CMD ["node", "backend/server.js"]
