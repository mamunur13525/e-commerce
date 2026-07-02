export interface HeroSlider {
  image_url: string;
  link?: string;
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

export interface Category {
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  count: number
}
export interface Metadata {
  _id: {
    $oid: string;
  };
  hero_slider: HeroSlider;
  offers: Offer[];
  discout_cards: DiscountCard[];
  categories: Category[];
}
