import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';
import { RiCloseLine, RiDeleteBin6Line } from 'react-icons/ri';
import { CartItemsContext } from '../../../pages/_app';
import Button from '../Button'

const CartSidebar = ({ cart }) => {
    const [cartItems, setCartItems] = useContext(CartItemsContext);
    let [showCart, setShowCart] = cart;
    const router = useRouter();
    const viewCart = () => {
        router.push('/cart')
    }
    let cartShow = showCart ? 'translate-x-0' : 'translate-x-full'


    const removeCartItem = (id) => {
        setCartItems(item => item.filter(itm => itm !== id))
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
                                <CartItem removeCartItem={removeCartItem} key={item} item={item} />
                            ))}
                            <div className=' absolute bottom-0 p-5 w-full right-0'>
                                <div className='flex justify-between items-center py-4 px-2  uppercase'>
                                    <p className='font-medium text-lg'>Total Price</p>
                                    <p className='font-medium text-xl  text-[#4f8700]'>$300.00</p>
                                </div>
                                <div className='flex justify-between gap-3 items-center'>
                                    <Button withBck={false} clickFunc={viewCart} classAdd=''>
                                        View Cart
                                    </Button>
                                    <Button withBck={true} classAdd='l'>
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


const CartItem = ({ removeCartItem, item }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1)
    }
    return (
        <div className=' select-none flex justify-between  shadow bg-gray-50 p-3 py-2 mb-3 rounded-md'>
            <div className='flex gap-2'>
                <img className='w-[80px] rounded-md' src="https://cdn.shopify.com/s/files/1/2179/9295/products/1_small.jpg?v=1500458217" alt="" />
                <div className='flex flex-col'>
                    <p className='text-console.log(); uppercase font-medium text-green-700'>title</p>
                    <p className='text-gray-500 text-sm'>this is description</p>
                    <div className='flex  gap-2 mt-2'>
                        <div onClick={decreaseQuantity} className='border h-6 w-6 rounded text-xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>-</span>
                        </div>
                        <p className='text-[15px] uppercase'>{quantity}</p>
                        <div onClick={increaseQuantity} className='border h-6 w-6 rounded text-xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex h-[5rem]   flex-col justify-between items-end'>
                <RiCloseLine onClick={() => removeCartItem(item)} className='  hover:animate-pulse  hover:text-green-800 cursor-pointer rounded-full text-xl' />
                <p className='text-xl text-[#4f8700] font-medium'>$300.00</p>
            </div>
        </div>
    )
}