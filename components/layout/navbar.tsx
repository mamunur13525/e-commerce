"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FlashIcon,
  Menu01Icon,
  Search01Icon,
  ShoppingBasket01Icon,
  UserIcon,
  Settings02Icon,
  Logout01Icon,
  Home01Icon,
  VegetarianFoodIcon,
} from "hugeicons-react";
import { SearchBar } from "@/components/layout/search-bar";
import { CartSheet } from "@/components/layout/cart-sheet";

export function Navbar() {
  return (
    <nav className="bg-[#003d29] text-white py-4 px-6 md:px-12 flex items-center justify-between gap-4 sticky top-0 z-50">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Sidebar Trigger */}
        <Sheet>
          <SheetTrigger className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <Menu01Icon className="size-6 text-white" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white text-gray-900 w-[300px] sm:w-[350px]"
          >
            <SheetHeader>
              <SheetTitle className="text-left px-4 text-xl font-bold text-[#003d29]">
                Gromuse Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 mt-8">
              <Link
                href="/"
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium"
              >
                <Home01Icon className="size-6 text-[#003d29]" />
                Home
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium"
              >
                <VegetarianFoodIcon className="size-6 text-[#003d29]" />
                Shop by Category
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium"
              >
                <ShoppingBasket01Icon className="size-6 text-[#003d29]" />
                My Orders
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-lg font-medium"
              >
                <Settings02Icon className="size-6 text-[#003d29]" />
                Settings
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          {/* Logo */}
          <div className="relative size-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-orange-500"
            >
              <path
                d="M4 8h16l-2 12H6L4 8z"
                fill="currentColor"
                stroke="white"
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
          <span className="text-xl font-semibold tracking-tight">Gromuse</span>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <SearchBar />

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Delivery Info */}
        <div className="items-center gap-2 hidden lg:flex text-amber-400 font-medium text-sm">
          <FlashIcon className="size-5 fill-current" />
          <span>
            Order now and get it within{" "}
            <span className="text-[#d4e157]">15 mint!</span>
          </span>
        </div>

        {/* Cart Sidebar */}
        <CartSheet />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none rounded-full">
            <Avatar className="size-10 border-2 border-white/20 hover:border-white transition-colors cursor-pointer">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-[#002a1c] text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/account/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/account/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings02Icon className="mr-2 size-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/login">
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                  <Logout01Icon className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
