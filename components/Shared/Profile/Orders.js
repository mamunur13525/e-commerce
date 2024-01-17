import { useEffect, useState } from "react"
import { UserData } from "../../../store/createStore"
import ShowOrder from "./ShowOrder"

export default function Orders({css}) {
    const userData = UserData((state) => (state.data))
    const [orderData, setOrderData] = useState([])
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(true)
    console.log(loading)

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
                setLoading(false)
                setOrderData(result)
            })
        } catch (error) {
            setLoading(false)
            console.log(error.message)
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
                    <div className="border border-lime-500 rounded-sm lg:w-[70%] xl:w-[100%]">
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