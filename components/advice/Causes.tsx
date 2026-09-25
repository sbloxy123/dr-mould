import SectionHeading from "@/components/ui/SectionHeading";
import { causes } from "@/data/information";

// No Reveal here: this article is in view on page load.
export default function Causes() {
  return (
    <article id="causes" className="flex flex-col gap-4 lg:gap-[22px]">
      <SectionHeading eyebrow={causes.eyebrow} title={causes.title} size="article" />
      <p className="text-base leading-[1.65] text-ink-700 lg:text-lg lg:leading-[1.7]">
        {causes.intro}
      </p>
      <div className="grid grid-cols-2 gap-2.5 lg:gap-4 lg:pt-1.5">
        {causes.items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-1 rounded-[14px] border border-sand-200 bg-paper px-[18px] py-4 [@media(max-width:359px)]:px-3.5 lg:gap-2 lg:rounded-2xl lg:px-6 lg:py-[22px]"
          >
            <h3 className="hyphens-auto text-[17px] font-semibold text-forest-900 [@media(max-width:359px)]:text-base lg:text-lg">
              {item.title}
            </h3>
            <p className="text-[15px] leading-[1.55] text-ink-700 lg:text-base lg:leading-[1.6]">
              {item.bodyShort ? (
                <>
                  <span className="lg:hidden">{item.bodyShort}</span>
                  <span className="hidden lg:inline">{item.body}</span>
                </>
              ) : (
                item.body
              )}
            </p>
          </div>
        ))}
      </div>
      <p className="hidden text-lg leading-[1.7] text-ink-700 lg:block">
        {causes.conclusion}
      </p>
    </article>
  );
}
