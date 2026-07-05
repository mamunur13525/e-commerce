import mongoose, { models } from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    onlinePaymentDiscount: {
      type: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "percentage",
      },
      value: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    tax: {
      type: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "percentage",
      },
      value: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Settings = models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;