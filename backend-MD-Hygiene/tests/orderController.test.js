import request from "supertest";
import app from "../server.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

describe("Order API Tests", () => {
  let orderId;
  let productId;
  let userId;
  let token;

  beforeAll(async () => {
    const userRes = await request(app)
      .post("/api/users/register")
      .send({
        name: "Order User",
        email: "orderuser@example.com",
        password: "password123",
      });

    console.log("🔹 User Register Response:", userRes.body);
    userId = userRes.body.user.id;
    token = userRes.body.user.token;

    const productRes = await request(app)
      .post("/api/products")
      .send({
        name: "Order Product",
        description: "A product for order test",
        price: 29.99,
        stock: 5,
        category: "Orders",
      });

    console.log("🔹 Product Create Response:", productRes.body);
    productId = productRes.body._id;
  });

  it("Should create an order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: userId,
        products: [{ product: productId, quantity: 2 }],
        totalAmount: 59.98,
        shippingAddress: "123 Order Street",
      });

    console.log("🔹 Create Order Response:", res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    orderId = res.body._id;
  });

  it("Should get all orders", async () => {
    const res = await request(app).get("/api/orders").set("Authorization", `Bearer ${token}`);
    console.log("🔹 Get All Orders Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should get an order by ID", async () => {
    const res = await request(app).get(`/api/orders/${orderId}`).set("Authorization", `Bearer ${token}`);
    console.log("🔹 Get Order By ID Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", orderId);
  });
});
