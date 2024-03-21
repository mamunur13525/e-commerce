import React from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCheck } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { cartStore } from '../../store/createStore';

const CartItem = ({ cart, num }) => {
    const increaseItemQuantity = cartStore((state) => (state.increaseQuantity))
    const decreaseItemQuantity = cartStore((state) => (state.decreaseItemQuantity))
    const removeItemOnCart = cartStore((state) => (state.removeToCart))

    const removeItem = (proId) => {
        removeItemOnCart(proId)
        toast.error('Remove to Cart!')
    }
    const increaseQuantity = () => {
        if(cart.quantity > cart.ordered_quantity) {
            increaseItemQuantity(cart._id, cart.ordered_quantity + 1)
        }
    }
    const decreaseQuantity = () => {
        if (cart.ordered_quantity > 1) {
            decreaseItemQuantity(cart._id, cart.ordered_quantity - 1)
        }
    }

    return (
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
                <div className='w-48  whitespace-nowrap'>
                    <div className='w-48 font-medium text-center text-slate-800'>
                        {
                            cart?.image ?
                                <img className="w-48" src={cart?.image.url} alt="product" />
                                :
                                <span className='text-base'> No Image</span>
                        }
                    </div>
                </div>
                <div className='flex items-start  whitespace-nowrap h-[12rem]'>
                    <div className='text-left px-2 py-6 flex flex-col justify-between h-full'>
                        <div>
                            <div className='text-xl capitalize inline-flex font-medium  text-green-600 rounded-full text-left 5'>
                                {cart?.name || '--'}
                            </div>
                            <div className='text-left text-base my-2 '>
                                <span className="text-gray-500 line-through tracking-tighter">
                                    {cart?.currency === 'bdt' ? '৳' : '$'}{cart?.price || '--'}
                                </span>
                                <span className="text-green-600 text-xl font-medium tracking-tight ml-2">
                                    {cart?.currency === 'bdt' ? '৳' : '$'}{cart?.price - (cart?.price / cart?.discount)}
                                </span>
                            </div>
                        </div>
                        <div>Total: <span className="text-green-600 text-xl font-medium tracking-tight">
                                {cart?.currency === 'bdt' ? '৳' : '$'}{(cart?.price - (cart?.price / cart?.discount)) * cart?.ordered_quantity}
                            </span>
                        </div>
                        <div className='text-left text-sm  flex gap-1 font-normal items-center'><AiOutlineCheck className='text-xl text-green-600 ' /> In Stock</div>
                    </div>
                </div>

            </div>
            <div className='pt-8 flex w-full justify-evenly'>
                <div className='w-[10rem] text-center text-base'>{cart?.category || '--'}</div>

                <div className='  whitespace-nowrap'>
                    <div className='flex justify-center  gap-4 text-2xl '>
                        <div onClick={decreaseQuantity} className='h-6 w-6 rounded text-2xl flex items-center justify-center cursor-pointer  shadow hover:bg-gray-100'>
                            <span className='pb-1'>-</span>
                        </div>
                        <p className='text-xl uppercase'>{cart?.ordered_quantity}</p>
                        <div onClick={increaseQuantity} className='h-6 w-6 rounded text-2xl flex items-center justify-center cursor-pointer shadow hover:bg-gray-100'>
                            <span className='pb-1'>+</span>
                        </div>
                    </div>

                </div>
                <div className='w-[12rem] whitespace-nowrap '>
                    <div className='flex justify-center'>
                        <div className='text-center uppercase font-semibold text-emerald-600 bg-green-100 py-2 rounded-full w-[5rem]'>
                            {cart?.weight || '--'}
                        </div>
                    </div>
                </div>
                <div className='  whitespace-nowrap  pr-3'>
                    <div className='w-full flex justify-center'>
                        <GrClose onClick={() => removeItem(cart._id)} className='cursor-pointer text-xl' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;