import mongoose, { models } from "mongoose";

const usedBySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  usedAt: {
    type: Date,
    default: Date.now,
  },
  orderId: {
    type: String,
    required: true,
  },
});

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
    usedBy: [usedBySchema],
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Promo = models.Promo || mongoose.model("Promo", promoSchema);

export default Promo;
