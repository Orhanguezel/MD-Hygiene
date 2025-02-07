import Category from "../models/Category.js";

// ✅ Tüm kategorileri alt kategorileriyle birlikte getir
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategoryId", "name description");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Kategoriler alınırken hata oluştu!", error: error.message });
  }
};

// ✅ Belirli bir kategoriyi getir (Alt kategori bilgileriyle birlikte)
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parentCategoryId", "name description");

    if (!category) {
      return res.status(404).json({ message: "Kategori bulunamadı!" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Kategori alınırken hata oluştu!", error: error.message });
  }
};

// ✅ Yeni kategori ekle (Eksiksiz)
export const addCategory = async (req, res) => {
  try {
    const { name, description, parentCategoryId } = req.body;

    // Eğer bir üst kategori ID'si belirtilmişse, onun var olup olmadığını kontrol et
    if (parentCategoryId) {
      const existingCategory = await Category.findById(parentCategoryId);
      if (!existingCategory) {
        return res.status(400).json({ message: "Geçersiz üst kategori ID!" });
      }
    }

    const newCategory = new Category({ name, description, parentCategoryId });
    await newCategory.save();

    res.status(201).json({ message: "Kategori başarıyla oluşturuldu!", newCategory });
  } catch (error) {
    res.status(500).json({ error: "Kategori eklenirken hata oluştu!", error: error.message });
  }
};

// ✅ Kategori güncelleme (Eksiksiz)
export const updateCategory = async (req, res) => {
  try {
    const { name, description, parentCategoryId } = req.body;

    // Eğer bir üst kategori ID'si belirtilmişse, onun var olup olmadığını kontrol et
    if (parentCategoryId) {
      const existingCategory = await Category.findById(parentCategoryId);
      if (!existingCategory) {
        return res.status(400).json({ message: "Geçersiz üst kategori ID!" });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, parentCategoryId },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Kategori bulunamadı!" });
    }

    res.status(200).json({ message: "Kategori başarıyla güncellendi!", updatedCategory });
  } catch (error) {
    res.status(500).json({ error: "Kategori güncellenirken hata oluştu!", error: error.message });
  }
};

// ✅ Kategori silme (Bağlı alt kategorileri güncelle)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Kategori bulunamadı!" });
    }

    // 🔍 Eğer bu kategori başka bir kategorinin üst kategorisi ise, alt kategorilerin üst kategori referansını kaldır
    await Category.updateMany({ parentCategoryId: req.params.id }, { parentCategoryId: null });

    await category.remove();

    res.status(200).json({ message: "Kategori başarıyla silindi!" });
  } catch (error) {
    res.status(500).json({ error: "Kategori silinirken hata oluştu!", error: error.message });
  }
};


