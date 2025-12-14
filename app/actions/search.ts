"use server";

// Mock Data Source (simulating DB)
const MOCK_DB = {
    suggestions: [
        { label: "Frozen meat", bold: "Frozen" },
        { label: "Frozen vegetables", bold: "Frozen" },
        { label: "Frozen packaging", bold: "Frozen" },
        { label: "Meat ball full Frozen with milk", bold: "Frozen" },
        { label: "Fresh Fruits", bold: "Fresh" },
        { label: "Fresh Vegetables", bold: "Fresh" },
        { label: "Organic Juice", bold: "Organic" },
    ],
    stores: [
        "Festorex",
        "Frontday Daily market",
        "Green Valley",
        "Nature's Basket",
    ],
    products: [
        {
            name: "Organic frozen deer",
            price: "12.24$",
            image: "/placeholder-deer.png",
            category: "Frozen",
        },
        {
            name: "Fresh Coral frozen fish",
            price: "13.91$",
            image: "/placeholder-fish.png",
            category: "Frozen",
        },
        {
            name: "Bonduelle royal mix",
            price: "14.20$",
            image: "/placeholder-mix.png",
            category: "Frozen",
        },
        {
            name: "Bobs organic flour",
            price: "25.39$",
            image: "/placeholder-flour.png",
            category: "Organic",
        },
        {
            name: "Halal frozen Chicken",
            price: "20.29$",
            image: "/placeholder-chicken.png",
            category: "Frozen",
        },
        {
            name: "Fresh Apples",
            price: "5.00$",
            image: "/placeholder-image.png",
            category: "Fresh",
        },
    ],
};

export type SearchResult = {
    suggestions: { label: string; bold: string }[];
    stores: string[];
    products: { name: string; price: string; image: string }[];
};

export async function searchSite(query: string): Promise<SearchResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!query || query.trim() === "") {
        return { suggestions: [], stores: [], products: [] };
    }

    const lowerQuery = query.toLowerCase();

    // Filter Data
    const suggestions = MOCK_DB.suggestions.filter((item) =>
        item.label.toLowerCase().includes(lowerQuery)
    );

    const stores = MOCK_DB.stores.filter((store) =>
        store.toLowerCase().includes(lowerQuery)
    );

    const products = MOCK_DB.products.filter(
        (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
    );

    return {
        suggestions,
        stores,
        products,
    };
}
