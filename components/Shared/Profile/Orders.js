import { useEffect, useState } from "react"
import ShowOrder from "./ShowOrder"
import toast from "react-hot-toast"

export default function Orders({ css, userData }) {
    const [orderData, setOrderData] = useState([])
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        try {
            fetch('/api/get-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData.orders)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result.error) {
                        toast.error(result.error || 'Something went wrong.')
                    }
                    else {
                        setLoading(false)
                        setOrderData(result)
                    }
                })
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }, [userData.orders])

    return (
        <>
            {
                loading === true ?
                    <div className={`flex justify-center items-center lg:mt-0 ${css}`}>
                        Loading data...
                    </div>
                    :
                    <div className={css}>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800">Order History ({orderData?.length})</h1>
                            <div className="flex flex-col gap-4">
                                {
                                    orderData?.map(order => <ShowOrder key={order._id} data={order} orderId={orderId} setOrderId={setOrderId} />)
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}