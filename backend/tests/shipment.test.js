import request from "supertest";
import app from "../../backend-MD-Hygiene/server.js";

let shipmentId;

describe("Shipment API Tests", () => {
  it("Should create a new shipment", async () => {
    const res = await request(app).post("/api/shipments").send({
      order: "679fe161c8a1387eeb941cfe",
      trackingNumber: `TRK-${Date.now()}`,
      status: "pending"
    });

    console.log("🔹 Shipment Create Response:", res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");

    shipmentId = res.body._id; // ✅ ID'yi test için sakla
  });

  it("Should get all shipments", async () => {
    const res = await request(app).get("/api/shipments");

    console.log("🔹 Get All Shipments Response:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Should get shipment by ID", async () => {
    expect(shipmentId).toBeDefined(); // ✅ ID'nin tanımlandığını doğrula
  
    // 🔹 Yeni bir bekleme ekleyelim (100ms)
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    const res = await request(app).get(`/api/shipments/${shipmentId}`);
  
    console.log("🔹 Get Shipment By ID Response:", res.body);
  
    expect(res.statusCode).toEqual(200); // ✅ 200 bekleniyor
    expect(res.body).toHaveProperty("_id", shipmentId); // ✅ ID doğrulaması
  });
  
  
});

