export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  hasDiscount: boolean;
  discount: number;
  discountType: "amount" | "percentage";
  final_price: number;
  quantity: number;
  weight: string;
  category: string;
  hasSizes: boolean;
  sizes: string[];
  hasColors: boolean;
  colors: Array<{ name: string; code: string }>;
  image: { url: string };
  images: Array<{ url: string }>;
  currency: string;
}

export const defaultValues: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  hasDiscount: false,
  discount: 0,
  discountType: "percentage",
  final_price: 0,
  quantity: 0,
  weight: "",
  category: "",
  hasSizes: false,
  sizes: [],
  hasColors: false,
  colors: [],
  image: { url: "" },
  images: [],
  currency: "BDT",
};
