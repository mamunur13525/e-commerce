import React from 'react';

const Button = ({ clickFunc, classAdd = '', children }) => {
    return (
        <button
            onClick={clickFunc}
            className={`border border-green-600 py-[8px] px-5  shadow hover:bg-white transition-all cursor-pointer ${classAdd}`}
        >
            {children}
        </button>
    );
};

export default Button;