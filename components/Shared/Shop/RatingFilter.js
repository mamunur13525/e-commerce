import React, { useEffect } from 'react';
import { useState } from 'react';

const RatingFilter = ({ products, setRatingData }) => {
    const [rating, setRating] = useState(5);

    useEffect(() => {
        if(products) {
            setRatingData(products.filter(product => parseInt(product.rating) <= rating))
        }
    }, [rating])
    return (
        <div>
            <p className='flex items-center flex-wrap justify-between'>
                <span>Rating</span>
                {
                    rating != 5 ?
                        <span className='cursor-pointer' onClick={() => setRating(5)}>clear</span>
                        :
                        null
                }
            </p>
            <div className="flex items-center gap-1">
                {
                    [...Array(rating).keys()].map(itm => (
                        <RateSvg setRating={setRating} key={itm} num={itm} fill={true} />
                    ))
                }

                {
                    rating < 5 &&
                    [...Array(5 - Number(rating)).keys()].map(itm => (
                        <RateSvg setRating={setRating} key={itm} num={rating + itm} fill={false} />
                    ))
                }

            </div>
        </div>
    );
};

export default RatingFilter;


const RateSvg = ({ setRating, fill = false, num }) => {
    return (
        <svg onClick={() => setRating(num + 1)} aria-hidden="true" className={`cursor-pointer w-8 h-8  ${fill ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
            </path>
        </svg>
    )
}