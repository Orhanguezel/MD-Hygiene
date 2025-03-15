import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /.+\@.+\..+/ 
    },
    password: { type: String, required: true, select: false }, // Şifre hashlenerek kaydedilecek
    role: { 
      type: String, 
      enum: ["admin", "user", "customer", "moderator", "staff"], 
      default: "user" 
    },
    addresses: [
      {
        street: String,
        city: String,
        postalCode: String,
        country: String,
        isDefault: { type: Boolean, default: false },
      }
    ],
    phone: { type: String }, // ✅ Telefon validasyonu tamamen kaldırıldı
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    profileImage: { type: String, default: "https://via.placeholder.com/150" },
    isActive: { type: Boolean, default: true },

    // ✅ **Yeni Alanlar**
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Kullanıcının favori ürünleri
    bio: { type: String, default: "" }, // Kullanıcı hakkında kısa bilgi
    birthDate: { type: Date }, // Kullanıcının doğum tarihi
    socialMedia: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" }
    },
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
    }
  },
  { timestamps: true }
);

// ✅ **Şifreyi kaydetmeden önce hashle**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Şifre değiştirilmemişse, tekrar hashleme

  // Eğer şifre zaten hashlenmişse tekrar hashleme
  if (this.password.startsWith("$2b$10$")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


// ✅ **Şifre doğrulama metodu**
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false; // Eğer hata olursa giriş başarısız kabul edilir
  }
};

// ✅ **Şifre hashlenmiş mi kontrol et**
userSchema.methods.isPasswordHashed = function () {
  return this.password.startsWith("$2b$10$"); // bcrypt hash formatı kontrolü
};

const User = mongoose.model("User", userSchema);
export default User;
