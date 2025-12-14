import Link from "next/link";
import {
    ShoppingBasket01Icon,
    HelpCircleIcon,
    GiftIcon
} from "hugeicons-react";

export function Footer() {
    return (
        <footer className="bg-[#fdf9ed]  text-gray-900 border-t border-gray-100">
            <div className="container mx-auto px-4 ">
                <div className="py-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="mb-6 flex items-center gap-2">
                            {/* Logo */}
                            <div className="relative size-8">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full text-orange-500"
                                >
                                    <path
                                        d="M4 8h16l-2 12H6L4 8z"
                                        fill="currentColor"
                                        stroke="#003d29"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 8V4m0 0l-3 3m3-3l3 3"
                                        stroke="#4ade80"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-[#003d29]">Gromuse</span>
                        </Link>
                        <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-700">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit.
                        </p>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Accepted Payments</h4>
                            <div className="flex flex-wrap gap-2">
                                {/* Payment Icons Placeholders */}
                                {['tabby', 'visa', 'tamara', 'mastercard', 'klarna', 'applepay'].map((pay) => (
                                    <div key={pay} className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                                        {pay}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="mb-6 font-semibold">Department</h4>
                        <ul className="space-y-4 text-sm text-gray-700">
                            {['Fashion', 'Education Product', 'Frozen Food', 'Beverages', 'Organic Grocery', 'Office Supplies', 'Beauty Products'].map(item => (
                                <li key={item}><Link href="#" className="hover:text-amber-500 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 font-semibold">About us</h4>
                        <ul className="space-y-4 text-sm text-gray-700">
                            {['About shopcart', 'Careers', 'News & Blog', 'Help', 'Press Center'].map(item => (
                                <li key={item}><Link href="#" className="hover:text-amber-500 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 font-semibold">Services</h4>
                        <ul className="space-y-4 text-sm text-gray-700">
                            {['Gift Card', 'Mobile App', 'Shipping & Delivery', 'Order Pickup'].map(item => (
                                <li key={item}><Link href="#" className="hover:text-amber-500 transition-colors">{item}</Link></li>
                            ))}
                            <li className="pt-4 font-bold text-gray-900 block">Help</li>
                            <li><Link href="#" className="text-sm text-gray-700 hover:text-amber-500 transition-colors">Shopcart Help</Link></li>
                            <li><Link href="#" className="text-sm text-gray-700 hover:text-amber-500 transition-colors">Returns</Link></li>
                            <li><Link href="#" className="text-sm text-gray-700 hover:text-amber-500 transition-colors">Track orders</Link></li>
                            <li><Link href="#" className="text-sm text-gray-700 hover:text-amber-500 transition-colors">Contact us</Link></li>
                        </ul>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="border-t py-6">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-gray-700 md:flex-row">
                        <div className="flex gap-6">
                            <Link href="#" className="flex items-center gap-2 hover:text-[#003d29]">
                                <ShoppingBasket01Icon className="text-pink-400 size-4" />
                                Become Seller
                            </Link>
                            <Link href="#" className="flex items-center gap-2 hover:text-[#003d29]">
                                <GiftIcon className="text-pink-400 size-4" />
                                Gift Cards
                            </Link>
                            <Link href="#" className="flex items-center gap-2 hover:text-[#003d29]">
                                <HelpCircleIcon className="text-pink-400 size-4" />
                                Help Center
                            </Link>
                        </div>

                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-[#003d29]">Terms of Use</Link>
                            <Link href="#" className="hover:text-[#003d29]">Privacy Policy</Link>
                        </div>

                        <div className="text-center md:text-right">
                            All Right reserved by Musemind | 2022
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
