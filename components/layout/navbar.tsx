"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ShoppingBasket01Icon,
  UserIcon,
  Settings02Icon,
  Logout01Icon,
  Home01Icon,
  VegetarianFoodIcon,
  HeartAddIcon,
} from "hugeicons-react";
import { SearchBar } from "@/components/layout/search-bar";
import { CartSheet } from "@/components/layout/cart-sheet";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useState } from "react";

export function Navbar() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getInitials = () => {
    if (user) {
      const first = user.first_name?.[0]?.toUpperCase() || "";
      const last = user.last_name?.[0]?.toUpperCase() || "";
      return first + last || "U";
    }
    return "U";
  };

  const getUserName = () => {
    if (user) {
      return `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User";
    }
    return "Guest";
  };
  return (
    <nav className="bg-[#003d29] backdrop-blur-2xl text-white py-4 px-6 md:px-12 flex items-center justify-between gap-4 sticky top-0 z-50">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Sidebar Trigger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <Menu01Icon className="size-6 text-white" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white text-gray-900 w-75 sm:w-87.5"
          >
            <SheetHeader>
              <SheetTitle className="text-left px-4 text-xl font-bold text-[#003d29]">
                Gromuse
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 mt-8">
              <Link
                href="/"
                className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors text-lg font-medium"
                onClick={() => setSheetOpen(false)}
              >
                <Home01Icon className="size-6 text-[#003d29]" />
                Home
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors text-lg font-medium"
                onClick={() => setSheetOpen(false)}
              >
                <VegetarianFoodIcon className="size-6 text-[#003d29]" />
                Shop by Category
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors text-lg font-medium"
                onClick={() => setSheetOpen(false)}

              >
                <ShoppingBasket01Icon className="size-6 text-[#003d29]" />
                My Orders
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors text-lg font-medium"
                onClick={() => setSheetOpen(false)}
              >
                <Settings02Icon className="size-6 text-[#003d29]" />
                Settings
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          {/* Logo */}
          <div className="relative size-9">
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

        <CartSheet />

        {/* User Profile Dropdown */}
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none rounded-full">
              <Avatar className="size-10 border-2 border-white/20 hover:border-white transition-colors cursor-pointer">
                <AvatarImage src={user.image || "/placeholder-user.jpg"} />
                <AvatarFallback className="bg-[#002a1c] text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <div className="py-2">
                  <DropdownMenuLabel className={'py-0'}>{getUserName()}</DropdownMenuLabel>
                  <div className="px-2 text-sm font-semibold line-clamp-1 overflow-hidden w-full truncate">{user?.email || ""}</div>
                </div>
                <DropdownMenuSeparator />
                <Link href="/account/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="mr-2 size-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/wishlist">
                  <DropdownMenuItem className="cursor-pointer">
                    <HeartAddIcon className="mr-2 size-4" />
                    <span>Wishlist</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={handleLogout}
                >
                  <Logout01Icon className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white hover:text-white cursor-pointer hover:bg-white/10 border border-white/20"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
