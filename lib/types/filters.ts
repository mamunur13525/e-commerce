export interface FilterCategory {
  name: string;
  slug: string;
  count: number;
}

export interface Filters {
  categories: FilterCategory[];
  maxPrice: number;
}
