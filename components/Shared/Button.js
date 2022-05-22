import React from 'react';

const Button = ({ clickFunc, text = '', classAdd }) => {
    return (
        <button
            onClick={clickFunc}
            className={` py-[8px] px-5  shadow hover:bg-green-600 transition-all cursor-pointer ${classAdd}`}
        >
            {text}
        </button>
    );
};

export default Button;