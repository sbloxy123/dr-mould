"use client";
import { motion } from "framer-motion";

interface Fact {
  point: string;
  reason: string;
}

const InfoWithPoints = ({
  title,
  intro,
  factors,
  conclusion,
}: {
  title: string;
  intro: string;
  factors: Fact[];
  conclusion: string;
}) => {
  return (
    <article key={title}>
      <div className="content-container grid grid-cols-12 mb-10 pb-10 ">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            bounce: 0,
          }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-2 md:col-start-2 text-xl font-semibold font-patua text-theme_dark_green-900 pb-10 capitalize"
        >
          {title}
        </motion.div>
        <div className="md:col-span-7 md:col-start-5 col-span-12  md:col-end-11">
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              bounce: 0,
            }}
            viewport={{ once: true }}
          >
            {intro}
          </motion.p>
          <ul className="pt-6">
            {factors.map((factor: Fact) => {
              return (
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    bounce: 0,
                  }}
                  viewport={{ once: true }}
                  key={factor.point}
                  className="pb-6 pl-8"
                >
                  <strong className="text-theme_dark_green-900">
                    {factor.point}:
                  </strong>{" "}
                  {factor.reason}
                </motion.li>
              );
            })}
          </ul>
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              bounce: 0,
            }}
            viewport={{ once: true }}
          >
            {conclusion}
          </motion.p>
        </div>
      </div>
      <div className="w-[80%] mb-20 m-auto border-b-2 border-theme_indigo-900"></div>
    </article>
  );
};

export default InfoWithPoints;
