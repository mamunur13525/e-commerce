import { StoreCard } from "@/components/store/store-card";

// Using a larger list for the stores page example
export const STORES = [
    {
        name: "Crush grocery",
        image: "",
        deliveryTime: "Delivery In 12 minute",
        colorClass: "bg-orange-500",
        description: "Fresh organic produce and daily essentials delivered to your doorstep.",
    },
    {
        name: "Delivery market",
        image: "",
        deliveryTime: "Delivery In 12 minute",
        colorClass: "bg-blue-600",
        description: "Your one-stop shop for household items and pantry staples.",
    },
    {
        name: "Quality product",
        image: "",
        deliveryTime: "Delivery In 12 minute",
        colorClass: "bg-emerald-400",
        description: "Premium quality meats, dairy, and artisanal goods.",
    },
    {
        name: "Fresh Foods",
        image: "",
        deliveryTime: "Delivery In 15 minute",
        colorClass: "bg-red-400",
        description: "Farm-fresh vegetables and fruits straight from local growers.",
    },
    {
        name: "Daily Needs",
        image: "",
        deliveryTime: "Delivery In 10 minute",
        colorClass: "bg-purple-500",
        description: "Essentials for your everyday life, available 24/7.",
    },
    {
        name: "Super Mart",
        image: "",
        deliveryTime: "Delivery In 20 minute",
        colorClass: "bg-yellow-400",
        description: "Everything you need under one roof, from electronics to groceries.",
    },
];

export default function StoresPage() {
    return (
        <main className="bg-[#fafaf9] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">All Stores</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {STORES.map((store, index) => (
                        <StoreCard
                            key={index}
                            name={store.name}
                            image={store.image}
                            deliveryTime={store.deliveryTime}
                            colorClass={store.colorClass}
                            description={store.description}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
