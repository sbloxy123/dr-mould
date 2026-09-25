import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

const exploreLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our work", href: "/gallery" },
  { label: "Mould advice", href: "/information" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const linkClass = "text-mist-200 transition-colors hover:text-paper hover:underline";

export default function Footer() {
  return (
    <footer className="bg-forest-900 pb-[120px] pt-12 text-mist-200 lg:pb-10 lg:pt-20">
      <Container className="flex flex-col gap-7 lg:gap-14">
        <div className="grid gap-7 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-[18px]">
            <Link href="/" className="flex w-fit items-center gap-2.5 lg:gap-3">
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-paper lg:h-[52px] lg:w-[52px]">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="h-9 w-9 lg:h-10 lg:w-10"
                />
              </span>
              <span className="font-display text-[25px] font-semibold text-paper lg:text-[28px]">
                {site.name}
              </span>
            </Link>
            <p className="max-w-[420px] text-[15px] leading-[1.6] lg:text-base lg:leading-[1.65]">
              Mould removal, treatment and prevention specialists, based in{" "}
              {site.base}. Serving Hertfordshire, Essex and Cambridgeshire.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:gap-12">
            <nav aria-label="Footer" className="flex flex-col gap-2.5 text-[15px] lg:gap-3 lg:text-base">
              <span className="font-semibold text-paper">Explore</span>
              {exploreLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5 text-[15px] lg:gap-3 lg:text-base">
              <span className="font-semibold text-paper">Get in touch</span>
              <a href={site.phoneHref} className={linkClass}>
                {site.phoneDisplay}
              </a>
              <a href={site.emailHref} className={linkClass}>
                <span className="lg:hidden">Email us</span>
                <span className="hidden break-all lg:inline">{site.email}</span>
              </a>
              <span>{site.hours}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-mist-200/20 pt-[18px] text-[13px] text-mist-300 lg:flex-row lg:justify-between lg:pt-6 lg:text-sm">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>
            Design &amp; build by{" "}
            <a
              href={site.designCredit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline underline-offset-2 hover:text-gold-400"
            >
              {site.designCredit.label}
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
