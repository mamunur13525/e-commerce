

export default function SingleOrderShow({ data }) {
    const { name, price: price, ordered_quantity, discount, rating, currency, image: image } = data
    return (
        <div className="p-2 h-15 bg-white border-b border-gray-100 last:border-none flex">
            <img className="w-12 h-12 object-cover border border-gray-100 rounded-sm mr-2" src={image.url} alt="" />
            <div className="flex flex-col justify-center">
                <h1 className="text-slate-900 text-md">{name}</h1>
                <h1 className="text-slate-700 text-sm">Rating: {rating}</h1>
            </div>
            <div className="ml-auto text-slate-600 flex flex-col items-end">
                <h1>{currency === 'bdt' ? '৳' : '$'}{(price - (price / discount).toFixed(2))} X {ordered_quantity}</h1>
                <h1>{currency === 'bdt' ? '৳' : '$'}{((price - (price / discount)) * ordered_quantity).toFixed(2)}</h1>
            </div>
        </div>
    )
}