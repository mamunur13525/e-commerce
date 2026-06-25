"use client";

import Link from "next/link";
import {
  HelpCircleIcon,
  GiftIcon,
} from "hugeicons-react";
import Image from "next/image";
import { toast } from "sonner";
import logo from "@/public/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#fdf9ed]  text-gray-900 border-t border-gray-100">
      <div className="container mx-auto px-4 ">
        <div className="py-16 flex items-start flex-wrap justify-between">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2">
              {/* Logo */}
              <div className="relative size-24">
              <Image src={logo} alt={'logo'}/>
              </div>
            </Link>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-700">
              A fast, secure, and easy-to-use online marketplace connecting buyers and sellers for everything you need.
            </p>
          </div>

          <div className="flex items-start gap-10">

            <div className="ml-auto">
              <h4 className="mb-6 font-semibold">About us</h4>
              <ul className="space-y-4 text-sm text-gray-700">
                {[
                  "About",
                  "Help"
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-amber-500 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-semibold">Services</h4>
              <ul className="space-y-4 text-sm text-gray-700">
                {[
                  "Gift Card",
                  "Mobile App",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-amber-500 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
            <div>
              <h4 className="mb-6 font-semibold">Help</h4>
              <ul className="space-y-4 text-sm text-gray-700">
                <li>
                  <Link
                    href="/return-refund"
                    className="text-sm text-gray-700 hover:text-amber-500 transition-colors"
                  >
                    Return & Refund
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="text-sm text-gray-700 hover:text-amber-500 transition-colors"
                  >
                    Track orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-700 hover:text-amber-500 transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-gray-700 md:flex-row">
            <div className="flex gap-6">
              <button
                onClick={() => toast.warning("Coming soon")}
                className="flex items-center gap-2 hover:text-[#003d29] bg-transparent hover:bg-transparent hover:border-none text-inherit cursor-pointer"
              >
                <GiftIcon className="text-pink-400 size-4" />
                Gift Cards
              </button>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-[#003d29]"
              >
                <HelpCircleIcon className="text-pink-400 size-4" />
                Help Center
              </Link>
            </div>

            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-[#003d29]">
                Terms of Use
              </Link>
              <Link href="/privacy" className="hover:text-[#003d29]">
                Privacy Policy
              </Link>
            </div>

            <div className="text-center md:text-right">
              All Right reserved by Gromuse | 2026
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
