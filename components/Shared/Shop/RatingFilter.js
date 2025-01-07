import React from 'react';

const RatingFilter = ({ defaultRating = 5, handleFilter }) => {
    return (
        <div>
            <p className='flex items-center flex-wrap justify-between'>
                <span>Rating</span>
                {
                    defaultRating != 5 ?
                        <span className='cursor-pointer' onClick={() => handleFilter({ name: 'rate', value: null })}>clear</span>
                        :
                        null
                }
            </p>
            <div className="flex items-center gap-1">
                {
                    [...Array(5).keys()].map(itm => (
                        <RateSvg setRating={handleFilter} key={itm} num={itm + 1} fill={itm < defaultRating ? true : false} />
                    ))
                }
            </div>
        </div>
    );
};

export default RatingFilter;


const RateSvg = ({ setRating, fill = false, num }) => {
    return (
        <svg onClick={() => setRating({ name: 'rate', value: num === 5 ? null : num })} aria-hidden="true" className={`cursor-pointer w-8 h-8  ${fill ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
            </path>
        </svg>
    )
}