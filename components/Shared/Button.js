import React from 'react';

const Button = ({ clickFunc, text = '', classAdd }) => {
    return (
        <button
            onClick={clickFunc}
            className={`bg-green-700 text-white py-[8px] px-5  shadow hover:bg-green-600 ${classAdd}`}
        >
            {text}
        </button>
    );
};

export default Button;