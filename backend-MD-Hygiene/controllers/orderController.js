import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// ✅ Yeni sipariş oluştur (Vergi hesaplamalı, stok güncellemesiyle)
export const createOrder = async (req, res) => {
  try {
    console.log("📌 Yeni sipariş oluşturuluyor...");

    const { user, products, totalAmount, shippingAddress, trackingNumber, paymentStatus } = req.body;

    const taxRate = 19; // Almanya standart KDV oranı
    const taxAmount = (totalAmount * taxRate) / 100;
    const finalAmount = totalAmount + taxAmount;

    // 🔍 Ürünleri kontrol et ve stok güncelle
    const enrichedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Ürün bulunamadı: ${item.product}`);

        if (product.stock < item.quantity) throw new Error(`Yetersiz stok: ${product.name}`);

        // ✅ Stok düş
        product.stock -= item.quantity;
        await product.save();

        return {
          product: product._id,
          quantity: item.quantity,
          unitPrice: product.price, // Sipariş anındaki fiyat kaydedilir
        };
      })
    );

    // ✅ Yeni sipariş oluştur
    const order = new Order({
      user,
      products: enrichedProducts,
      totalAmount: finalAmount,
      taxAmount,
      shippingAddress,
      trackingNumber,
      paymentStatus: paymentStatus || "pending",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("❌ Sipariş oluşturulurken hata:", error);
    res.status(500).json({ message: "Sipariş oluşturulurken hata oluştu.", error: error.message });
  }
};

// ✅ Kullanıcının tüm siparişlerini getir
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Siparişler getirilirken hata oluştu!", error: error.message });
  }
};

// ✅ Admin için tüm siparişleri getir (Kapsamlı)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price stock category");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Tüm siparişler getirilirken hata oluştu!", error: error.message });
  }
};

// ✅ Belirli siparişi getir (Tüm detaylarıyla)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price stock category");

    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Sipariş durumu değiştirildiğinde satış olarak kaydet
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı!" });

    // ✅ Eğer sipariş "delivered" olduysa satış olarak kaydet
    if (status === "delivered") {
      await recordSale(order._id);
    }

    res.status(200).json({ message: "Sipariş durumu güncellendi!", order });
  } catch (error) {
    res.status(500).json({ message: "Sipariş durumu güncellenemedi!", error: error.message });
  }
};

// ✅ Sipariş iptal et (Kullanıcı ve Admin için)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });

    // ✅ Sipariş iptal edildiyse stokları geri yükle
    order.products.forEach(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity; // Stokları geri ekle
        await product.save();
      }
    });

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Sipariş iptal edildi", order });
  } catch (error) {
    res.status(500).json({ message: "Sipariş iptal edilemedi!", error: error.message });
  }
};
