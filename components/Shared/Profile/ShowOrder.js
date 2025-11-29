import { useEffect, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import SingleOrderShow from "./SingleOrderShow"

export default function ShowOrder({ data, orderId, setOrderId }) {
    const { _id, products, total, payment_status, createdAt, payment_url, order_id } = data
    console.log(data)
    const [date, setDate] = useState('')

    useEffect(() => {
        const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        const slicedDate = createdAt.slice(0, 10)
        const splittedDate = slicedDate.split('-')

        const day = parseInt(splittedDate[2])
        const monthNo = parseInt(splittedDate[1])
        const month = monthName[monthNo - 1]
        const year = parseInt(splittedDate[0])

        setDate(day + ' ' + month + ' ' + year)
    }, [createdAt])

    return (
        <div className={`border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 w-full`}>
            <div
                onClick={() => setOrderId(orderId === _id ? '' : _id)}
                className="flex flex-col md:flex-row justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors gap-4"
            >
                <div className="flex flex-col gap-1 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">#{order_id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${payment_status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {payment_status}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">{date}</span>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Total Amount</span>
                        <span className="font-bold text-gray-900">৳{total}</span>
                    </div>

                    {payment_status !== 'paid' && payment_url && (
                        <a
                            href={payment_url}
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Pay Now
                        </a>
                    )}

                    <div className={`transform transition-transform duration-200 ${orderId === _id ? 'rotate-180' : ''}`}>
                        <FaMinus className={`w-4 h-4 text-gray-400 ${orderId === _id ? 'block' : 'hidden'}`} />
                        <FaPlus className={`w-4 h-4 text-gray-400 ${orderId !== _id ? 'block' : 'hidden'}`} />
                    </div>
                </div>
            </div>

            <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${orderId === _id ? 'grid-rows-[1fr] border-t border-gray-100' : ''}`}>
                <div className="overflow-hidden">
                    <div className="p-4 bg-gray-50">
                        {
                            products.map(product => <SingleOrderShow key={product._id} data={product} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}