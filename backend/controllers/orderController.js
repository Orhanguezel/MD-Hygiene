import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ✅ Yeni sipariş oluştur (Vergi hesaplamalı, stok güncellemesiyle)
export const createOrder = async (req, res) => {
  try {
    console.log("📌 Yeni sipariş oluşturuluyor...");

    const { user, products, totalAmount, shippingAddress, trackingNumber, paymentStatus } = req.body;

    if (!user) {
      return res.status(400).json({ message: "🚨 Kullanıcı bilgisi eksik!" });
    }
    
    if (!products || !products.length) {
      return res.status(400).json({ message: "🚨 Ürün listesi eksik veya boş!" });
    }

    // 🔍 Ürünleri kontrol et ve stok güncelle
    const enrichedProducts = await Promise.all(
      products.map(async (item) => {
        if (!item.productId) {
          console.error(`🚨 Ürün ID eksik! Gelen veri: ${JSON.stringify(item)}`);
          throw new Error(`Ürün ID eksik!`);
        }

        // ✅ Ürünü veritabanından çek (populate ile detayları al)
        const product = await Product.findById(item.productId).populate("category");

        console.log("🔍 Ürün verisi:", product);

        if (!product) {
          console.error(`🚨 Ürün bulunamadı: ${item.productId}`);
          throw new Error(`Ürün bulunamadı: ${item.productId}`);
        }

        // ✅ Ürün adını `title` olarak kontrol et
        if (!product.title) {
          console.error(`🚨 Ürün adı eksik: ${item.productId}, Gelen veri:`, product);
          throw new Error(`Ürün adı eksik: ${item.productId}`);
        }

        // ✅ Stok kontrolü
        if (product.stock < item.quantity) {
          console.error(`🚨 Yetersiz stok: ${product.title}`);
          throw new Error(`Yetersiz stok: ${product.title}`);
        }

        // ✅ Stok düş
        product.stock -= item.quantity;
        await product.save();

        return {
          product: product._id,
          name: product.title, // ✅ `name` yerine `title` kullanıldı
          quantity: item.quantity,
          unitPrice: product.price,
          category: product.category?.name || "Bilinmeyen Kategori",
        };
      })
    );

    // ✅ Yeni sipariş oluştur
    const order = new Order({
      user,
      products: enrichedProducts,
      totalAmount,
      taxAmount: (totalAmount * 0.19).toFixed(2),
      shippingAddress: shippingAddress || { street: "", city: "", postalCode: "", country: "" },
      trackingNumber: trackingNumber || "",
      paymentStatus: paymentStatus || "pending",
    });

    const savedOrder = await order.save();
    console.log("✅ Sipariş başarıyla oluşturuldu:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("❌ Sipariş oluşturulurken hata:", error.message);
    res.status(500).json({ message: "🚨 Sipariş oluşturulamadı!", error: error.message });
  }
};





// ✅ Kullanıcının tüm siparişlerini getir
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email")
      .populate({
        path: "products.product",
        select: "name price category", // ✅ Eksik name alanı getirildi
      });

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
      .populate({
        path: "products.product",
        select: "name price stock category",
      });

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
      .populate({
        path: "products.product",
        select: "name price stock category",
      });

    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Sipariş durumu güncelleme
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(`📌 Güncellenen Sipariş ID: ${req.params.id} - Yeni Durum: ${status}`);

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "🚨 Sipariş bulunamadı!" });

    // ✅ **Sadece geçerli statülerde güncelleme yap**
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled", "archived"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `🚨 Geçersiz sipariş durumu: ${status}` });
    }

    order.status = status;
    await order.save();

    res.json({ message: "✅ Sipariş durumu başarıyla güncellendi!", order });
  } catch (error) {
    res.status(500).json({ message: "🚨 Sipariş güncellenirken hata oluştu!", error: error.message });
  }
};


// ✅ Sipariş iptal et (Kullanıcı ve Admin için)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Sipariş bulunamadı" });

    // ✅ Sipariş iptal edildiyse stokları geri yükle
    await Promise.all(
      order.products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity; // Stokları geri ekle
          await product.save();
        }
      })
    );

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Sipariş iptal edildi", order });
  } catch (error) {
    res.status(500).json({ message: "Sipariş iptal edilemedi!", error: error.message });
  }
}