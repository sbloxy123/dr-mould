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
        tone === "dark" ? "text-gold-400" : "text-leaf-700",
        className
      )}
    >
      {children}
    </span>
  );
}

const headingSizes = {
  default: "text-[32px] lg:text-[46px]",
  compact: "text-[30px] lg:text-[46px]",
  article: "text-[30px] lg:text-[40px]",
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  // default: 32px mobile / 46px desktop.
  // compact: 30px mobile / 46px desktop (Mould advice section headings).
  // article: 30px mobile / 40px desktop (Mould advice article headings).
  size?: "default" | "compact" | "article";
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
          "font-display font-medium leading-[1.12] lg:leading-[1.1]",
          headingSizes[size],
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
