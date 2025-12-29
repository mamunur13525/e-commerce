import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: any) {
        return !this.googleId; // Password required only if not Google user
      },
    },
    googleId: {
      type: String,
      sparse: true,
    },
    image: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    addresses: [
      {
        full_name: {
          type: String,
          required: true,
          trim: true,
        },
        street: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        zip: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          default: "United States",
          trim: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    cart: {
      type: [
        {
          productId: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
            min: 1,
          },
        },
      ],
      required: false,
      default: [],
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash password before saving
userSchema.pre("save", async function (this: any) {
  // Skip if password is not modified or doesn't exist
  if (!this.isModified("password") || !this.password) {
    return;
  }

  // Skip hashing if already hashed (starts with $2a$, $2b$, or $2y$ - bcrypt hash prefix)
  if (
    this.password.startsWith("$2a$") ||
    this.password.startsWith("$2b$") ||
    this.password.startsWith("$2y$")
  ) {
    return;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || mongoose.model("User", userSchema);

export default User;
