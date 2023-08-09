import Hero from "@/components/Hero";
import ActionBoxes from "@/components/ActionBoxes";
import { mouldRemoval } from "@/data/information";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ActionBoxes />
      <div className="pt-10">
        {mouldRemoval.map((topic) => {
          return (
            <div
              key={topic.title}
              className="content-container grid grid-cols-12 mb-10"
            >
              <div className="col-span-2 col-start-2 text-xl font-semibold font-patua text-theme_dark_green-900">
                {topic.title}
              </div>
              <div className="col-span-7 col-start-5 col-end-11">
                {topic.content.map((p) => {
                  return (
                    <p key={p} className="pb-8">
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Contact />
      <FAQ />
    </main>
  );
}
