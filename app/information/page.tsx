import React from "react";
import { mouldRemoval, infoWithPoints, reduceMould } from "@/data/information";
import InfoCard from "@/components/InfoCard";
import FAQ from "@/components/FAQ";
import InfoWithPoints from "@/components/InfoWithPoints";
import FeatureTopic from "@/components/FeatureTopic";
const page = () => {
  return (
    <div>
      <div className="pt-10">
        {infoWithPoints.map((topic) => {
          const { title, intro, factors, conclusion } = topic;
          return (
            <InfoWithPoints
              key={title}
              title={title}
              intro={intro}
              factors={factors}
              conclusion={conclusion}
            />
          );
        })}
      </div>
      {/* ==== MOULD REMOVAL ==== */}
      <div className="md:pt-10" id="mould-removal-section">
        {mouldRemoval.map((topic) => {
          const { title, content } = topic;
          return <FeatureTopic key={title} title={title} content={content} />;
        })}
      </div>
      <div className="w-[80%] mb-20 m-auto border-b-2 border-theme_indigo-900"></div>
      {/* ==== REDUCE MOULD GROWTH ==== */}
      <div className="content-container">
        <h2 className="text-xl pb-16 font-patua capitalize">
          {reduceMould.title}
        </h2>
        <div className="flex flex-wrap w-fit  justify-center gap-3">
          {reduceMould.factors.map((option) => {
            return (
              <InfoCard
                key={option.point}
                title={option.point}
                text={option.instruction}
                image={option.image}
              />
            );
          })}
        </div>
      </div>

      <div className="w-[80%] mt-20 m-auto border-b-2 border-theme_indigo-900"></div>
      {/* ===== FAQ ===== */}
      <FAQ />
    </div>
  );
};

export default page;
