"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent, MouseEvent, TouchEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/utils/cn";

type BeforeAfterSliderProps = {
  // Used in the range input's label: "Compare before and after: {title}".
  title: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  // Passed to next/image so it picks a sensible source size.
  sizes: string;
  priority?: boolean;
  className?: string;
};

const tagBase =
  "pointer-events-none absolute top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.06em] lg:top-3.5 lg:px-[11px] lg:py-[5px] lg:text-xs";

function clampPercent(clientX: number, rect: DOMRect) {
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
  return Math.max(0, Math.min((x / rect.width) * 100, 100));
}

// A square before/after comparison. Drag the handle (mouse or touch), or
// focus the slider and use the arrow keys: a visually hidden range input
// drives the same position.
export default function BeforeAfterSlider({
  title,
  before,
  after,
  beforeAlt,
  afterAlt,
  sizes,
  priority = false,
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    setSliderPosition(
      clampPercent(event.clientX, event.currentTarget.getBoundingClientRect())
    );
  };

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setSliderPosition(
      clampPercent(event.clientX, event.currentTarget.getBoundingClientRect())
    );
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setSliderPosition(
      clampPercent(
        event.touches[0].clientX,
        event.currentTarget.getBoundingClientRect()
      )
    );
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setSliderPosition(
      clampPercent(
        event.touches[0].clientX,
        event.currentTarget.getBoundingClientRect()
      )
    );
  };

  const stopDragging = () => setIsDragging(false);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(event.target.value));
  };

  return (
    <div
      data-slot="before-after-slider"
      className={cn(
        "relative aspect-square w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-sand-200 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-leaf-600 lg:rounded-[18px]",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDragging}
      onTouchCancel={stopDragging}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="object-cover"
      />

      <div
        data-slot="before-after-slider-before"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover"
        />
      </div>

      {/* Divider line and handle. Purely visual: the range input is the control. */}
      <div
        data-slot="before-after-slider-handle"
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-paper"
        style={{ left: `${sliderPosition}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-forest-700 shadow-handle">
          <ChevronsLeftRight size={22} strokeWidth={2.2} aria-hidden />
        </span>
      </div>

      <span className={cn(tagBase, "left-3 bg-forest-900/90 text-paper lg:left-3.5")}>
        Before
      </span>
      <span className={cn(tagBase, "right-3 bg-gold-400 text-forest-900 lg:right-3.5")}>
        After
      </span>

      <input
        data-slot="before-after-slider-input"
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(sliderPosition)}
        onChange={handleRangeChange}
        aria-label={`Compare before and after: ${title}`}
        aria-valuetext={`${Math.round(sliderPosition)}% before, ${
          100 - Math.round(sliderPosition)
        }% after`}
        className="sr-only"
      />
    </div>
  );
}
