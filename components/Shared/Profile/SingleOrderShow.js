

export default function SingleOrderShow({ data }) {
    const { name, price: price, ordered_quantity, discount, rating, currency, image: image } = data
    return (
        <div className="p-3 bg-white rounded-md border border-gray-100 mb-2 last:mb-0 flex items-center gap-4">
            <div className="w-16 h-16 flex-shrink-0">
                <img className="w-full h-full object-cover rounded-md border border-gray-100" src={image.url} alt={name} />
            </div>

            <div className="flex-grow min-w-0">
                <h1 className="text-gray-800 font-medium text-sm md:text-base truncate">{name}</h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Qty: {ordered_quantity}</span>
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded flex items-center gap-1">
                        ★ {rating}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0">
                <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {currency === 'bdt' ? '৳' : '$'}{((price - (price / discount)) * ordered_quantity).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">
                    {currency === 'bdt' ? '৳' : '$'}{(price - (price / discount)).toFixed(2)} / unit
                </span>
            </div>
        </div>
    )
}