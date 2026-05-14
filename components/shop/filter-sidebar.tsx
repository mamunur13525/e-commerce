"use client";

import { useState, Suspense, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DeliveryTruck01Icon,
  HeadphonesIcon,
  RefreshIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import { FiltersSkeleton } from "@/components/skeleton/filters-skeleton";
import { useFilters } from "@/hooks";

export function FilterSidebar() {
  return (
    <Suspense fallback={<FiltersSkeleton />}>
      <FilterSidebarContent />
    </Suspense>
  );
}

function FilterSidebarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Fetch filters using TanStack Query
  const { data: filters, isLoading } = useFilters();
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || filters?.maxPrice || 500),
  ]);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const priceDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPriceRange([
      Number(searchParams.get("minPrice") || 0),
      Number(searchParams.get("maxPrice") || filters?.maxPrice || 500),
    ]);
  }, [searchParams, filters]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
    };
  }, []);

  // Helper for category toggle
  const toggleCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentCategories = params.get("category")?.split(",") || [];

    if (currentCategories.includes(slug)) {
      const updatedCategories = currentCategories.filter((cat) => cat !== slug);
      if (updatedCategories.length > 0) {
        params.set("category", updatedCategories.join(","));
      } else {
        params.delete("category");
      }
    } else {
      currentCategories.push(slug);
      params.set("category", currentCategories.join(","));
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Debounced URL update for price range
  const commitPriceToUrl = useCallback(
    (val: number[]) => {
      if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);

      priceDebounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (val[0] > 0) {
          params.set("minPrice", val[0].toString());
        } else {
          params.delete("minPrice");
        }

        if (val[1] < (filters?.maxPrice || 1000)) {
          params.set("maxPrice", val[1].toString());
        } else {
          params.delete("maxPrice");
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 800);
    },
    [searchParams, filters?.maxPrice, pathname, router],
  );

  // Handle price range changes — update state immediately, debounce URL
  const handlePriceChange = (value: number | readonly number[]) => {
    const val = value as number[];
    setPriceRange(val);
    commitPriceToUrl(val);
  };

  // Check if category is active
  const isCategoryActive = (slug: string) => {
    const currentCategories = searchParams.get("category")?.split(",") || [];
    return currentCategories.includes(slug);
  };

  // Toggle filter
  const toggleFilter = (section: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(section);

    if (current === value) {
      params.delete(section);
    } else {
      params.set(section, value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (isLoading) {
    return <FiltersSkeleton />;
  }

  const calculateStep = () => {
    if (priceRange) {
      const max = priceRange[1];
      if (max < 100) {
        return 10;
      }
      if (max < 1000) {
        return 100;
      }
    }
    return 1000;
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#003d29]">Filters</h2>
      </div>

      <Accordion
        multiple={true}
        defaultValue={["categories", "price", "rating"]}
        className="w-full"
      >
        {/* Categories */}
        <AccordionItem value="categories" className="border-b-gray-100">
          <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {filters?.categories?.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={cat.slug}
                      checked={isCategoryActive(cat.slug)}
                      onCheckedChange={() => toggleCategory(cat.slug)}
                      className="rounded-lg border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
                    />
                    <label
                      htmlFor={cat.slug}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 group-hover:text-[#003d29] cursor-pointer"
                    >
                      {cat.name}
                    </label>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full font-medium group-hover:bg-[#e0e0e0]">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price" className="border-b-gray-100">
          <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-2 py-4">
              <Slider
                defaultValue={[0, filters?.maxPrice || 500]}
                max={filters?.maxPrice || 1000}
                step={calculateStep()}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="cursor-pointer  [&_.block]:bg-[#003d29] [&_.block]:border-white [&_.block]:ring-4 [&_.block]:ring-[#aedf4d] [&_.h-2]:bg-gray-100 [&_.h-2]:h-1"
              />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange([Number(e.target.value), priceRange[1]])
                  }
                  className="pl-6 h-9 bg-white border-gray-200 rounded-full text-sm"
                />
              </div>
              <span className="text-sm text-gray-500 font-medium">To</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange([priceRange[0], Number(e.target.value)])
                  }
                  className="pl-6 h-9 bg-white border-gray-200 rounded-full text-sm"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-b-gray-100">
          <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">
            Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const selectedRating = Number(searchParams.get("rating") || 0);
                return (
                  <button
                    key={star}
                    onClick={() => toggleFilter("rating", star.toString())}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    className={cn(
                      "w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center border transition-all duration-200 cursor-pointer",
                      hoveredRating
                        ? hoveredRating >= star
                          ? "bg-[#003d29] text-white border-[#003d29] shadow-md"
                          : ""
                        : selectedRating >= star
                          ? "bg-[#003d29] text-white border-[#003d29] shadow-md"
                          : "",
                    )}
                  >
                    {star}★
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-6" />

      {/* Static Benefits */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <DeliveryTruck01Icon className="size-6 text-[#003d29] shrink-0" />
          <div>
            <h4 className="font-bold text-[#003d29] text-sm">Free Shipping</h4>
            <p className="text-xs text-gray-500">On all orders over $100</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <HeadphonesIcon className="size-6 text-[#003d29] shrink-0" />
          <div>
            <h4 className="font-bold text-[#003d29] text-sm">Plant Support</h4>
            <p className="text-xs text-gray-500">Expert advice 24/7</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <RefreshIcon className="size-6 text-[#003d29] shrink-0" />
          <div>
            <h4 className="font-bold text-[#003d29] text-sm">
              Healthy Plant Guarantee
            </h4>
            <p className="text-xs text-gray-500">30-day happiness warranty</p>
          </div>
        </div>
      </div>
    </div>
  );
}
