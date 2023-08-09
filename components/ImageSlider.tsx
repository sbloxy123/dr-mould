"use client";

import Image from "next/image";
import { useState } from "react";

export const Slider = ({
  before,
  after,
}: {
  before: string;
  after: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    // console.log(percent, "DESKTOP");

    setSliderPosition(percent);
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(event.touches[0].clientX - rect.left, rect.width)
    );
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="w-full relative"
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <Image alt="" fill sizes="auto" priority src={after} />

        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image fill priority alt="" sizes="auto" src={before} />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-theme_indigo-900 cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-theme_indigo-900 absolute rounded-full h-fit w-32 text-center  top-[calc(10%-5px)]">
            <p className=" uppercase bg-theme_indigo-900 w-full text-white rounded-r-full">
              Slide me
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
