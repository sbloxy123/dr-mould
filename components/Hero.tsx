// "use client";
import React from "react";
import Image from "next/image";
import HeroText from "./HeroText";

const Hero = () => {
  return (
    <>
      <div className="relative z-10 h-screen bg-theme_dark_green-900">
        {/* <div className="relative z-10 h-screen bg-black opacity-60"></div> */}
        <div className="relative">
          <Image
            className="opacity-40 bg-center"
            src="/hero-img.png"
            alt="background image"
            fill
            style={{ objectFit: "cover", position: "absolute" }}
            sizes="100vw"
            placeholder="blur"
            // priority
            blurDataURL="/hero-img-blur.png"
          />
          <HeroText />
        </div>
      </div>
    </>
  );
};

export default Hero;
