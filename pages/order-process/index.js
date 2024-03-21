import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';
import toast from 'react-hot-toast';

const OrderProcess = () => {
    const router = useRouter()
    const [orderId, setOrderId] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [stripePayUrl, setStripePayUrl] = useState(null)

    useEffect(() => {
        if(router?.query?.id) {
            setOrderId(router.query.id)
        }
    }, [router?.query])

    useEffect(() => {
        const fetchHandler = async (data) => {
            try {
                const result = await fetch('/api/payment-check', {
                    method: 'POST',
                    body: JSON.stringify({id: data})
                })
                const response = await result.json()
                console.log(response)
                if(response.error) {
                    throw new Error(response.error || 'Internal server error')
                } else {
                    setPaymentStatus(response.payment_status)
                    setStripePayUrl(response.pay_url || null)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(orderId) {
            fetchHandler(orderId)
        }
    }, [orderId])

    const payNowHandler = async () => {
        if(stripePayUrl) {
            window.location.href = stripePayUrl;
        } else {
            toast.error('Error payment server link')
        }
    }
    return (
        <>  
            <Navbar />
            <div className='flex h-[300px] justify-center items-center'>
                <div>
                    {
                        paymentStatus === null ? <ImSpinner10 className='animate-spin mr-3 w-8 h-8' /> : (paymentStatus === 'paid' ? <FaCheckCircle className='mr-3 w-14 h-14 text-blue-500' /> : <FaTimesCircle className='mr-3 w-14 h-14 text-red-500' />)
                    }
                </div>
                <div>
                    {
                        paymentStatus === null && <h1 className='text-xl flex items-center'>Processing your payment</h1>
                    }
                    {
                        paymentStatus !== null && (paymentStatus === 'paid' ? <h1 className='text-xl font-medium flex items-center'>Payment successful</h1> : <h1 className='text-xl font-medium flex items-center'>Payment unsuccessful</h1>)
                    }
                    {
                        paymentStatus === 'paid' && <h1 className='underline text-blue-500 cursor-pointer text-lg' onClick={() => router.push('/profile')}>Profile</h1>
                    }
                    {
                        paymentStatus === 'unpaid' && stripePayUrl && <h1 className='underline text-blue-500 cursor-pointer text-lg' onClick={payNowHandler}>Pay now</h1>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderProcess;