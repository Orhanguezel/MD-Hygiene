import request from "supertest";
import app from "../server.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

describe("Payment API Tests", () => {
  let paymentId;
  let orderId;
  let userId;
  let token;
  let productId; // ✅ Ürün ID eklendi

  beforeAll(async () => {
    console.log("📌 Kullanıcı oluşturuluyor...");
    const userRes = await request(app).post("/api/users/register").send({
      name: "Payment User",
      email: "paymentuser@example.com",
      password: "password123",
    });

    userId = userRes.body.user?.id;
    token = userRes.body.user?.token;

    if (!userId || !token) {
      throw new Error("❌ Kullanıcı oluşturulamadı, test devam edemez!");
    }

    console.log("📌 Test için ürün ekleniyor...");
    const productRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        description: "A test product",
        price: 29.99,
        stock: 10,
        category: "Test Category",
      });

    productId = productRes.body._id;
    if (!productId) throw new Error("❌ Ürün oluşturulamadı, test devam edemez!");

    console.log("📌 Test için sipariş ekleniyor...");
    const orderRes = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: userId,
        products: [{ product: productId, quantity: 2 }], // ✅ Düzeltildi!
        totalAmount: 50.0,
        shippingAddress: "123 Payment Street",
      });

    orderId = orderRes.body._id;
    if (!orderId) throw new Error("❌ Sipariş oluşturulamadı, test devam edemez!");
  });

  it("✅ Should create a payment for an order", async () => {
    const res = await request(app)
      .post("/api/payments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        order: orderId,
        amount: 50.0,
        paymentMethod: "credit_card",
        transactionId: "txn_12345",
      });

    console.log("📌 Ödeme oluşturma yanıtı:", res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    paymentId = res.body._id;
  });

  it("✅ Should get all payments for the user", async () => {
    const res = await request(app)
      .get("/api/payments")
      .set("Authorization", `Bearer ${token}`);

    console.log("📌 Kullanıcının ödemeleri:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("✅ Should get payment details by ID", async () => {
    const res = await request(app)
      .get(`/api/payments/${paymentId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("📌 Ödeme detayları:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", paymentId);
  });

  it("✅ Should prevent unauthorized users from accessing payments", async () => {
    const res = await request(app)
      .get(`/api/payments/${paymentId}`)
      .set("Authorization", "Bearer invalidToken");

    console.log("📌 Yetkisiz erişim yanıtı:", res.body);

    expect(res.statusCode).toEqual(401);
  });
});
