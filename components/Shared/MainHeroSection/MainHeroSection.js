import { useRouter } from "next/router";
import React from "react";
import FrontInformation from "./FrontInformation";
import HeroSlider from "./HeroSlider";

const MainHeroSection = () => {
  const router = useRouter();

  return (
    <div className="h-full  lg:h-screen w-full mx-auto relative">
      <div className="bg-green-500 h-full w-full">
        <HeroSlider />
      </div>

      <FrontInformation />
    </div>
  );
};

export default MainHeroSection;
