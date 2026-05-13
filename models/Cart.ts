import mongoose, { models } from "mongoose";

const cartItemSchema = new mongoose.Schema({
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
  final_price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: false,
  },
  // Optional field, useful for showing variations (size, color, etc.)
  variant: {
    type: String,
    required: false,
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "abandoned", "completed"],
      default: "active",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware to calculate total price and quantity automatically
cartSchema.pre("save", function (this: any) {
  if (this.items && Array.isArray(this.items)) {
    this.totalQuantity = this.items.reduce((total: number, item: any) => total + item.quantity, 0);
    this.totalPrice = this.items.reduce((total: number, item: any) => total + (item.quantity * (item.final_price ?? item.price)), 0);
  }
});

const Cart = models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
