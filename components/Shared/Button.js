import React from 'react';

const Button = ({ text = '', classAdd  }) => {
    return (
        <button className={`bg-green-700 text-white py-[8px] px-5  shadow hover:bg-green-600 ${classAdd}`}>{text}</button>
    );
};

export default Button;