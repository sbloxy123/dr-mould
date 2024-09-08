// "use client";
import React from "react";
import Image from "next/image";
import HeroText from "./HeroText";

const Hero = () => {
  return (
    <>
      <section className="hero relative z-10 h-screen ">
        {/* <div className="relative z-10 h-screen bg-black opacity-60"></div> */}
        <div>
          <Image
            className="opacity-40 bg-center"
            src="/hero-img.png"
            alt="background image of mould on wall"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            priority
            blurDataURL="/hero-img-blur.png"
          />
          <div className="hero__colour__overlay"></div>
        </div>
        <HeroText />
      </section>
    </>
  );
};

export default Hero;
