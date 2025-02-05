import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Kategoriler alınırken hata oluştu!" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Kategori eklenirken hata oluştu!" });
  }
};

