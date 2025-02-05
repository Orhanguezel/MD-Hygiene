import request from "supertest";
import app from "../../backend-MD-Hygiene/server.js";

let categoryId;

describe("Category API Tests", () => {
  it("Should create a category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: `Test Category ${Date.now()}`
    });

    console.log("🔹 Create Category Response:", res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");

    categoryId = res.body._id;
  });

  it("Should get category by ID", async () => {
    expect(categoryId).toBeDefined(); // ✅ Kategori ID'sinin tanımlandığını doğrula
  
    // 🔹 Bekleme süresi ekleyelim
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    const res = await request(app).get(`/api/categories/${categoryId}`);
  
    console.log("🔹 Get Category Response:", res.body);
  
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", categoryId.toString()); // ✅ String formatı
  });
  
  

  it("Should get all categories", async () => {
    const res = await request(app).get("/api/categories");

    console.log("🔹 Get All Categories Response:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

