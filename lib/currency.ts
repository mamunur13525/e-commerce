// Currency symbol mapping
export const getCurrencySymbol = (currency?: string): string => {
    const symbols: Record<string, string> = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'INR': '₹',
        'BDT': '৳',
        'CNY': '¥',
        'AUD': 'A$',
        'CAD': 'C$',
    };

    return symbols[currency?.toUpperCase() || 'USD'] || '$';
};
