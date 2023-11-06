"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "../utils/material-tailwind-exports";
import { faq } from "@/data/information";

const FAQ = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <section className="content-container w-full md:w-[70vw] pb-20">
        <h2 className="text-2xl font-patua py-16">FAQ</h2>
        {faq.map((topic) => {
          return (
            <motion.div
              key={topic.id}
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{
                bounce: 0,
              }}
              viewport={{ once: true }}
            >
              <Accordion
                open={open === topic.id}
                className="mb-2 rounded-lg border border-blue-gray-100 px-4"
              >
                <AccordionHeader
                  onClick={() => handleOpen(topic.id)}
                  className={`border-b-0 transition-colors ${
                    open === topic.id
                      ? "text-blue-500 hover:!text-blue-700"
                      : ""
                  }`}
                >
                  {topic.question}
                </AccordionHeader>
                <AccordionBody className="pt-0 text-base font-normal">
                  {topic.answer.map((para) => (
                    <p key={para} className="py-2">
                      {para}
                    </p>
                  ))}
                </AccordionBody>
              </Accordion>
            </motion.div>
          );
        })}
      </section>
    </>
  );
};

export default FAQ;
