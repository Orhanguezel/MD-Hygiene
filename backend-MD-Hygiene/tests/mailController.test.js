import request from "supertest";
import app from "../server.js";
import { connectDB, disconnectDB } from "../config/db.js";




beforeAll(async () => {
  console.log("🔹 Jest Testleri için MongoDB bağlantısı kuruluyor...");
  await connectDB();
});

afterAll(async () => {
  console.log("🔹 Jest Testleri tamamlandı, MongoDB bağlantısı kapatılıyor...");
  await disconnectDB();
});


describe("Mail API Tests", () => {
  it("Should send an email successfully", async () => {
    const res = await request(app)
      .post("/api/mail/send-email")  // ✅ Doğru endpoint
      .send({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message.",
      });

    console.log("🔹 Mail Send Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "E-Mail wurde erfolgreich gesendet!");
  });

  it("Should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/mail/send-email").send({
      email: "test@example.com", // Name ve message eksik
    });

    console.log("🔹 Mail Send Error Response:", res.text);
    expect(res.statusCode).toEqual(400);
    expect(res.text).toContain("Fehlende Felder!");
  });

  it("Should handle email sending errors", async () => {
    process.env.SMTP_USER = "invalid@example.com";
    process.env.SMTP_PASSWORD = "wrongpassword";

    const res = await request(app).post("/api/mail/send-email").send({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message.",
    });

    console.log("🔹 Mail Send Failure Response:", res.body);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("error", "Fehler beim Senden der E-Mail.");
  });
});
