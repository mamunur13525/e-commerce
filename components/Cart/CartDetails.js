import React, { useState } from 'react';
import Button from '../Shared/Button';
import { GrClose } from 'react-icons/gr'

const CartDetails = ({ classAdd }) => {
    return (
        <div className={`mt-8 ${classAdd}`}>
            <table className="w-full">
                <thead className='bg-[#80b435] shadow    text-white'>
                    <tr className='py-3'>
                        <th className="py-3  text-left pl-3 text-xl ">Product</th>
                        <th className="py-3  text-left pl-3 text-xl "></th>
                        <th className="py-3  text-left pl-3 text-xl ">Price</th>
                        <th className="py-3  text-left pl-3 text-xl ">Quantity</th>
                        <th className="py-3  text-left pl-3 text-xl ">Total</th>
                        <th className="py-3  text-left pl-3 text-xl "></th>
                    </tr>
                </thead>
                <tbody>
                    <CartItem />
                    <CartItem />
                </tbody>
            </table>
            <hr />
            <div className='flex justify-between px-5 font-medium h-[150px] text-xl items-center '>
                <span className='uppercase'>Sub total</span>
                <span className='text-[#80b435]'>$300.00</span>
            </div>
            <hr />
            <div className='flex justify-end '>
                <Button classAdd='text-white inline-block mb-0 font-normal text-center align-middle cursor-pointer whitespace-no-wrap text-sm rounded bg-[#80b435] hover:bg-[#356d20] select-none rounded-none py-[1.1rem] w-[10rem] mt-8 border-[#80b435] uppercase '>
                    Checkout
                </Button>
            </div>
        </div>
    );
};

export default CartDetails;


const CartItem = () => {
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }
    return (
        <tr className="item_cart">
            <td className="product-photo">
                <img src="//cdn.shopify.com/s/files/1/2179/9295/products/3_c0fc88de-95cd-4402-b483-296adbe228cc_medium.jpg?v=1500459194" alt="union bed - S" />
            </td>
            <td className="produc-name"><a href="#">union bed</a>
                <div className="cart__meta-text">
                    Size: S<br />
                </div>
            </td>
            <td className="produc-price">
                <span className="amount"><span className="money" data-currency-usd="$300.00">$300.00</span></span>
            </td>
            <td className="">
                <div className="w-fit ml-3">
                    <button onClick={decreaseQuantity} type="button" className="js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="" data-qty="0">
                        <span className="text-xl">−</span>
                    </button>
                    <input type="text" className="w-fit max-w-[2rem] text-center focus:outline-none" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" name="updates[]" value={quantity} />
                    <button onClick={() => setQuantity(prev => prev + 1)} type="button" className="js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="" data-qty="11">
                        <span className="fa fa-plus" aria-hidden="true"></span>
                        <span className="fallback-text">+</span>
                    </button>
                </div>
            </td>
            <td className="total-price">
                <span className="amount">
                    <span className="money" data-currency-usd="$300.00">$300.00</span>
                </span>
            </td>
            <td className="">
                <GrClose className='cursor-pointer text-xl' />
            </td>
        </tr>
    )
}