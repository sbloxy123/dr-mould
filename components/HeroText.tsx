import Link from "next/link";
import React from "react";

const HeroText = () => {
  return (
    <div className="relative flex h-screen content-container">
      <div className="w-[100vw] justify-center text-center md:text-left md:w-[60vw] my-auto">
        <h1 className="text-4xl pb-3 font-patua text-theme_indigo-900 uppercase tracking-wide">
          Dr Mould: Your Trusted Mould Treatment Solution
        </h1>
        <h3 className="text-3xl pb-8 tracking-wide font-normal text-theme_indigo-900">
          Reclaim your space, breathe easy, and restore beauty.
        </h3>
        <p className="pl-0 pb-12 p-2 w-full md:w-[80%] tracking-wide text-lg text-theme_indigo-900">
          Our meticulous approach ensures effective mould removal, leaving your
          home looking fresh and revitalised. Trust Dr Mould for professional
          and thorough mould treatment services in the Hertfordshire, Essex and
          Cambridgshire areas.
        </p>
        <Link
          href="/contact"
          className="bg-theme_indigo-900 cursor-pointer border-2 border-theme_indigo-900 ease-in-out duration-300  hover:border-2 hover:border-theme_indigo-900 hover:bg-theme_gold-900 rounded-sm md:w-[40%] m-auto text-lg capitalize text-theme_white-900 py-3 px-16 w-fit"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default HeroText;
