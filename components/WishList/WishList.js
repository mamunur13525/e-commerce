import React from 'react';
import Button from '../Shared/Button';

const WishList = ({ classAdd }) => {
    return (
        <div className={`mt-8 ${classAdd}`}>
            <table className="w-full">
                <thead className='bg-[#80b435] shadow    text-white'>
                    <tr className='py-3'>
                        <th className="py-3  text-left pl-3 text-xl ">Product</th>
                        <th className="py-3  text-left pl-3 text-xl ">Name</th>
                        <th className="py-3  text-left pl-3 text-xl ">Price</th>
                        <th className="py-3  text-left pl-3 text-xl ">	Availability</th>
                        <th className="py-3  text-left pl-3 text-xl ">Add to cart</th>
                    </tr>
                </thead>
                <tbody>
                    <WishlistItem />
                    <WishlistItem />
                </tbody>
            </table>
        </div>
    );
};

export default WishList;


const WishlistItem = () => {

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
            <td className="total-price">
                <span className="amount">
                    <span className="money" data-currency-usd="$300.00">$300.00</span>
                </span>
            </td>
            <td className="">
                <Button className='uppercase'>
                    Add to  Cart
                </Button>
            </td>
        </tr>
    )
}