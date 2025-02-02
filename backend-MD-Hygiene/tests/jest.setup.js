import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  console.log("🔹 Jest Testleri için MongoDB bağlantısı kuruluyor...");
  
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Eğer zaten bağlantı varsa, eski bağlantıyı kapat
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`✅ Test ortamı için MongoDB bağlantısı kuruldu: ${mongoUri}`);
});

afterAll(async () => {
  console.log("🔹 Jest Testleri tamamlandı, MongoDB bağlantısı kapatılıyor...");
  await mongoose.connection.close();
  await mongoServer.stop();
  console.log("🔌 Test için kullanılan MongoDB kapatıldı.");
});
