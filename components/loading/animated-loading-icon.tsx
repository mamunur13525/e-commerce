"use client";

import PocketShopLoader from "./logo-animation";


export function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 size-full z-50  min-h-screen bg-linear-to-br from-[#f4f6f6] to-[#e8ebe8] flex flex-col items-center justify-center">
      <div className="mb-2">
        <PocketShopLoader />
      </div>
    </div>
  );
}
