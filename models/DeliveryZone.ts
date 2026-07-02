import mongoose, { models } from "mongoose";

const deliveryZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: function(this: any) { return !this.allRemaining; },
      trim: true,
    },
    allRemaining: {
      type: Boolean,
      default: false,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    estimatedDelivery: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
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
  }
);

const DeliveryZone = models.DeliveryZone || mongoose.model("DeliveryZone", deliveryZoneSchema);

export default DeliveryZone;