import { useEffect, useState } from "react"
import { UserData } from "../../../store/createStore"
import { FaMinus, FaPlus } from "react-icons/fa"
import SingleOrderShow from "./SingleOrderShow"

export default function ShowOrder({data, orderId, setOrderId}) {
    const { _id, user, products, total, subtotal, tax, payment_status, createdAt, payment_url } = data
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

    const payNowHandler = () => {
        if(payment_status !== 'paid' && payment_url !== null) {
            window.location.href = payment_url
        }
    }
    return (
        <div className={`border-t border-lime-200 xl:w-[50%] xl:odd:border-r`}>
            <div className="flex justify-between items-center h-12 text-white bg-green-500 p-2">
                <h1>{date}</h1>
                <h1 className="uppercase" onClick={payNowHandler}>{payment_status !== 'paid' && payment_url !== null ? <span className="ml-2 text-slate-100 cursor-pointer hover:underline">Pay now</span> : payment_status}</h1>
                {
                    orderId === _id ? <FaMinus onClick={() => setOrderId('')} className="bg-green-400 w-7 h-7 p-1 rounded-sm cursor-pointer" /> : <FaPlus onClick={() => setOrderId(_id)} className="bg-green-400 w-7 h-7 p-1 rounded-sm cursor-pointer" />
                }
            </div>
            <div className={`bg-green-200 grid grid-rows-[0fr] duration-500 ${orderId === _id && 'grid-rows-[1fr]'}`}>
                <div className="overflow-hidden">
                    <div className="p-2 bg-green-400 text-white flex justify-between">
                        <h1>Product Count: {products.length}</h1>
                        <h1>Total: {products[0].currency === 'bdt' ? '৳' : '$'}{total}</h1>
                    </div>
                    {
                        products.map(product => <SingleOrderShow key={product._id} data={product} />)
                    }
                </div>
            </div>
        </div>
    )
}