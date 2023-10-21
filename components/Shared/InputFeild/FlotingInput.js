import React from 'react';
import { useState } from 'react';

const FlotingInput = ({ placeholder = '', css = '', inputCss = '', placeholderCss = '', name, id, type, getValue }) => {
    const [inputValue, setInputValue] = useState('')

    const setValue = (data) => {
        if(getValue) {
            getValue({title: data.target.name, value:data.target.value})
        }
    }
    return (
        <div className={`relative ${css} mt-3`}>
            <input onChange={(e) => {
                setInputValue(e.target.value)
                setValue(e)
            }} value={inputValue} type={type} id={id} className={`block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${inputCss}`} placeholder=" " name={name} required />
            <label htmlFor={id} className={`absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75  z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 top-1  peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${placeholderCss}`}>{placeholder}</label>
        </div>
    );
};
export default FlotingInput;