import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { UserData, cartStore } from "../../../store/createStore";
import CartSidebar from "../Cart/CartSidebar";
import Dropdown from "../Dropdown/Dropdown";
import SearchGlobal from "../SearchGlobal/SearchGlobal";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const [showingSearch, setShowingSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showNavs, setShowNavs] = useState(false);
  const sideNavRef = useRef(null);
  const cartItems = cartStore((state) => state.items);

  const router = useRouter();



  useEffect(() => {
    if (showCart) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [showCart]);

  // Getting user data
  const setUserData = UserData((state) => state.setUserData);
  const userData = UserData((state) => state.data);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email && session.user.email !== userData.email) {
      try {
        fetch('/api/user-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: session.user.email })
        })
          .then(res => res.json())
          .then(userResult => {
            if (userResult?.error) {
              toast.error(userResult.error || 'Something went wrong.');
            } else {
              setUserData(userResult);
            }
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, [session?.user?.email]);


  const [isVisible, setIsVisible] = useState(true); // State to track navbar visibility
  const [lastScrollTop, setLastScrollTop] = useState(0); // Store the last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollTop) {
        // Scroll down: Hide the navbar
        setIsVisible(false);
      } else {
        // Scroll up: Show the navbar
        setIsVisible(true);
      }
      setLastScrollTop(currentScrollY <= 0 ? 0 : currentScrollY); // Update last scroll position
    };

    // Add the event listener for scrolling
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      <div onClick={() => setShowCart(false)} className={`fixed left-0 top-0 w-full h-full block ${showCart ? "z-[120] opacity-50" : "z-[-2] opacity-0 hidden"} bg-gray-900 transition-all`}></div>
      <CartSidebar cart={[showCart, setShowCart]} />
      <SearchGlobal showingSearch={showingSearch} setShowingSearch={setShowingSearch} />
      <div ref={sideNavRef} className={`fixed w-full ${showNavs ? "left-0" : "-left-full"} top-0 h-screen bg-gray-800 z-[150] text-white transition-all`}>
        <p className="flex items-center justify-between text-white text-2xl p-4 text-center font-semibold">
          <span>Navbar</span>
          <IoCloseSharp onClick={() => setShowNavs(false)} className="text-xl text-white cursor-pointer" />
        </p>
        <NavItemAccordion setShowNavs={setShowNavs} />
      </div>
      <nav className={twMerge(`shadow-md bg-white border-b border-gray-200 sticky z-[100] top-0 duration-300`, isVisible ? 'translate-y-0' : '-translate-y-full')}>
        <div className="z-[120] w-full px-10 lg:px-20 md:px-15 py-4 h-[fit-content] bg-white">
          <div className="container px-0 grid grid-cols-8 sm:grid-cols-3 items-center mx-auto">
            <div className="w-full col-span-2 sm:col-span-1">
              <div className="md:hidden">
                <GrClose onClick={() => setShowNavs(false)} className={`${showNavs ? "" : "hidden"} cursor-pointer text-[25px]`} />
                <RiBarChartHorizontalLine onClick={() => setShowNavs(true)} className={`${showNavs ? "hidden" : ""} cursor-pointer text-[25px]`} />
              </div>
              <div className="hidden md:flex gap-1 items-center">
                <CgProfile />
                {session?.user?.email ? (
                  <Dropdown
                    title={{ title: "My Account", css: "border-none", icon: false }}
                    menuItems={[
                      { id: 0, name: "my profile", navigateLink: "/profile" },
                      { id: 1, name: "settings" },
                      { id: 2, name: "sign out", special: 'signout' }
                    ]}
                  />
                ) : (
                  <Dropdown
                    title={{ title: "My Account", css: "border-none", icon: false }}
                    menuItems={[
                      { id: 1, name: "settings" },
                      { id: 2, name: "sign in", navigateLink: "/login" }
                    ]}
                  />
                )}
              </div>
              <a href="tel:+8801935-015460" className="hidden md:flex gap-1 items-center">
                <BsTelephone />
                <span className="text-green-500">+8801935-015460</span>
              </a>
            </div>
            <div className="col-span-4 sm:col-span-1 flex flex-col justify-center items-center gap-3">
              <Link href="/" passHref>
                <div className="flex items-center justify-center cursor-pointer">
                  <img src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/h1_logo1.png?v=53464895439087604121500261105" className="md:h-10 md:w-auto w-full h-auto" alt="Flowbite Logo" />
                </div>
              </Link>
              <div className="hidden md:flex gap-3">
                <Link href={'/'}>
                  <span className="hover:underline cursor-pointer">Home</span>
                </Link>
                <Link href={'/shop'}>
                  <span className="hover:underline cursor-pointer">Shop</span>
                </Link>
              </div>
            </div>
            <div className="flex justify-end gap-4 w-full col-span-2 sm:col-span-1">
              <div className="relative">
                <IoSearch onClick={() => setShowingSearch((prev) => !prev)} className="text-2xl cursor-pointer" />
              </div>
              <div className="relative">
                <FiShoppingBag onClick={() => setShowCart(true)} className="text-2xl cursor-pointer" />
                {cartItems?.length === 0 ? null : (
                  <span className="absolute -right-2 -bottom-2 bg-green-500 text-white w-4 h-4 text-xs font-semibold grid place-items-center rounded-full">
                    {cartItems?.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavItemAccordion = ({ setShowNavs }) => {
  const [showAccordion, setShowAccordion] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  const signOutHandler = () => {
    localStorage.setItem('user', null);
    signOut();
  };

  return (
    <div>
      <div className="px-5">
        <div onClick={() => router.push('/')} className="flex justify-between gap-4 items-center cursor-pointer border-b border-white py-4 text-xl font-medium">
          Home
        </div>
        <div onClick={() => router.push('/shop')} className="flex justify-between gap-4 items-center cursor-pointer border-b border-white py-4 text-xl font-medium">
          Shop
        </div>
        {session?.user?.email && (
          <div onClick={() => router.push('/profile')} className="flex justify-between gap-4 items-center cursor-pointer border-b border-white py-4 text-xl font-medium">
            Profile
          </div>
        )}
        {session?.user?.email && (
          <div onClick={signOutHandler} className="flex justify-between gap-4 items-center cursor-pointer border-b border-white py-4 text-xl font-medium">
            Sign out
          </div>
        )}
        {!session?.user?.email && (
          <div onClick={() => router.push('/login')} className="flex justify-between gap-4 items-center cursor-pointer border-b border-white py-4 text-xl font-medium">
            Sign in
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
