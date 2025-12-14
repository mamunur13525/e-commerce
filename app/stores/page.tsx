import { StoreCard } from "@/components/store/store-card";

// Using a larger list for the stores page example
const STORES = [
    {
        name: "Crush grocery",
        image: "",
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
    {
        name: "Fresh Foods",
        image: "",
        deliveryTime: "Delivery In 15 minute",
        colorClass: "bg-red-400",
    },
    {
        name: "Daily Needs",
        image: "",
        deliveryTime: "Delivery In 10 minute",
        colorClass: "bg-purple-500",
    },
    {
        name: "Super Mart",
        image: "",
        deliveryTime: "Delivery In 20 minute",
        colorClass: "bg-yellow-400",
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
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
