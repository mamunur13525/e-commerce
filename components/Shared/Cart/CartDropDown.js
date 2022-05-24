import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import Button from '../Button'

const CartDropDown = () => {
    return (
        <div className='w-72 h-fit p-4 pt-0 bg-white'>
            <div className='flex justify-between items-center py-3 border-b'>
                <div className='flex gap-2'>
                    <img className='w-[80px]' src="https://cdn.shopify.com/s/files/1/2179/9295/products/1_small.jpg?v=1500458217" alt="" />
                    <div className='flex flex-col'>
                        <p className='text-xl uppercase font-medium'>title</p>
                        <p className='text-xl text-[#80b435] font-medium'>$300.00</p>
                        <p className='text-[15px] uppercase'>Quantity: 1</p>
                    </div>
                </div>
                <GrFormClose className='border border-black cursor-pointer rounded-full' />
            </div>
            <div className='flex justify-between items-center py-3  border-b'>
                <div className='flex gap-2'>
                    <img className='w-[80px]' src="https://cdn.shopify.com/s/files/1/2179/9295/products/1_small.jpg?v=1500458217" alt="" />
                    <div className='flex flex-col'>
                        <p className='text-xl uppercase font-medium'>title</p>
                        <p className='text-xl text-[#80b435] font-medium'>$300.00</p>
                        <p className='text-[15px] uppercase'>Quantity: 1</p>
                    </div>
                </div>
                <GrFormClose className='border border-black cursor-pointer rounded-full' />
            </div>
            <div className='flex justify-between items-center py-3 border-b'>
                <div className='flex gap-2'>
                    <img className='w-[80px]' src="https://cdn.shopify.com/s/files/1/2179/9295/products/1_small.jpg?v=1500458217" alt="" />
                    <div className='flex flex-col'>
                        <p className='text-xl uppercase font-medium'>title</p>
                        <p className='text-xl text-[#80b435] font-medium'>$300.00</p>
                        <p className='text-[15px] uppercase'>Quantity: 1</p>
                    </div>
                </div>
                <GrFormClose className='border border-black cursor-pointer rounded-full' />
            </div>
            <div>
                <div className='flex justify-between items-center py-4  uppercase'>
                    <p className='font-medium text-lg'>Total Price</p>
                    <p className='font-medium text-xl  text-[#80b435]'>$300.00</p>
                </div>
                <div className='flex justify-between gap-3 items-center'>
                    <Button classAdd='hover:text-white py-2 px-4 uppercase'>
                        View Cart
                    </Button>
                    <Button classAdd='bg-green-600 uppercase py-2 hover:bg-white hover:text-[#80b435] text-white'>
                        CheckOut
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartDropDown;