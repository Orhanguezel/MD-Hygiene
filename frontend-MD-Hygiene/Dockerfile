# Frontend için base image
FROM node:18

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# React uygulamasını build et
COPY . .
RUN npm run build

# Frontend’i sunucu olarak çalıştır (React için)
CMD ["npx", "serve", "-s", "build"]
