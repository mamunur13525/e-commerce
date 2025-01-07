import { useEffect, useState } from "react"
import ShowOrder from "./ShowOrder"
import toast from "react-hot-toast"

export default function Orders({css, userData}) {
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
                if(result.error) {
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
                    <div className="bg-gray-100 rounded-sm lg:w-[70%] xl:w-[100%] border border-gray-100">
                        <h1 className="p-2">Total Orders: {orderData?.length}</h1>
                        <div className="bg-green-400 xl:flex xl:flex-wrap">
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