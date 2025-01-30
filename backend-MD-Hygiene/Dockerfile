# Backend için Node.js 18 imajı kullan
FROM node:18

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Kodları kopyala
COPY . .

# Backend'in çalışması için başlangıç komutu
CMD ["npm", "start"]

