import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { UserData, cartStore } from '../../store/createStore';
import Button from '../Shared/Button';

const OrderDetails = () => {
    const allCartItems = cartStore((state) => (state.items))
    const userData = UserData((state) => (state.data))
    const clearCart = cartStore((state) => (state.clearCart))
    const [subTotal, setSubTotal] = useState(0);
    // const [newSubTotal, setNewSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0)
    const [couponCode, setCouponCode] = useState(0);
    const router = useRouter()

    useEffect(() => {
        let subt = allCartItems.length ? allCartItems.map(itm => (itm.base_price - (itm.base_price / itm.discount)) * itm.ordered_quantity).reduce((prev, curr) => prev + curr) : 0
        setSubTotal(parseFloat(subt).toFixed(2))
        setTax((parseFloat((5 * subt) / 100)).toFixed(2))
        setTotal(parseFloat(subt + ((5 * subt) / 100)).toFixed(2))
    }, [allCartItems])

    // useEffect(() => {
    //     setNewSubTotal((subTotal - (10 * subTotal) / 100))
    // }, [subTotal])

    const checkout = async (e) => {
        e.preventDefault()
        if(userData.email) {
            await fetch('api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_details: userData, product_details: allCartItems, subtotal: subTotal, tax: tax, total: total})
            })
            .then(res => res.json())
            .then(result => {
                clearCart()
                router.push('/profile')
            })
        }
        else {
            router.push('/login')
        }
    }

    return (
        <div className='bg-white shadow-md w-full h-full max-h-[530px] static top-0   '>
            <div className="h-full">
                <div className="p-4 bg-gray-100 ">
                    <h1 className="ml-2 font-medium uppercase">Order Summary</h1>
                </div>
                {!allCartItems.length
                    ?
                    <div className='grid place-items-center h-full'>
                        <p className='mb-20'>No Summary</p>
                    </div>
                    :
                    <div className="p-4">
                        <p className="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>
                        <div className="flex justify-between border-b">
                            <div className="lg:px-0 lg:py-0 m-2 text-lg lg:text-base font-medium text-center text-gray-800">
                                Subtotal
                            </div>
                            <div className="lg:px-0 lg:py-0 m-2 lg:text-lg font-medium text-center text-gray-900">
                                {allCartItems[0]?.currency === 'taka' ? '৳' : '$'} {subTotal}
                            </div>
                        </div>
                        <div className="flex justify-between pt-0 border-b">

                            <CouponApply couponCode={couponCode} setCouponCode={setCouponCode} />

                            <div className="lg:px-0 lg:py-0 m-2 lg:text-lg font-medium text-center text-green-700">
                                {allCartItems[0]?.currency === 'taka' ? '৳' : '$'} {(couponCode * subTotal) / 100}
                            </div>
                        </div>
                        {/* <div className="flex justify-between pt-0 border-b">
                            <div className="lg:px-0 lg:py-0 m-2 text-lg lg:text-base font-medium text-center text-gray-800">
                                New Subtotals
                            </div>
                            <div className="lg:px-0 lg:py-0 m-2 lg:text-lg font-medium text-center text-gray-900">
                                {allCartItems[0]?.currency === 'taka' ? '৳' : '$'} {newSubTotal.toFixed(2)}
                            </div>
                        </div> */}
                        <div className="flex justify-between pt-0 border-b">
                            <div className="lg:px-0 lg:py-0 m-2 text-lg lg:text-base font-medium text-center text-gray-800">
                                Tax
                            </div>
                            <div className="lg:px-0 lg:py-0 m-2 lg:text-lg font-medium text-center text-gray-900">
                                {allCartItems[0]?.currency === 'taka' ? '৳' : '$'} {tax}
                            </div>
                        </div>
                        <div className="flex justify-between pt-0 border-b">
                            <div className="lg:px-0 lg:py-0 m-2 text-lg lg:text-base font-medium text-center text-gray-800">
                                Total
                            </div>
                            <div className="lg:px-0 lg:py-0 m-2 lg:text-lg font-medium text-center text-gray-900">
                                {allCartItems[0]?.currency === 'taka' ? '৳' : '$'} {total}
                            </div>
                        </div>
                        <div className=''>
                            <Button clickFunc={checkout} classAdd="flex items-center gap-2 justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase  shadow text-black">
                                <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                <span>
                                    Procceed to checkout
                                </span>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default OrderDetails;


const CouponApply = ({ couponCode, setCouponCode }) => {
    const couponRef = useRef(null);
    const [coupon, setCoupon] = useState('');

    const couponApply = () => {
        let val = couponRef.current.value;
        if (val == '555') { setCouponCode(5); setCoupon(val) }
        else if (val == '666') { setCouponCode(6); setCoupon(val) }
        else if (val == '777') { setCouponCode(7); setCoupon(val) }
        else {
            toast.error('Coupon invalid!')
            setCouponCode(0)
        }
    }
    return (
        <div className="flex items-center lg:px-0 lg:py-0 m-2 text-lg lg:text-base font-medium text-gray-800 gap-1">
            {
                couponCode ?
                    <span className='text-red-600'>
                        {couponCode ? '%' + couponCode : null}
                    </span>
                    : null
            }
            <span>
                Coupon
            </span>
            {
                !coupon &&
                <div className='items-center flex gap-1 pr-1 border border-gray-500 rounded-sm w-36'>
                    <input
                        ref={couponRef}
                        type="text"
                        style={{ boxShadow: 'none!important' }}
                        className='pl-2 w-full outline-none border-none focus:shadow-none'
                        maxLength={10}
                    />
                    <AiOutlineCheck onClick={couponApply} className='text-green-600 cursor-pointer' />
                </div>
            }
            {coupon && <span>&quot;{coupon}&quot;</span>}
            {coupon && <RiDeleteBin5Line onClick={() => { setCouponCode(0); setCoupon('') }} className='text-red-600 cursor-pointer' />}

        </div>
    )
}