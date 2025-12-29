import mongoose, { models } from "mongoose";

const promoSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      default: null, // No max limit if null
    },
    minOrderAmount: {
      type: Number,
      default: 0, // No minimum if 0
    },
    maxUsageCount: {
      type: Number,
      default: null, // Unlimited if null
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicableToFirstOrder: {
      type: Boolean,
      default: false,
    },
    specificProductIds: {
      type: [String],
      default: [], // Empty array means applicable to all products
    },
    specificCategoryIds: {
      type: [String],
      default: [], // Empty array means applicable to all categories
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Promo = models.Promo || mongoose.model("Promo", promoSchema);

export default Promo;
