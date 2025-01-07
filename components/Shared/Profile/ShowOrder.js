import { useEffect, useState } from "react"
import { UserData } from "../../../store/createStore"
import { FaMinus, FaPlus } from "react-icons/fa"
import SingleOrderShow from "./SingleOrderShow"

export default function ShowOrder({ data, orderId, setOrderId }) {
    const { _id, user, products, total, subtotal, tax, payment_status, createdAt, payment_url, order_id } = data
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

    // const payNowHandler = () => {
    //     if (payment_status !== 'paid' && payment_url !== null) {
    //         window.location.href = payment_url
    //     }
    // }
    return (
        <div className={`border-t border-gray-200 w-full`}>
            <div className="flex justify-between items-center h-16 text-black bg-gray-100 p-2 gap-3">
                <div className="text-sm md:text-base flex-1">
                    <h1>ID: {order_id}</h1>
                    <h1 className="flex gap-1">Status: <h1 className="uppercase font-medium">{payment_status !== 'paid' && payment_url !== null ? <h1>Unpaid - <a className="text-blue-500 cursor-pointer hover:underline text-sm font-bold uppercase" href={payment_url}>Pay now</a></h1> : payment_status}</h1></h1>
                </div>
                <div className="flex flex-1 justify-between items-center">
                    <div className="text-sm md:text-base">
                        <h1>{date}</h1>
                        <h1>Total: ৳{total}</h1>
                    </div>
                    {
                        orderId === _id ? <FaMinus onClick={() => setOrderId('')} className="bg-white text-gray-700 w-7 h-7 p-2 rounded-sm cursor-pointer" /> : <FaPlus onClick={() => setOrderId(_id)} className="bg-white text-gray-700 w-7 h-7 p-2 rounded-sm cursor-pointer" />
                    }
                </div>
            </div>
            <div className={`bg-white grid grid-rows-[0fr] duration-500 ${orderId === _id && 'grid-rows-[1fr]'}`}>
                <div className="overflow-hidden">
                    {
                        products.map(product => <SingleOrderShow key={product._id} data={product} />)
                    }
                </div>
            </div>
        </div>
    )
}