import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import { FaTimes } from "react-icons/fa";

export default function Sidebar({ btnName = 'SIDEBAR', data, classAdd, btnClass = '' }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsSidebarOpen(true)} className={`btn md:hidden ${btnClass}`}>{btnName}</button>
            <div className={`h-screen w-screen bg-white fixed top-0 z-40 duration-200 ${isSidebarOpen ? 'left-0' : '-left-full'} ${classAdd} sm:w-96 md:hidden`}>
                <div className="md:hidden">
                    <Navbar />
                </div>
                <div className="relative p-3 pt-10 sm:pt-20">
                    <FaTimes onClick={() => setIsSidebarOpen(false)} className="text-black cursor-pointer absolute top-3 right-3 hover:bg-slate-300 duration-200 w-7 h-7 p-1 rounded-full" />
                    {
                        data
                    }
                </div>
            </div>
        </>
    )
}