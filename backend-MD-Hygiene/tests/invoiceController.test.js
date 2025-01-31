import request from "supertest";
import app from "../server.js";
import Order from "../models/Order.js";
import Invoice from "../models/Invoice.js";
import User from "../models/User.js";

describe("Invoice API Tests", () => {
  let invoiceId;
  let orderId;
  let userId;
  let token;
  let productId; // ✅ Ürün ID değişkeni eklendi

  beforeAll(async () => {
    console.log("📌 Kullanıcı oluşturuluyor...");
    const userRes = await request(app).post("/api/users/register").send({
      name: "Invoice User",
      email: "invoiceuser@example.com",
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

    productId = productRes.body._id; // ✅ Ürün ID'sini al
    if (!productId) throw new Error("❌ Ürün oluşturulamadı, test devam edemez!");

    console.log("📌 Test için sipariş ekleniyor...");
    const orderRes = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: userId,
        products: [{ product: productId, quantity: 2 }], // ✅ Gerçek ürün ID'si kullanıldı
        totalAmount: 50.0,
        shippingAddress: "123 Invoice Street",
      });

    orderId = orderRes.body._id;
    if (!orderId) throw new Error("❌ Sipariş oluşturulamadı, test devam edemez!");
  });

  it("✅ Should create an invoice for an order", async () => {
    const res = await request(app)
      .post("/api/invoices")
      .set("Authorization", `Bearer ${token}`)
      .send({
        order: orderId,
        totalAmount: 50.0,
        status: "paid",
      });

    console.log("📌 Fatura oluşturma yanıtı:", res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    invoiceId = res.body._id;
  });

  it("✅ Should get all invoices for the user", async () => {
    const res = await request(app)
      .get("/api/invoices")
      .set("Authorization", `Bearer ${token}`);

    console.log("📌 Kullanıcının faturaları:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("✅ Should get invoice details by ID", async () => {
    const res = await request(app)
      .get(`/api/invoices/${invoiceId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("📌 Fatura detayları:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", invoiceId);
  });

  it("✅ Should prevent unauthorized users from accessing invoices", async () => {
    const res = await request(app)
      .get(`/api/invoices/${invoiceId}`)
      .set("Authorization", "Bearer invalidToken");

    console.log("📌 Yetkisiz erişim yanıtı:", res.body);

    expect(res.statusCode).toEqual(401);
  });
});
