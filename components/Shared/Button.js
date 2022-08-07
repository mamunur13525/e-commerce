import React from 'react';

const Button = ({ withBck = true, clickFunc, classAdd = '', children }) => {

    let classNames = `w-full border border-green-600 py-[8px] px-5  shadow hover:bg-white transition-all cursor-pointer font-normal ${classAdd}`
    if (withBck) {
        return (
            <button
                onClick={clickFunc}
                className={`bg-green-700  text-white hover:bg-white hover:text-green-700 ${classNames}`}
            >
                {children}
            </button>
        )
    }
    return (
        <button
            onClick={clickFunc}
            className={`bg-white  text-green-700 hover:bg-green-700 hover:text-white ${classNames}`}
        >
            {children}
        </button>
    );
};

export default Button;