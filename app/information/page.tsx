import React from "react";
import { mouldRemoval, infoWithPoints, reduceMould } from "@/data/information";
import InfoCard from "@/components/InfoCard";
import FAQ from "@/components/FAQ";
const page = () => {
  return (
    <div>
      <div className="pt-10">
        {infoWithPoints.map((topic) => {
          return (
            <div key={topic.title}>
              <div className="content-container grid grid-cols-12 mb-10 pb-10 ">
                <div className="col-span-2 col-start-2 text-xl font-semibold font-patua capitalize text-theme_dark_green-900">
                  {topic.title}
                </div>
                <div className="col-span-7 col-start-5 col-end-11">
                  <p>{topic.intro}</p>
                  <ul className="pt-6">
                    {topic.factors.map((factor) => {
                      return (
                        <li key={factor.point} className="pb-6">
                          <strong className="text-theme_dark_green-900">
                            {factor.point}:
                          </strong>{" "}
                          {factor.reason}
                        </li>
                      );
                    })}
                  </ul>
                  <p>{topic.conclusion}</p>
                </div>
              </div>
              <div className="w-[80%] mb-20 m-auto border-b-2 border-theme_indigo-900"></div>
            </div>
          );
        })}
      </div>
      {/* ==== MOULD REMOVAL ==== */}
      <div className="pt-10" id="mould-removal-section">
        {mouldRemoval.map((topic) => {
          return (
            <div
              key={topic.title}
              className="content-container grid grid-cols-12 mb-10 "
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
      <div className="w-[80%] mb-20 m-auto border-b-2 border-theme_indigo-900"></div>
      {/* ==== REDUCE MOULD GROWTH ==== */}
      <div className="content-container">
        <h2 className="text-xl pb-16 font-patua">{reduceMould.title}</h2>
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
