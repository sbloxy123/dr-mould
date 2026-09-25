import Link from "next/link";
import type { FaqItem } from "@/data/information";
import { cn } from "@/utils/cn";

type FaqListProps = {
  items: FaqItem[];
  className?: string;
};

// Native <details>/<summary> accordion. The first item starts open. The
// "+" / "−" indicator is swapped with CSS via the `open` state, so no JS.
export default function FaqList({ items, className }: FaqListProps) {
  return (
    <div className={cn("flex flex-col border-t border-sand-300", className)}>
      {items.map((item, index) => (
        <details
          key={item.id}
          open={index === 0}
          className="group border-b border-sand-300 py-[18px] lg:py-6"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded-md text-[17px] font-semibold leading-snug text-forest-900 lg:text-xl [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              className="flex h-6 w-6 shrink-0 items-center justify-center text-xl leading-none text-leaf-600"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="flex max-w-[720px] flex-col gap-3 pt-3 text-base leading-[1.6] text-ink-700 lg:pt-3.5 lg:text-[17px] lg:leading-[1.65]">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {item.link && (
              <p>
                {item.link.prefix}{" "}
                <Link
                  href={item.link.href}
                  className="font-semibold text-forest-700 underline underline-offset-4 hover:text-leaf-600"
                >
                  {item.link.label}
                </Link>
                .
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
