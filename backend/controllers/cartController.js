import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";


// 📌 Kullanıcının sepetini getir
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "🚨 Sepet yüklenirken hata oluştu!", error: error.message });
  }
};

// ✅ **Sepete Ürün Ekleme**
export const addToCart = async (req, res) => {
  try {
    if (!req.body.productId) {
      return res.status(400).json({ message: "🚨 Ürün ID eksik!" });
    }

    // ✅ `productId` değerini `ObjectId` olarak kullan
    const productId = new mongoose.Types.ObjectId(req.body.productId);

    const newItem = {
      product: productId,
      quantity: req.body.quantity || 1,
      price: req.body.price,
      title: req.body.title,
      images: req.body.images || [],
    };

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $push: { items: newItem } },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "✅ Ürün sepete eklendi!", cart });
  } catch (error) {
    res.status(500).json({ message: "🚨 Ürün sepete eklenemedi!", error: error.message });
  }
};




// 🔺 **Miktar Artır**
export const increaseQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "🚨 Sepet bulunamadı!" });

    const item = cart.items.find((item) => item.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: "🚨 Ürün bulunamadı!" });

    item.quantity += 1;
    await cart.save();
    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "🚨 Miktar artırılamadı!", error: error.message });
  }
};

// 🔻 **Miktar Azalt**
export const decreaseQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "🚨 Sepet bulunamadı!" });

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === req.params.productId);
    if (itemIndex === -1) return res.status(404).json({ message: "🚨 Ürün bulunamadı!" });

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "🚨 Miktar azaltılamadı!", error: error.message });
  }
};

// ❌ **Sepetten Ürün Kaldır**
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "🚨 Sepet bulunamadı!" });

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
    await cart.save();

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "🚨 Ürün sepetten kaldırılamadı!", error: error.message });
  }
};

// 🗑️ **Sepeti Temizle**
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "🚨 Sepet bulunamadı!" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "✅ Sepet başarıyla temizlendi!" });
  } catch (error) {
    res.status(500).json({ message: "🚨 Sepet temizlenemedi!", error: error.message });
  }
};
