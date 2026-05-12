import mongoose, { models } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubOrder",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    images: [
      {
        url: String,
        id: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Ensure a user can only review a product once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = models.Review || mongoose.model("Review", reviewSchema);

export default Review;
