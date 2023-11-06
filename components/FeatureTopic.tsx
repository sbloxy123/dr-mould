"use client";
import { motion } from "framer-motion";

const FeatureTopic = ({
  title,
  content,
}: {
  title: string;
  content: string[];
}) => {
  return (
    <article key={title} className="content-container grid grid-cols-12 mb-10">
      <motion.div
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        transition={{
          bounce: 0,
        }}
        viewport={{ once: true }}
        className="col-span-12 md:col-span-2 md:col-start-2 text-xl font-semibold font-patua text-theme_dark_green-900 pb-10"
      >
        {title}
      </motion.div>
      <div className="md:col-span-7 md:col-start-5 col-span-12  md:col-end-11">
        {content.map((p) => {
          return (
            <motion.p
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{
                bounce: 0,
              }}
              viewport={{ once: true }}
              key={p}
              className="pb-8"
            >
              {p}
            </motion.p>
          );
        })}
      </div>
    </article>
  );
};

export default FeatureTopic;
