import React from 'react';

const RatingFilter = ({ defaultRating = 5, handleFilter }) => {
    return (
        <div className='space-y-2'>
            <div className="flex items-center justify-center gap-1 p-2 bg-white rounded-lg">
                {[...Array(5).keys()].map(itm => (
                    <RateSvg setRating={handleFilter} key={itm} num={itm + 1} fill={itm < defaultRating} />
                ))}
            </div>
            <p className='text-xs text-center text-gray-600'>
                {defaultRating === 5 ? 'All ratings' : `${defaultRating} stars & up`}
            </p>
        </div>
    );
};

export default RatingFilter;

const RateSvg = ({ setRating, fill, num }) => (
    <svg
        onClick={() => setRating({ name: 'rate', value: num === 5 ? null : num })}
        className={`cursor-pointer w-9 h-9 transition-all hover:scale-110 ${fill ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);