import Offer from "../models/Offer.js";
import Product from "../models/Product.js";

// ✅ Yeni teklif oluştur
export const createOffer = async (req, res) => {
  try {
    const { user, items } = req.body;

    let totalAmount = 0;
    const enrichedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Ürün bulunamadı: ${item.product}`);

      const unitPrice = product.price;
      totalAmount += unitPrice * item.quantity;

      return {
        product: product._id,
        quantity: item.quantity,
        unitPrice
      };
    }));

    const taxAmount = (totalAmount * 19) / 100;
    const finalAmount = totalAmount + taxAmount;

    const offer = new Offer({
      user,
      items: enrichedItems,
      totalAmount: finalAmount,
      taxAmount,
      status: "pending", // 📌 Varsayılan durum: Beklemede
    });

    await offer.save();
    res.status(201).json({ message: "Teklif başarıyla oluşturuldu!", offer });
  } catch (error) {
    res.status(500).json({ message: "Teklif oluşturulurken hata oluştu!", error: error.message });
  }
};

// ✅ Teklifleri listele
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("user", "name email").populate("items.product", "name price");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Teklifler getirilemedi!", error: error.message });
  }
};

// ✅ Belirli bir teklifi getir
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate("user", "name email").populate("items.product", "name price");

    if (!offer) return res.status(404).json({ message: "Teklif bulunamadı!" });

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Teklif getirilemedi!", error: error.message });
  }
};

// ✅ Teklifi güncelle
export const updateOffer = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;
    const enrichedItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Ürün bulunamadı: ${item.product}`);

      const unitPrice = product.price;
      totalAmount += unitPrice * item.quantity;

      return {
        product: product._id,
        quantity: item.quantity,
        unitPrice
      };
    }));

    const taxAmount = (totalAmount * 19) / 100;
    const finalAmount = totalAmount + taxAmount;

    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { items: enrichedItems, totalAmount: finalAmount, taxAmount },
      { new: true }
    );

    if (!offer) return res.status(404).json({ message: "Teklif bulunamadı!" });

    res.status(200).json({ message: "Teklif başarıyla güncellendi!", offer });
  } catch (error) {
    res.status(500).json({ message: "Teklif güncellenemedi!", error: error.message });
  }
};

// ✅ Teklif onaylama veya reddetme
export const updateOfferStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Geçersiz durum güncellemesi!" });
    }

    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!offer) return res.status(404).json({ message: "Teklif bulunamadı!" });

    res.status(200).json({ message: `Teklif ${status === "approved" ? "onaylandı" : "reddedildi"}!`, offer });
  } catch (error) {
    res.status(500).json({ message: "Teklif durumu güncellenemedi!", error: error.message });
  }
};

// ✅ Teklifi sil
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: "Teklif bulunamadı!" });

    res.status(200).json({ message: "Teklif başarıyla silindi!" });
  } catch (error) {
    res.status(500).json({ message: "Teklif silinemedi!", error: error.message });
  }
};
