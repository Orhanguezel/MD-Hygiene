import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";

// ✅ Kullanıcıya ait satışları getir
export const getSalesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const sales = await Sale.find({ user: userId })
      .populate("ProductID", "name")
      .populate("StoreID", "name");
    res.json(sales);
  } catch (error) {
    console.error("❌ Satışları getirirken hata:", error);
    res.status(500).json({ error: "Satışları getirirken hata oluştu!" });
  }
};

// ✅ Yeni satış ekleme
export const addSale = async (req, res) => {
  try {
    const { user, ProductID, StoreID, StockSold, TotalSaleAmount } = req.body;

    const product = await Product.findById(ProductID);
    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı!" });
    }

    const store = await Store.findById(StoreID);
    if (!store) {
      return res.status(404).json({ error: "Mağaza bulunamadı!" });
    }

    const newSale = new Sale({
      user,
      ProductID,
      StoreID,
      StockSold,
      TotalSaleAmount,
    });

    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    console.error("❌ Satış eklenirken hata:", error);
    res.status(500).json({ error: "Satış eklenirken hata oluştu!" });
  }
};

// ✅ Tüm satışları getir (Admin için)
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("ProductID", "name")
      .populate("StoreID", "name")
      .populate("user", "name email");
    res.json(sales);
  } catch (error) {
    console.error("❌ Tüm satışları getirirken hata:", error);
    res.status(500).json({ error: "Tüm satışları getirirken hata oluştu!" });
  }
};
