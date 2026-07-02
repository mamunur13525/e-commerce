"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#fdf9ed] text-gray-900">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row  gap-8">
            {/* Brand Column */}
            <div className="flex-1 -translate-y-5">
              <Link href="/" className="inline-flex items-center group">
                <div className="relative size-16 sm:size-20 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src={logo} 
                    alt={"PocketShop Logo"} 
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-gray-600 max-w-sm mb-6">
                A fast, secure, and easy-to-use online marketplace connecting buyers and sellers for everything you need.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.facebook.com/Pocketshop"
                  target="_blank" 
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
               
              </div>
            </div>
<div className="flex items-start justify-between gap-8 sm:gap-12 lg:gap-16">
  
            {/* Shop Links */}
            <div className="mr-auto sm:ml-auto">
              <h4 className="mb-5 font-semibold text-sm uppercase tracking-wider text-gray-900">
                Shop
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {["All Categories", "Help"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-amber-600 transition-colors duration-200 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service Links */}
            <div className="mr-auto sm:ml-auto">
              <h4 className="mb-5 font-semibold text-sm uppercase tracking-wider text-gray-900">
                Customer Service
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  { label: "Track orders", link: "/track-order" },
                  { label: "Return & Refund", link: "/return-refund" },
                  { label: "Contact Us", link: "/contact" },
                ].map((item) => (
                  <li key={item.link}>
                    <Link
                      href={item.link}
                      className="hover:text-amber-600 transition-colors duration-200 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us Links */}
            <div className="mr-24 sm:ml-auto ">
              <h4 className="mb-5 font-semibold text-sm uppercase tracking-wider text-gray-900">
                About Us
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  { label: "Terms of Use", link: "/terms" },
                  { label: "Privacy Policy", link: "/privacy" },
                ].map((item) => (
                  <li key={item.link}>
                    <Link
                      href={item.link}
                      className="hover:text-amber-600 transition-colors duration-200 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
  </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600">
            <p className="text-center">
              © 2026 PocketShop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
