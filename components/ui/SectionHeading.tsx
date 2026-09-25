import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Tone = "light" | "dark";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block text-[13px] font-semibold uppercase tracking-[0.1em] lg:text-sm",
        tone === "dark" ? "text-gold-400" : "text-leaf-600",
        className
      )}
    >
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  // "compact" uses the 30px mobile H2 from the Mould advice page.
  size?: "default" | "compact";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  size = "default",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-3 lg:gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn(
          "font-display font-medium lg:text-[46px] lg:leading-[1.1]",
          size === "compact"
            ? "text-[30px] leading-[1.12]"
            : "text-[32px] leading-[1.12]",
          dark ? "text-paper" : "text-forest-900"
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            "text-[17px] leading-[1.6] lg:text-lg lg:leading-[1.7]",
            align === "center" && "max-w-[640px]",
            dark ? "text-mist-200" : "text-ink-700"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
