# Resmi Nginx image kullan
FROM nginx:latest

# Çalışma dizini belirle
WORKDIR /etc/nginx

# Nginx yapılandırma dosyalarını kopyala
COPY nginx.conf /etc/nginx/nginx.conf
COPY sites-available/ /etc/nginx/sites-available/
COPY sites-available/md-hygienelogistik.de /etc/nginx/conf.d/default.conf

# İçeriği sunabilmesi için frontend dosyalarını kopyala
COPY ../frontend-MD-Hygiene/dist/ /usr/share/nginx/html/

# Nginx için varsayılan portu aç
EXPOSE 80

# Nginx başlat
CMD ["nginx", "-g", "daemon off;"]
