import Store from "../models/Store.js";

// ✅ Tüm mağazaları getir
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    console.error("❌ Mağazaları getirirken hata:", error);
    res.status(500).json({ error: "Mağazaları getirirken hata oluştu!" });
  }
};

// ✅ Yeni mağaza ekle
export const addStore = async (req, res) => {
  try {
    const { name, location, owner } = req.body;
    const newStore = new Store({ name, location, owner });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    console.error("❌ Mağaza eklenirken hata:", error);
    res.status(500).json({ error: "Mağaza eklenirken hata oluştu!" });
  }
};
