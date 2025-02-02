import mongoose from "mongoose";
import connectDB from "./dbConnect.js";
import Product from "../models/Product.js";

const products = [
  { name: "Toilettenpapier", description: "Hochwertiges Toilettenpapier", price: 4.99, stock: 100, category: "Toilettenpapier", brand: "Tork", unit: "Packung", weight: "1kg", volume: "N/A" },
  { name: "Handpapiertücher", description: "Hochwertige Papierhandtücher", price: 3.49, stock: 150, category: "Handpapiertücher", brand: "Katrin", unit: "Packung", weight: "1.2kg", volume: "N/A" },
  { name: "Seife", description: "Flüssige Handseife", price: 2.99, stock: 200, category: "Seife", brand: "Dove", unit: "Stück", weight: "500g", volume: "500ml" },
  { name: "Handschuhe", description: "Einweg-Handschuhe aus Latex", price: 9.99, stock: 300, category: "Handschuhe", brand: "MediCare", unit: "Packung", weight: "500g", volume: "N/A" },
  { name: "Glasreiniger", description: "Reiniger für streifenfreie Fenster", price: 5.49, stock: 120, category: "Glasreiniger", brand: "Ajax", unit: "Liter", weight: "N/A", volume: "750ml" },
  { name: "Toilettenreiniger", description: "Effektiver WC-Reiniger", price: 6.99, stock: 110, category: "Toilettenreiniger", brand: "Bref", unit: "Liter", weight: "N/A", volume: "1L" },
  { name: "Allzweckreiniger", description: "Vielseitiger Universalreiniger", price: 4.99, stock: 130, category: "Allzweckreiniger", brand: "Frosch", unit: "Liter", weight: "N/A", volume: "1.5L" },
  { name: "SC Gel", description: "Spezialgel für hygienische Reinigung", price: 7.49, stock: 80, category: "SC Gel", brand: "SanitClean", unit: "Kilogramm", weight: "1kg", volume: "N/A" },
  { name: "SC Flüssig", description: "Flüssiges Reinigungskonzentrat", price: 8.99, stock: 90, category: "SC Flüssig", brand: "SanitClean", unit: "Liter", weight: "N/A", volume: "2L" },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Produktdaten erfolgreich eingefügt.");
  } catch (error) {
    console.error("❌ Fehler beim Einfügen der Produkte:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
