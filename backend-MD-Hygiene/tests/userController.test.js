import request from "supertest";
import app from "../server.js";
import User from "../models/User.js";

describe("User API Tests", () => {
  let token;

  it("Should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });

    console.log("🔹 Register Response:", res.body); // HATA LOGU EKLENDİ
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });

  it("Should login and return a token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "testuser@example.com",
        password: "password123",
      });

    console.log("🔹 Login Response:", res.body); // HATA LOGU EKLENDİ
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user.token");
    token = res.body.user.token;
  });

  it("Should get user profile with valid token", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    console.log("🔹 Profile Response:", res.body); // HATA LOGU EKLENDİ
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });
});
