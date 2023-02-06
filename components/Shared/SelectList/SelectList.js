import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const SelectList = ({ title = '', lists = [] }) => {
    const [selected, setSelected] = useState(title)

    return (
        <div className="w-fit">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className={`w-full `}>
                        <div className='w-[5.5rem] flex  border border-gray-300 py-2 px-3 rounded '>

                            <span className="block truncate">{selected || title}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" stroke="#000" strokeWidth="2" d="M7,3 L22,3 M7,9 L16,9 M7,15 L22,15 M2,2 L4,2 L4,4 L2,4 L2,2 Z M2,8 L4,8 L4,10 L2,10 L2,8 Z M2,14 L4,14 L4,16 L2,16 L2,14 Z M2,20 L4,20 L4,22 L2,22 L2,20 Z M7,21 L16,21" />
                                </svg>

                            </span>
                        </div>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-[10rem] mt-1 max-h-60 right-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
                            <Listbox.Option
                                key={title}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={''}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            Select {title}
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>
                            {lists.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default SelectList;