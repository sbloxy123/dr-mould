import { Slider } from "@/components/ImageSlider";
import React from "react";
import { beforeAfter } from "../../data/before-after";

const page = () => {
  return (
    <div>
      <h1 className="text-4xl text-center py-16 bg-theme_dark_green-900 text-theme_white-900">
        Gallery
      </h1>

      <div className="flex flex-wrap gap-3 justify-center py-10 content-container">
        {beforeAfter.map((data) => {
          return (
            <div key={data.title} className="md:w-[40vw] w-full">
              <h2 className="capitalize text-2xl py-6">{data.title}</h2>
              <Slider before={data.beforeImage} after={data.afterImage} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

{
  /* <div className="w-[80%] my-20 m-auto border-b-2 border-theme_indigo-900"></div> */
}
export default page;
