import mongoose, { models } from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    required: false,
  },
});

const deliveryAddressSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: "Bangladesh" },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    deliveryAddress: {
      type: deliveryAddressSchema,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    promoCode: {
      code: {
        type: String,
        required: false,
        uppercase: true,
        trim: true,
      },
      discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: false,
      },
      discountValue: {
        type: Number,
        required: false,
        min: 0,
      },
      maxDiscount: {
        type: Number,
        required: false,
        default: null,
      },
    },
    promoDiscount: {
      type: Number,
      default: 0,
    },
    taxes: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "STRIPE"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      default: "unpaid",
    },
    stripeSessionId: {
      type: String,
      required: false,
    },
    orderId: {
      type: String,
      unique: true,
    },
    vendor: {
      storeName: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;
