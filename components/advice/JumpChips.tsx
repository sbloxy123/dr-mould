import { adviceSections } from "@/data/information";

// Mobile replacement for the desktop "On this page" aside.
export default function JumpChips() {
  return (
    <nav aria-label="On this page" className="pt-4 lg:hidden">
      <ul className="flex flex-wrap gap-2">
        {adviceSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="flex min-h-[44px] items-center rounded-full bg-sage-100 px-4 text-sm font-semibold text-forest-700 transition-colors hover:bg-sage-50"
            >
              {section.chip}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
