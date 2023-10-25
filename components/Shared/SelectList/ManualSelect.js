import { useEffect, useState } from "react"

export default function ManualSelect({ css = "", selectCss = '', titleCss = '', optionCss = '', title = "", name = "", options, getValue }) {

    const [selectedValue, setSelectedValue] = useState()

    const selected = (e) => {
        getValue({title: name, value: e.target.value})
        setSelectedValue(e.target.value)
    }

    return (
        <div className={`${css} flex flex-col mt-2`}>
            <label className={`${titleCss} text-sm`} htmlFor={name}>{title}</label>
            <select onChange={(e) => selected(e)} value={selectedValue} className={`outline-none border border-gray-300 rounded-sm px-2 py-1 mt-2 ${selectCss}`} name={name} id={name}>
                <option disabled selected value={title}>Select {title}</option>
                {
                    options.map(data => <option key={Math.random()} value={data}>{data}</option>)
                }
            </select>
        </div>
    )
}