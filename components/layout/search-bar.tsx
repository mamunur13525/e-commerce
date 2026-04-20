"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { ArrowRight01Icon, Cancel01Icon, Search01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import {
  searchSite,
  getPopularSearches,
  getCategoryInfo,
  type SearchResult,
  type PopularSearch,
  type CategoryInfo,
} from "@/app/actions/search";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [height, setHeight] = useState<number | "auto">("auto");
  const [popularSearches, setPopularSearches] = useState<PopularSearch[]>([]);
  const [popularLoaded, setPopularLoaded] = useState(false);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  // Internal loading state that combines transition and debounce delay
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Prefetch popular searches and categories on mount so they're ready instantly
  useEffect(() => {
    if (!popularLoaded) {
      Promise.all([getPopularSearches(), getCategoryInfo()]).then(
        ([searches, cats]) => {
          setPopularSearches(searches);
          setCategories(cats);
          setPopularLoaded(true);
        },
      );
    }
  }, [popularLoaded]);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      startTransition(async () => {
        const data = await searchSite(term);
        setResults(data);
        setIsLoading(false);
      });
    }, 300); // 300ms debounce
  };

  // Initial search on mount/open if query exists
  useEffect(() => {
    if (isOpen && query) {
      handleSearch(query);
    }
  }, []); // Run once on mount if we wanted, but logic below handles updates better

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (isOpen) {
      handleSearch(val);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    if (query && !results) {
      handleSearch(query);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update height when content changes
  useEffect(() => {
    if (!isOpen) {
      setHeight(0);
      return;
    }

    if (contentRef.current) {
      // Use ResizeObserver to animate height
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [isOpen, results, isLoading, query]); // Re-measure when results or loading state changes

  const showLoading = isLoading || isPending;
  const hasResults =
    results &&
    (results.suggestions.length > 0 ||
      results.stores.length > 0 ||
      results.products.length > 0);
  const showEmpty = !showLoading && !hasResults && query.length > 0;
  const showInitialView = isOpen && !query && !showLoading;

  return (
    <div
      ref={containerRef}
      className="relative flex-1 max-w-2xl mx-4 hidden md:block"
    >
      {/* Input Field */}
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              router.push(`/shop?search=${encodeURIComponent(query)}`);
            }
          }}
          placeholder="Search for Grocery, Stores, Vegetable or Meat"
          className="w-full h-12 rounded-full pl-6 pr-12 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-[#d4e157] transition-all shadow-sm"
        />

        <button
          onClick={() => {
            if (query.trim()) {
              setQuery("");
              handleSearch("");
            }
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {query ? (
            <Cancel01Icon className="size-5 text-gray-600" />
          ) : (
            <Search01Icon className="size-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Dropdown Results */}
      <div
        className={`absolute left-0 top-14 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 transition-[height,opacity,width] duration-300 ease-out ${isOpen ? "opacity-100 w-[130%]" : "w-full opacity-0 pointer-events-none"}`}
        style={{
          height: isOpen ? (height === "auto" ? "auto" : `${height}px`) : "0px",
        }}
      >
        <div ref={contentRef}>
          {showLoading ? (
            <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#003d29]" />
              <span>Searching...</span>
            </div>
          ) : showInitialView ? (
            <div className="p-6 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#1f2937] mb-4">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.filter((cat) => cat.count > 0)?.slice(0, 6)?.map((category, index) => (
                      <Link
                        key={index}
                        href={`/shop?category=${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group relative p-4 rounded-2xl transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: category.color }}
                      >
                        <div className="flex flex-col z-10">
                          <h4 className="text-base font-bold text-[#003d29] group-hover:translate-x-1 transition-transform">
                            {category.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {category.count || 0} Products
                          </span>
                        </div>
                        <div className="absolute right-2 bottom-2 text-2xl leading-none group-hover:scale-110 transition-transform opacity-80">
                          {category.icon}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular search */}
              <div>
                <h3 className="text-lg font-bold text-[#1f2937] mb-4">
                  Popular search
                </h3>
                {popularLoaded && popularSearches.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {popularSearches.map((item, index) => (
                      <Link
                        href={`/products/${item.id}`}
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors group"
                      >
                        <div className="relative size-12 shrink-0 mr-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#003d29] group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </h4>
                          <p className="font-bold text-[#003d29]">
                            {item.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No popular searches yet
                  </p>
                )}
              </div>
            </div>
          ) : showEmpty ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : results ? (
            <div className="p-6 flex gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Left Column: Suggestions & Stores */}
              <div className="w-1/3 flex flex-col gap-8 border-r border-gray-100 pr-4">
                {/* Suggestions */}
                {results.suggestions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#003d29] mb-4">
                      Suggestions
                    </h3>
                    <ul className="space-y-3">
                      {results.suggestions.map((item, index) => (
                        <Link
                          key={index}
                          href={`/shop?category=${encodeURIComponent(item.label)}`}
                          className="flex items-center text-gray-500 cursor-pointer hover:text-orange-500 transition-colors"
                        >
                          <span className="font-bold text-gray-900">
                            {item.bold}
                          </span>{" "}
                          {item.label.replace(item.bold, "").trim()}
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stores */}
                {results.stores.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#003d29] mb-4">
                      Stores
                    </h3>
                    <ul className="space-y-3">
                      {results.stores.map((store, index) => (
                        <Link
                          key={index}
                          href={`/vendors/${store.id}`}
                          className="flex items-center text-gray-500 cursor-pointer hover:text-orange-500 transition-colors"
                        >
                          <span className="font-bold text-gray-900">
                            {store.name.substring(0, 2)}
                          </span>
                          {store.name.substring(2)}
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Products */}
              <div className="flex-1">
                {results.products.length > 0 && (
                  <>
                    <h3 className="text-lg font-bold text-[#003d29] mb-4">
                      Products
                    </h3>
                    <div className="flex flex-col gap-3">
                      {results.products.map((product, index) => {
                        return (
                          <Link
                            href={`/products/${product.id}`}
                            key={index}
                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                          >
                            <div className="relative h-12 w-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                              {/* Placeholder content since we don't have real images yet */}
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 ">
                                <Image
                                  className="rounded"
                                  src={product.image}
                                  alt={product.name}
                                  width={36}
                                  height={36}
                                />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-[#003d29]">
                                {product.name}
                              </h4>
                              <p className="text-sm font-bold text-[#003d29]">
                                {product.price}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-4 text-center">
                      <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        className="text-orange-600 font-bold hover:no-underline hover:text-orange-700"
                      >
                        View all results
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
