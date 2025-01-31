import Order from "../models/Order.js";

// Yeni sipariş oluştur
export const createOrder = async (req, res) => {
    try {
      console.log("📌 Yeni sipariş oluşturuluyor...");
      
      const { user, products, totalAmount, shippingAddress } = req.body;
  
      const order = new Order({
        user,
        products,
        totalAmount,
        shippingAddress,
      });
  
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error("❌ Sipariş oluşturulurken hata:", error);
      res.status(500).json({ message: "Sipariş oluşturulurken hata oluştu.", error: error.message });
    }
  };
  

// Tüm siparişleri getir
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli siparişi getir
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user").populate("products.product");
    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
