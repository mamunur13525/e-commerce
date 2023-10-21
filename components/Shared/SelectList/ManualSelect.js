import { useEffect } from "react"

export default function ManualSelect({ css = "", selectCss = '', titleCss = '', optionCss = '', title = "", name = "", options, getValue }) {

   
    const select = (e) => {
        getValue({title: name, value: e.target.value})
    }

    return (
        <div className={`${css} flex flex-col mt-2`}>
            <label className={`${titleCss} text-sm`} htmlFor={name}>{title}</label>
            <select onChange={(e) => select(e)} className={`outline-none border border-gray-300 rounded-sm px-2 py-1 mt-2 ${selectCss}`} name={name} id={name}>
                <option disabled value={title}>Select {title}</option>
                {
                    options.map(data => <option key={Math.random()} value={data}>{data}</option>)
                }
            </select>
        </div>
    )
}