import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { RiCloseLine, RiDeleteBin6Line } from 'react-icons/ri';
import { cartStore } from '../../../store/createStore';
import Button from '../Button'

const CartSidebar = ({ cart }) => {
    let [showCart, setShowCart] = cart;
    const router = useRouter();
    const cartItems = cartStore((state) => (state.items));

    let cartShow = showCart ? 'translate-x-0' : 'translate-x-full'

    const removeCartItem = (id) => {
        removeItemOnCart(id)
    }
    return (
        <div className={`${cartShow} transition-transform duration-500 shadow-xl border-l fixed right-0 top-0  h-full z-[125] w-96  pt-0 bg-white`}>
            <div className='relative  py-6 text-center'>
                <GrClose onClick={() => setShowCart(false)} className='absolute left-3 top-3 hover:animate-pulse  cursor-pointer rounded-full text-xl' />
                <p className='text-2xl font-light'>Shopping Cart</p>
            </div>
            <div className=' h-[70%] overflow-auto  pl-2 pr-4'>
                {
                    Array.isArray(cartItems) &&
                        cartItems.length ?
                        <>
                            {cartItems.map(item => (
                                <CartItem removeCartItem={removeCartItem} key={item.id} item={item} />
                            ))}
                            <div className='bg-white absolute bottom-0 px-4 pt-2 pb-3 shadow-sm w-full right-0'>
                                <div className='flex justify-between items-center pb-4 px-2  uppercase'>
                                    <p className='font-medium text-lg'>Total Price</p>
                                    <p className='font-medium text-xl  text-[#4f8700]'>${
                                        cartItems.map(itm => itm?.base_price * itm?.quantity).reduce((prev, curr) => {
                                            return prev + curr
                                        })}</p>
                                </div>
                                <div className='flex justify-between gap-3 items-center'>
                                    <Button withBck={false} clickFunc={() => router.push('/cart')} classAdd='!w-full'>
                                        View Cart
                                    </Button>
                                    <Button withBck={true} clickFunc={() => router.push('/checkout')} classAdd='!w-full'>
                                        CheckOut
                                    </Button>
                                </div>
                            </div>
                        </>
                        :
                        <div className='h-full grid place-items-center'>
                            <img src="https://shop.unicornstore.in/beam/themes/2019/assets/img/cart_empty.png" alt="" />
                        </div>
                }

            </div>
        </div>
    );
};

export default CartSidebar;


const CartItem = ({ item }) => {
    const removeItemOnCart = cartStore((state) => (state.removeToCart))
    const increaseItemQuantity = cartStore((state) => (state.increaseQuantity))
    const decreaseItemQuantity = cartStore((state) => (state.decreaseItemQuantity))


    const removeItem = (proId) => {
        removeItemOnCart(proId)
        toast.error('Remove to Cart!')
    }
    const increaseQuantity = () => {
        increaseItemQuantity(item.id, item.quantity + 1)
    }
    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            decreaseItemQuantity(item.id, item.quantity - 1)
        }
    }
    return (
        <div className=' select-none flex items-start justify-between  shadow bg-gray-50 p-3 py-2 mb-3 rounded-md'>
            <div className='flex items-start gap-2'>
                <img className='h-[80px]   rounded-md' src={item?.item_img} alt="product_image" />
                <div className='flex flex-col'>
                    <p className='text-console.log(); uppercase font-medium text-green-700'>{item?.item_name}</p>
                    <p className='text-gray-500 text-sm'>
                        {item?.category}
                    </p>
                    <div className='flex  gap-2 mt-2'>
                        <div onClick={decreaseQuantity} className='border h-6 w-6 rounded text-xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>-</span>
                        </div>
                        <p className='text-[15px] uppercase'>{item?.quantity}</p>
                        <div onClick={increaseQuantity} className='border h-6 w-6 rounded text-xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex h-[5rem]   flex-col justify-between items-end'>
                <RiCloseLine onClick={() => removeItem(item.id)} className='  hover:animate-pulse  hover:text-green-800 cursor-pointer rounded-full text-xl' />
                <p className='text-xl text-[#4f8700] font-medium'>
                    {item?.currency === 'usd' && '$'}
                    {item?.base_price * item?.quantity}
                </p>
            </div>
        </div>
    )
}