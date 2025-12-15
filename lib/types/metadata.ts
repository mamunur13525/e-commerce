export interface CTAButton {
  color: string;
  text: string;
  bg_color: string;
  link: string;
}

export interface HeroSlider {
  bg_color: string;
  title: string;
  description: string;
  cta_btn: CTAButton;
  image_url: string;
}

export interface Offer {
  _id: string;
  sub_title: string;
  title: string;
  description: string;
  product_image: string;
  primary_color: string;
  secondary_color: string;
}

export interface DiscountCard {
  _id: string;
  type: string;
  icon: string;
  title: string;
  description: string;
  bg_color?: string;
  cta_btn: CTAButton;
}

export interface Metadata {
  _id: {
    $oid: string;
  };
  hero_slider: HeroSlider;
  offers: Offer[];
  discout_cards: DiscountCard[];
}
