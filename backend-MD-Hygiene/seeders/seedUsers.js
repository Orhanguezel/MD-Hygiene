import mongoose from "mongoose";
import connectDB from "./dbConnect.js";
import User from "../models/User.js";

const users = [
  { name: "Admin User", email: "admin@md-hygiene.de", password: "admin123", role: "admin", address: "Berlin, Almanya", phone: "+49 123 4567890" },
  { name: "Orhan Güzel", email: "orhan@md-hygiene.de", password: "orhan123", role: "customer", address: "Hamburg, Almanya", phone: "+49 176 9876543" },
  { name: "Ayşe Yılmaz", email: "ayse@md-hygiene.de", password: "ayse123", role: "customer", address: "Münih, Almanya", phone: "+49 174 4563210" },
];

const seedUsers = async () => {
  await connectDB();
  await User.deleteMany();
  await User.insertMany(users);
  console.log("✅ Kullanıcı verileri başarıyla eklendi.");
  mongoose.connection.close();
};

seedUsers();

