import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { RiCloseLine, RiDeleteBin6Line } from 'react-icons/ri';
import { UserData, cartStore } from '../../../store/createStore';
import Button from '../Button'

const CartSidebar = ({ cart }) => {
    let [showCart, setShowCart] = cart;
    const clearCart = cartStore((state) => (state.clearCart))
    const userData = UserData((state) => (state.data))
    const router = useRouter();
    const cartItems = cartStore((state) => (state.items));
    const [subTotal, setSubTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    let cartShow = showCart ? 'translate-x-0' : 'translate-x-full'

    const removeCartItem = (id) => {
        removeItemOnCart(id)
    }

    useEffect(() => {
        let subt = cartItems.length ? cartItems.map(itm => (itm.price - (itm.price / itm.discount)) * itm.ordered_quantity).reduce((prev, curr) => prev + curr) : 0
        setSubTotal(parseFloat(subt).toFixed(2))
        setTax((parseFloat((5 * subt) / 100)).toFixed(2))
        setTotal(parseFloat(subt + ((5 * subt) / 100)).toFixed(2))
    }, [cartItems])


    const checkout = async (e) => {
        e.preventDefault()
        router.push('/checkout')
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
                                <CartItem removeCartItem={removeCartItem} key={item._id} item={item} />
                            ))}
                            <div className='bg-white absolute bottom-0 px-4 pt-2 pb-3 shadow-sm w-full right-0'>
                                <div className='flex justify-between items-center pb-0 px-2  uppercase'>
                                    <p className=' font-medium text-md'>Sub Total</p>
                                    <p className=' font-medium text-lg  text-[#4f8700]'>{cartItems[0]?.currency === 'bdt' ? '৳' : '$'} {subTotal}</p>
                                </div>
                                <div className='flex justify-between items-center pb-2 px-2  uppercase'>
                                    <p className=' font-medium text-md'>Tax</p>
                                    <p className=' font-medium text-lg  text-[#4f8700]'>{cartItems[0]?.currency === 'bdt' ? '৳' : '$'} {tax}</p>
                                </div>
                                <div className='flex justify-between items-center pb-4 px-2  uppercase border-t'>
                                    <p className='font-medium text-lg'>Total Price</p>
                                    <p className='font-medium text-xl  text-[#4f8700]'>{cartItems[0]?.currency === 'bdt' ? '৳' : '$'} {total}</p>
                                </div>
                                <div className='flex justify-between gap-3 items-center'>
                                    <Button withBck={false} clickFunc={() => router.push('/cart')} classAdd='!w-full'>
                                        View Cart
                                    </Button>
                                    <Button withBck={true} clickFunc={checkout} classAdd={`!w-full ${loading && 'cursor-not-allowed'}`}>
                                        {loading ? '.....' : 'CheckOut'}
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
        if(item.quantity > item.ordered_quantity) {
            increaseItemQuantity(item._id, item.ordered_quantity + 1)
        }
    }
    const decreaseQuantity = () => {
        if (item.ordered_quantity > 1) {
            decreaseItemQuantity(item._id, item.ordered_quantity - 1)
        }
    }
    return (
        <div className=' select-none flex items-start justify-between  shadow bg-gray-50 p-3 py-2 mb-3 rounded-md'>
            <div className='flex items-start gap-2'>
                <img className='h-[80px]   rounded-md' src={item?.image.url} alt="product_image" />
                <div className='flex flex-col'>
                    <p className='text-console.log(); uppercase font-medium text-green-700'>{item?.name}</p>
                    <p className='text-gray-500 text-sm'>
                        {item?.category}
                    </p>
                    <div className='flex  gap-2 mt-2'>
                        <div onClick={decreaseQuantity} className='border h-6 w-6 rounded text-xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>-</span>
                        </div>
                        <p className='text-[15px] uppercase'>{item?.ordered_quantity}</p>
                        <div onClick={increaseQuantity} className='border h-6 w-6 rounded text-xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex h-[5rem]   flex-col justify-between items-end'>
                <RiCloseLine onClick={() => removeItem(item._id)} className='  hover:animate-pulse  hover:text-green-800 cursor-pointer rounded-full text-xl' />
                <p className='text-xl text-[#4f8700] font-medium'>
                    {item?.currency === 'bdt' ? '৳' : '$'}
                    {parseFloat((item.price - (item.price / item.discount)) * item.ordered_quantity).toFixed(2)}
                </p>
            </div>
        </div>
    )
}