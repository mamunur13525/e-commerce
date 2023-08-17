import React from 'react';

const LabelInput = ({ placeholder = '', css = '', inputCss = '', labelCss = '', placeholderCss = '', name, id, type, title, value = '' }) => {
    return (
        <div className={`relative ${css}`}>
            <label className={`${labelCss} block text-md`} htmlFor={id}>{title}</label>
            <input className={`${inputCss} border rounded-sm px-3 py-2 outline-none`} defaultValue={value} type={type} name={name} placeholder={placeholder} id={id} />
        </div>
    );
};
export default LabelInput;