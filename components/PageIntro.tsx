import Link from "next/link";
import Container from "@/components/ui/Container";
import { cn } from "@/utils/cn";

type PageIntroProps = {
  title: string;
  lead: string;
  // Shorter lead for mobile, if the design uses one.
  leadShort?: string;
  // The current page's name in the breadcrumb.
  crumb: string;
  // `band`: paper background with a bottom border (Mould advice, Our work).
  // `plain`: sits on the linen page background (Contact).
  variant?: "band" | "plain";
  // "long" drops the mobile H1 to 36px for longer titles (Contact).
  titleSize?: "default" | "long";
  className?: string;
};

// Breadcrumb, H1 and lead paragraph at the top of inner pages.
export default function PageIntro({
  title,
  lead,
  leadShort,
  crumb,
  variant = "band",
  titleSize = "default",
  className,
}: PageIntroProps) {
  return (
    <section
      data-slot="page-intro"
      className={cn(
        variant === "band"
          ? "border-b border-sand-200 bg-paper pb-8 pt-7 lg:pb-[72px] lg:pt-16"
          : "pb-6 pt-7 lg:pb-12 lg:pt-16",
        className
      )}
    >
      <Container className="flex flex-col gap-3.5 lg:gap-[18px]">
        <nav data-slot="page-intro-breadcrumb" aria-label="Breadcrumb">
          <ol className="flex gap-1.5 text-[13px] text-ink-500 lg:gap-2 lg:text-sm">
            <li>
              <Link
                href="/"
                className="underline underline-offset-2 hover:text-leaf-600"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-ink-900">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1
          data-slot="page-intro-title"
          className={cn(
            "font-display font-medium tracking-[-0.015em] text-forest-900 lg:text-[60px] lg:leading-[1.05] lg:tracking-[-0.02em]",
            titleSize === "long"
              ? "text-[36px] leading-[1.08]"
              : "text-[40px] leading-[1.05]"
          )}
        >
          {title}
        </h1>
        <p data-slot="page-intro-lead" className="max-w-[720px] text-[17px] leading-[1.55] text-ink-700 lg:text-xl lg:leading-[1.6]">
          {leadShort ? (
            <>
              <span className="lg:hidden">{leadShort}</span>
              <span className="hidden lg:inline">{lead}</span>
            </>
          ) : (
            lead
          )}
        </p>
      </Container>
    </section>
  );
}
