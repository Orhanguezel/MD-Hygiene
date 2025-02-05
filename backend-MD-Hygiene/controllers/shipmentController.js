import Shipment from "../models/Shipment.js";


export const addShipment = async (req, res) => {
  try {
    const { order, status, trackingNumber } = req.body;

    if (!trackingNumber) {
      return res.status(400).json({ error: "Tracking number is required!" });
    }

    const newShipment = new Shipment({ order, status, trackingNumber });
    await newShipment.save();

    res.status(201).json(newShipment);
  } catch (error) {
    console.error("🔴 Kargo ekleme hatası:", error);
    res.status(500).json({ error: "Kargo eklenirken hata oluştu!" });
  }
};


export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ error: "Kargolar alınırken hata oluştu!" });
  }
};
