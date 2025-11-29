import React from 'react';

const FlotingInput = ({ placeholder = '', css = '', inputCss = '', placeholderCss = '', name, id, type, getValue, register, validation = {} }) => {
    // Register props from react-hook-form
    const registerProps = register ? register(name, validation) : {};

    const handleChange = (e) => {
        // Call getValue if provided (for FormBox state management)
        if (getValue) {
            getValue({ title: e.target.name, value: e.target.value });
        }

        // Also call the register's onChange if it exists
        if (registerProps.onChange) {
            registerProps.onChange(e);
        }
    };

    return (
        <div className={`relative ${css} mt-3`}>
            <input
                {...registerProps}
                onChange={handleChange}
                type={type}
                id={id}
                className={`block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${inputCss}`}
                placeholder=" "
            />
            <label htmlFor={id} className={`absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75  z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 top-1  peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${placeholderCss}`}>{placeholder}</label>
        </div>
    );
};
export default FlotingInput;