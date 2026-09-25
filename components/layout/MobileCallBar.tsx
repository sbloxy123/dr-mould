"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

// Fixed call-to-action bar below `lg`. On /contact the form is already on
// the page, so it shows a single call button instead.
export default function MobileCallBar() {
  const pathname = usePathname();
  const onContact = pathname === "/contact";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-paper px-4 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3 shadow-callbar lg:hidden">
      {onContact ? (
        <Button href={site.phoneHref} variant="outline" fullWidth>
          <Phone size={18} strokeWidth={2} aria-hidden />
          Rather talk? Call {site.phoneDisplay}
        </Button>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          <Button href={site.phoneHref} variant="outline" fullWidth>
            <Phone size={18} strokeWidth={2} aria-hidden />
            Call us
          </Button>
          <Button href="/contact" fullWidth>
            Free quote
          </Button>
        </div>
      )}
    </div>
  );
}
