import Hero from "@/components/Hero";
import ActionBoxes from "@/components/ActionBoxes";
import { mouldRemoval } from "@/data/information";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import FeatureTopic from "@/components/FeatureTopic";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ActionBoxes />
      <div className="pt-10">
        {mouldRemoval.map((topic) => {
          const { title, content } = topic;
          return <FeatureTopic key={title} title={title} content={content} />;
        })}
      </div>
      <Contact />
      <FAQ />
    </main>
  );
}
