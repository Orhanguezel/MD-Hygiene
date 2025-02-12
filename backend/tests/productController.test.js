import request from "supertest";
import app from "../server.js";
import Product from "../models/Product.js";

describe("Product API Tests", () => {
  let productId;

  it("Should create a new product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Test Product",
      description: "A test product",
      price: 19.99,
      stock: 10,
      category: "Test Category",
    });

    console.log("🔹 Create Product Response:", res.body); // Hata logu eklendi
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    productId = res.body._id;
  });

  it("Should get all products", async () => {
    const res = await request(app).get("/api/products");
    console.log("🔹 Get All Products Response:", res.body); // Hata logu eklendi
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should get product by ID", async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    console.log("🔹 Get Product By ID Response:", res.body); // Hata logu eklendi
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", productId);
  });
});
