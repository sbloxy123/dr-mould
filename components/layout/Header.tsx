"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { navLinks, site } from "@/data/site";
import { cn } from "@/utils/cn";

function isCurrent(href: string, pathname: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Esc closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="relative z-40 border-b border-sand-200 bg-paper">
      <Container className="flex h-16 items-center justify-between lg:h-[88px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-forest-700 lg:gap-3"
          aria-label={`${site.name}, home`}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={48}
            height={48}
            priority
            unoptimized
            className="h-[38px] w-[38px] lg:h-12 lg:w-12"
          />
          <span className="flex flex-col leading-[1.05]">
            <span className="font-display text-[22px] font-semibold lg:text-[26px]">
              {site.name}
            </span>
            <span className="hidden text-xs uppercase tracking-[0.08em] text-ink-500 lg:block">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {navLinks.map((link) => {
              const current = isCurrent(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "border-b-2 pb-1 text-base font-medium transition-colors",
                      current
                        ? "border-leaf-600 text-forest-700"
                        : "border-transparent text-ink-900 hover:text-leaf-600"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 px-4 py-3 text-[17px] font-semibold text-forest-700 transition-colors hover:text-leaf-600 xl:flex"
          >
            <Phone size={18} strokeWidth={2} aria-hidden />
            {site.phoneDisplay}
          </a>
          <Button href="/contact">Get a free quote</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2.5 flex h-11 w-11 items-center justify-center rounded-full text-forest-700 lg:hidden"
        >
          {open ? (
            <X size={24} strokeWidth={2} aria-hidden />
          ) : (
            <Menu size={24} strokeWidth={2} aria-hidden />
          )}
        </button>
      </Container>

      {/* Mobile menu: drops down under the header. `invisible` when closed so
          its links drop out of the tab order. */}
      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full border-b border-sand-200 bg-paper shadow-soft transition duration-200 ease-out lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        )}
      >
        <Container>
          <nav aria-label="Mobile">
            <ul>
              {navLinks.map((link) => {
                const current = isCurrent(link.href, pathname);
                return (
                  <li key={link.href} className="border-b border-sand-300">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "flex h-14 items-center text-[17px] font-semibold",
                        current ? "text-forest-700" : "text-ink-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 pb-5 pt-4">
            <Button href={site.phoneHref} variant="outline" fullWidth onClick={close}>
              <Phone size={18} strokeWidth={2} aria-hidden />
              Call {site.phoneDisplay}
            </Button>
            <Button href="/contact" fullWidth onClick={close}>
              Get a free quote
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
