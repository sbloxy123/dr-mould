import { Mail, Phone } from "lucide-react";
import { quickContact } from "@/data/contact";
import { site } from "@/data/site";

// Mobile only: two tiles above the form. Desktop has the "Prefer to talk?"
// card in the sidebar instead.
export default function QuickContact() {
  return (
    <div className="grid grid-cols-2 gap-2.5 pb-6 lg:hidden">
      <a
        href={site.phoneHref}
        className="flex flex-col gap-2 rounded-2xl bg-forest-700 p-4 text-paper transition-colors hover:bg-forest-900"
      >
        <Phone size={22} strokeWidth={2} className="text-gold-400" aria-hidden />
        <span className="text-base font-semibold">{quickContact.call.title}</span>
        <span className="text-sm text-mist-200">{site.phoneDisplay}</span>
      </a>
      <a
        href={site.emailHref}
        className="flex flex-col gap-2 rounded-2xl border border-sand-200 bg-paper p-4 text-forest-700 transition-colors hover:border-leaf-600"
      >
        <Mail size={22} strokeWidth={2} className="text-leaf-600" aria-hidden />
        <span className="text-base font-semibold">{quickContact.email.title}</span>
        <span className="text-sm text-ink-500">{quickContact.email.note}</span>
      </a>
    </div>
  );
}
