import React from "react";

const HeroText = () => {
  return (
    <div className="relative flex h-screen content-container">
      <div className="w-[100vw] justify-center text-center md:text-left md:w-[60vw] my-auto">
        <h1 className="text-5xl pb-12 font-patua text-theme_indigo-900">
          Dr Mould: Your Trusted Mould Treatment Solution
        </h1>
        <p className="pb-12 p-2 w-full md:w-[80%] tracking-wide text-lg text-theme_indigo-900">
          Reclaim your space, breathe easy, and restore beauty. Our meticulous
          approach ensures effective mould removal, leaving your home looking
          fresh and revitalized. Trust Dr Mould for top-notch mould treatment
          services.
        </p>
        <div className="bg-theme_indigo-900 cursor-pointer border-2 border-theme_indigo-900 ease-in-out duration-300  hover:border-2 hover:border-theme_indigo-900 hover:bg-theme_gold-900 rounded-sm w-full md:w-[40%]">
          <p className="m-auto text-lg capitalize text-theme_white-900 py-3 w-fit">
            Contact us
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
