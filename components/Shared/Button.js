import React from 'react';

const Button = ({ clickFunc, classAdd, children }) => {
    return (
        <button
            onClick={clickFunc}
            className={` py-[8px] px-5  shadow hover:bg-green-600 transition-all cursor-pointer ${classAdd}`}
        >
            {children}
        </button>
    );
};

export default Button;