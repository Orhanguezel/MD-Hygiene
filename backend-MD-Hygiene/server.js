import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Ortam değişkenlerine göre MongoDB bağlantısını seç
const mongoURI = process.env.NODE_ENV === 'production' 
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`✅ MongoDB bağlantısı başarılı: ${mongoURI}`))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));


const app = express(); // 🔴 `express` modülü burada tekrar tanımlanmamalı

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('🚀 Backend API Çalışıyor!');
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor!`));
