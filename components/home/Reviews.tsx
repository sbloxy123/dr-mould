import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviewsIntro } from "@/data/home";
import { reviews } from "@/data/reviews";

// Only renders once data/reviews.ts has at least one review. The first
// review is the featured quote.
export default function Reviews() {
  const featured = reviews[0];
  if (!featured) return null;

  const meta = [featured.name, featured.town, featured.job].filter(Boolean);

  return (
    <section className="py-14 lg:py-28">
      <Container className="grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center lg:gap-[72px]">
        <Reveal className="flex flex-col lg:gap-4">
          <SectionHeading
            eyebrow={reviewsIntro.eyebrow}
            title={reviewsIntro.title}
          />
          <p className="hidden text-[17px] leading-[1.6] text-ink-700 lg:block">
            {reviewsIntro.intro}
          </p>
        </Reveal>
        <Reveal>
          <figure className="flex flex-col gap-4 rounded-[20px] border border-sand-200 bg-paper px-6 py-7 lg:gap-[22px] lg:rounded-3xl lg:px-14 lg:py-12">
            <svg
              width="44"
              height="34"
              viewBox="0 0 44 34"
              aria-hidden
              className="h-[26px] w-[34px] lg:h-[34px] lg:w-11"
            >
              <path
                d="M0 34V20.5C0 8.8 6.1 1.9 17 0l2 5.2c-6 1.7-9 5.4-9.3 11H17V34H0zm25 0V20.5C25 8.8 31.1 1.9 42 0l2 5.2c-6 1.7-9 5.4-9.3 11H42V34H25z"
                fill="#E3B55B"
              />
            </svg>
            <blockquote className="font-display text-[21px] leading-[1.45] text-forest-900 lg:text-[28px] lg:leading-[1.4]">
              {featured.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3 text-sm text-ink-500 lg:gap-3.5 lg:text-base">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 font-bold text-forest-700 lg:h-11 lg:w-11"
              >
                {featured.name.charAt(0).toUpperCase()}
              </span>
              <span>
                {meta.map((part, index) => (
                  <span key={part}>
                    {index > 0 && " · "}
                    {index === 0 ? (
                      <strong className="font-semibold text-ink-900">{part}</strong>
                    ) : (
                      part
                    )}
                  </span>
                ))}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
