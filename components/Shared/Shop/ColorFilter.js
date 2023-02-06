import React from 'react';
import { useState } from 'react';

const ColorFilter = () => {
    const [colors, setColors] = useState(['red', 'darkred', 'blue', 'darkblue', 'green', 'darkgreen'])
    const [selectColor, setSelectColor] = useState('')
    return (
        <>
            <p className='flex items-center justify-between'>
                <span>Color</span>
                {
                    selectColor &&
                    <span className='cursor-pointer' onClick={() => setSelectColor('')}>clear</span>
                }
            </p>
            <div className='flex flex-wrap gap-2 items-center mt-2 pl-2'>
                {
                    colors.map(color => (
                        <span onClick={() => setSelectColor(color)} key={color} style={{ background: color }}
                            className={`w-4 h-4 rounded-full  cursor-pointer relative ${selectColor && selectColor === color ? 'border  border-black' : ''}`}
                        >
                            <span className={selectColor && selectColor !== color ? 'absolute -top-[2px] -left-[2px] w-5 rounded-full h-5 border   bg-gray-100 bg-opacity-40 z-20 ' : ''}></span>
                        </span>
                    ))
                }
            </div >
        </>
    );

};

export default ColorFilter;