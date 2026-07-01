import { FiltersSkeleton } from "./filters-skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

const ShoppingPageSkeleton = () => {
  return (
    <div className="flex gap-6 items-start">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-1/5 shrink-0 top-24 sticky">
        <FiltersSkeleton />
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPageSkeleton;
