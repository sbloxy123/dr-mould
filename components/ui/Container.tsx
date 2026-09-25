import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

// 1200px content column, centred. Gives 120px side margins at 1440px.
// Pass `data-slot` to rename it when the container is a component's root.
export default function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      data-slot="container"
      className={cn("mx-auto w-full max-w-content px-4 md:px-8 xl:px-0", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
