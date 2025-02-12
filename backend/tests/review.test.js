let productId;

beforeAll(async () => {
  const productRes = await request(app).post("/api/products").send({
    name: "Test Product",
    description: "A sample product",
    price: 19.99,
    stock: 5,
    category: "Toilettenpapier",
    brand: "Test Brand",
    unit: "Stück"
  });

  productId = productRes.body._id;
  console.log("🔹 Created Product ID:", productId);
});

it("Should create a review", async () => {
  expect(productId).toBeDefined(); // ✅ Ürün oluşturulduğuna emin ol
  const res = await request(app).post("/api/reviews").send({
    productId: productId, // ✅ Doğru ürün ID'si
    rating: 5,
    comment: "Harika bir ürün!"
  });

  console.log("🔹 Review Response:", res.body);

  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty("_id");
});

describe("Review API Tests", () => {
  it("Should create a review", async () => {
    expect(productId).toBeDefined(); // ✅ ID'nin oluştuğunu kontrol et
    const res = await request(app).post("/api/reviews").send({
      productId: productId,
      rating: 5,
      comment: "Excellent product!"
    });

    console.log("🔹 Review Response:", res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");

    reviewId = res.body._id;
  });

  it("Should get reviews for a product", async () => {
    expect(productId).toBeDefined();
    const res = await request(app).get(`/api/reviews/${productId}`);

    console.log("🔹 Get Reviews Response:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should get review by ID", async () => {
    expect(reviewId).toBeDefined();
    const res = await request(app).get(`/api/reviews/${reviewId}`);

    console.log("🔹 Get Review By ID Response:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", reviewId);
  });
});

