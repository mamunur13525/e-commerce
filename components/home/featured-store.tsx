import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { StoreCard } from "@/components/store/store-card";

const FEATURED_STORES = [
    {
        name: "Crush grocery",
        image: "", // Placeholder or use a real URL if available
        deliveryTime: "Delivery In 12 minute",
        colorClass: "bg-orange-500",
    },
    {
        name: "Delivery market",
        image: "",
        deliveryTime: "Delivery In 12 minute",
        colorClass: "bg-blue-600",
    },
    {
        name: "Quality product",
        image: "",
        deliveryTime: "Delivery In 12 minute",
        colorClass: "bg-emerald-400",
    },
];

export function FeaturedStore() {
    return (
        <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Featured store
                </h2>
                <Link
                    href="/stores"
                    className="group flex items-center text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
                >
                    Visit all stores
                    <ArrowRight01Icon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {FEATURED_STORES.map((store, index) => (
                    <StoreCard
                        key={index}
                        name={store.name}
                        image={store.image}
                        deliveryTime={store.deliveryTime}
                        colorClass={store.colorClass}
                    />
                ))}
            </div>
        </section>
    );
}
