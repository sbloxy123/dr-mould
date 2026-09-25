import Image from "next/image";
import { cn } from "@/utils/cn";

type Size = "lg" | "sm";

type BeforeAfterPairProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  // Height of each image, as Tailwind classes (e.g. "h-[200px] lg:h-[400px]").
  heightClassName: string;
  // "lg" is the hero card (10px gap, 14px outer radius, tags top-left).
  // "sm" is Recent work (6px gap, 12px outer radius, tags bottom-left).
  size?: Size;
  // Passed to next/image so it picks a sensible source size.
  sizes: string;
  priority?: boolean;
  className?: string;
};

const tagBase =
  "absolute rounded-full font-semibold uppercase tracking-[0.06em] leading-none";

// A static before/after pair side by side. Outer corners are rounded, the
// corners that meet in the middle are nearly square.
export default function BeforeAfterPair({
  before,
  after,
  beforeAlt,
  afterAlt,
  heightClassName,
  size = "sm",
  sizes,
  priority = false,
  className,
}: BeforeAfterPairProps) {
  const large = size === "lg";
  const tagPosition = large
    ? "left-2.5 top-2.5 px-2.5 py-1 text-[11px] lg:left-3.5 lg:top-3.5 lg:px-3 lg:py-1.5 lg:text-[13px]"
    : "bottom-2 left-2 px-[9px] py-1 text-[11px] lg:bottom-2.5 lg:left-2.5 lg:px-2.5 lg:text-xs";

  return (
    <div
      className={cn(
        "grid grid-cols-2",
        large ? "gap-1.5 lg:gap-2.5" : "gap-1.5",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          heightClassName,
          large
            ? "rounded-l-[14px] rounded-r-[2px] lg:rounded-r-[4px]"
            : "rounded-l-xl rounded-r-[2px]"
        )}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <span
          className={cn(tagBase, tagPosition, "bg-forest-900/90 text-paper")}
        >
          Before
        </span>
      </div>
      <div
        className={cn(
          "relative overflow-hidden",
          heightClassName,
          large
            ? "rounded-r-[14px] rounded-l-[2px] lg:rounded-l-[4px]"
            : "rounded-r-xl rounded-l-[2px]"
        )}
      >
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <span
          className={cn(tagBase, tagPosition, "bg-gold-400 text-forest-900")}
        >
          After
        </span>
      </div>
    </div>
  );
}
