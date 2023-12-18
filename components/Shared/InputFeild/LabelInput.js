import React from 'react';

const LabelInput = ({ placeholder = '', css = '', inputCss = '', labelCss = '', placeholderCss = '', name, id, type, title, value = '', onChange, required = false, disabled = false }) => {
    return (
        <div className={`relative ${css}`}>
            <label className={`${labelCss} block text-md`} htmlFor={id}>{title}</label>
            <input onChange={(e) => onChange({name: name, value: e.target.value})} className={`${inputCss} border rounded-sm px-3 py-2 outline-none`} value={value} type={type} name={name} placeholder={placeholder} id={id} required={required} disabled={disabled} />
        </div>
    );
};
export default LabelInput;