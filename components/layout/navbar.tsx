"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  ShoppingBasket01Icon,
  UserIcon,
  Logout01Icon,
  FavouriteIcon,
  DashboardSquare01Icon,
} from "hugeicons-react";
import { SearchBar } from "@/components/layout/search-bar";
import { CartSheet } from "@/components/layout/cart-sheet";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import Image from "next/image";
import logo from "@/public/assets/logo2.png";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
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
      return (
        `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User"
      );
    }
    return "Guest";
  };

  return (
    <header className="bg-white backdrop-blur-2xl sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto py-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="relative">
            <Image className="size-12 w-full" src={logo} alt="logo" />
          </Link>
        </div>

        {/* Center: Search Bar - full width on mobile, inline on desktop */}
        <div className="order-3 md:order-0 w-11/12 mx-auto md:flex-1 md:max-w-2xl">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <Link href="/wishlist" className="group relative flex flex-col items-center justify-center cursor-pointer">
            <FavouriteIcon className="size-6  duration-200" />
            <span className="hidden md:inline  duration-200">Wishlist</span>
          </Link>

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
                    <DropdownMenuLabel className={"py-0"}>
                      {getUserName()}
                    </DropdownMenuLabel>
                    <div className="px-2 text-sm font-semibold line-clamp-1 overflow-hidden w-full truncate">
                      {user?.email || ""}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/account/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserIcon className="mr-2 size-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/account/orders">
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingBasket01Icon className="mr-2 size-4" />
                      <span>Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  {(user as any)?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <Link href="/admin">
                        <DropdownMenuItem className="cursor-pointer">
                          <DashboardSquare01Icon className="mr-2 size-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
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
            <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>
              <Button
                variant="ghost"
                className="text-black flex flex-col hover:bg-transparent cursor-pointer"
              >
                <UserIcon className="size-6  duration-200" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
