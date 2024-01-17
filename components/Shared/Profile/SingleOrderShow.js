

export default function SingleOrderShow({ data }) {
    const { item_name: name, description, base_price: price, quantity, ordered_quantity, discount, rating, weight_category, currency, item_img: image } = data
    return (
        <div className="p-2 h-15 bg-green-200 border-b border-green-300 last:border-none flex">
            <img className="w-12 h-12 object-cover border border-green-300 rounded-sm mr-2" src={image} alt="" />
            <div className="flex flex-col justify-center">
                <h1 className="text-slate-900 text-md">{name}</h1>
                <h1 className="text-slate-700 text-sm">Rating: {rating}</h1>
            </div>
            <div className="ml-auto text-slate-600 flex flex-col items-end">
                <h1>{currency === 'taka' ? '৳' : '$'}{price - (price / discount)} X {ordered_quantity}</h1>
                <h1>{currency === 'taka' ? '৳' : '$'}{(price - (price / discount)) * ordered_quantity}</h1>
            </div>
        </div>
    )
}