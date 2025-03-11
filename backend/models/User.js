import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, select: false},
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
    phone: { 
      type: String, 
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} geçerli bir telefon numarası değil!`,
      },
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    profileImage: { type: String, default: "https://via.placeholder.com/150" },
    isActive: { type: Boolean, default: true },  // Kullanıcı aktif mi?
  },
  { timestamps: true }
);

// Şifreyi kaydetmeden önce hashle
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Şifre doğrulama methodu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
