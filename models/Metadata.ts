import mongoose, { models } from "mongoose";

const ctaButtonSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    bg_color: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const heroSliderSchema = new mongoose.Schema(
  {
    bg_color: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cta_btn: ctaButtonSchema,
    image_url: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const offerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      default: "",
    },
    primary_color: {
      type: String,
      required: true,
    },
    secondary_color: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const discountCardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    bg_color: {
      type: String,
      default: null,
    },
    cta_btn: ctaButtonSchema,
  },
  { _id: false }
);

const metadataSchema = new mongoose.Schema(
  {
    hero_slider: {
      type: heroSliderSchema,
      required: true,
    },
    offers: {
      type: [offerSchema],
      required: true,
    },
    discout_cards: {
      type: [discountCardSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Metadata = models.Metadata || mongoose.model("Metadata", metadataSchema);

export default Metadata;
