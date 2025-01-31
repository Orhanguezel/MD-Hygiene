import request from "supertest";
import app from "../server.js";

describe("Mail API Tests", () => {
  it("Should send an email successfully", async () => {
    process.env.NODE_ENV = "test"; // Test ortamını belirtiyoruz

    const res = await request(app)
      .post("/send-email")
      .send({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message.",
      });

    console.log("🔹 Mail Send Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("E-Mail wurde erfolgreich gesendet!");
  });

  it("Should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/send-email").send({
      email: "test@example.com", // Name ve message eksik
    });

    console.log("🔹 Mail Send Error Response:", res.text);
    expect(res.statusCode).toEqual(400);
    expect(res.text).toContain("Fehlende Felder:");
  });

  it("Should handle email sending errors", async () => {
    process.env.NODE_ENV = "production"; // Gerçek SMTP ortamını simüle ediyoruz

    // SMTP hatasını test etmek için gerçek bağlantıyı iptal edelim
    process.env.SMTP_USER = "invalid@example.com";
    process.env.SMTP_PASSWORD = "wrongpassword";

    const res = await request(app).post("/send-email").send({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message.",
    });

    console.log("🔹 Mail Send Failure Response:", res.body);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message", "Fehler beim Senden der E-Mail.");
  });
});
