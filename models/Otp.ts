import mongoose, { models } from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "20m" }, // TTL index, auto delete after 20 minutes
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Otp = models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;
