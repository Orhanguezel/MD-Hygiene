import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

// **Test ortamında `.env.test` dosyasını yükleyelim**
dotenv.config({ path: "./.env.test" });

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`✅ Test ortamı için MongoDB bağlantısı kuruldu: ${mongoUri}`);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();

  console.log("📌 Test ortamı kapatıldı.");
});
