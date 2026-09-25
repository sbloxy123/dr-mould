import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "on-dark"
  | "outline-on-dark"
  | "text";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] text-center font-semibold leading-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-forest-700 text-paper hover:bg-forest-900",
  outline: "border-forest-700 text-forest-700 hover:bg-sage-100",
  "on-dark": "border-transparent bg-paper text-forest-700 hover:bg-linen",
  "outline-on-dark":
    "border-paper/60 text-paper hover:border-paper hover:bg-paper/10",
  text: "border-transparent text-forest-700 underline-offset-4 hover:text-leaf-600 hover:underline",
};

// Heights: sm 44px (minimum touch target), md 52px, lg 56px (60px on desktop).
const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[44px] py-2 text-[15px]",
  md: "min-h-[52px] py-2 text-base",
  lg: "min-h-[56px] py-3 text-[17px] lg:min-h-[60px] lg:text-lg",
};

const paddings: Record<ButtonSize, string> = {
  sm: "px-5",
  md: "px-6",
  lg: "px-7 lg:px-[30px]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: Omit<CommonProps, "children">) {
  return cn(
    base,
    variants[variant],
    sizes[size],
    variant === "text" ? "px-3" : paddings[size],
    fullWidth && "w-full",
    className
  );
}

// Renders a Next <Link> for internal paths, a plain <a> for tel:, mailto:,
// hash and external links, and a <button> when there's no href.
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
    ...rest
  } = props;
  const classes = buttonClasses({ variant, size, fullWidth, className });

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<
    ButtonAsButton,
    keyof CommonProps
  >;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
