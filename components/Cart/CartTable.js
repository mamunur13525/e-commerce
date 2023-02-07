import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { cartStore } from '../../store/createStore';
import Button from '../Shared/Button';
import CartItem from './CartItem';

function CartTable({ }) {
    const [isLoading, setIsLoading] = useState(true);
    const allCartItems = cartStore((state) => (state.items))
    const router = useRouter();


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
    }, [])
    return (
        <>
            <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative h-full ">
                <div className='bg-gray-100 p-4 font-medium uppercase'>
                    Cart Items : <span className='text-green-600 font-bold'>{allCartItems.length} items</span>
                </div>
                <div>
                    {!isLoading ?
                        <div className="overflow-x-auto pb-4">
                            {
                                allCartItems?.length ?
                                    <div className="w-full">
                                        <div className="text-sm divide-y divide-slate-200">
                                            {
                                                allCartItems?.map((cart, ind) => {
                                                    return (
                                                        <CartItem
                                                            key={cart.id}
                                                            cart={cart}
                                                            num={ind + 1}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className=' grid place-items-center pb-10'>
                                        <img className='h-[18rem]' src="https://shop.unicornstore.in/beam/themes/2019/assets/img/cart_empty.png" alt="" />
                                        <div className='w-fit text-center'>
                                            <Button clickFunc={() => router.push('/shop')} classAdd='w-fit mx-auto'>
                                                Shop More
                                            </Button>
                                        </div>
                                    </div>
                            }
                        </div>
                        :
                        <div className='py-3 text-center'>
                            loading...
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default CartTable;


