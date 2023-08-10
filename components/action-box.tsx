"use client";
import Image from "next/image";
import SecondaryBtn from "./SecondaryBtn";
import Link from "next/link";
import { motion } from "framer-motion";

const ActionBox = ({
  title,
  content,
  img,
  idx,
  btnColor,
  path,
}: {
  title: string;
  content: string[];
  img: string;
  idx: number;
  btnColor: string;
  path: string;
}) => {
  const color = () => {
    if (idx === 0) {
      return "bg-theme_indigo-900";
    }
    if (idx === 1) {
      return "bg-theme_light_green-900";
    }
    if (idx === 2) {
      return "bg-theme_gold-900";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-[100vw] h-auto">
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{
          bounce: 0,
        }}
        viewport={{ once: true }}
        className={`${
          idx % 2 !== 0 && "order-2"
        } relative h-auto hidden md:block`}
      >
        <Image
          className="object-cover relative w-full h-auto"
          alt="picture of mould"
          src={img}
          sizes="auto"
          // width={700}
          // height={700}
          fill
        />
      </motion.div>
      {/* ========== new start ============== */}
      <div className="relative md:hidden z-10 h-fit bg-theme_dark_green-900">
        <div className="relative h-auto">
          <Image
            className="opacity-20 bg-center relative object-cover h-auto"
            src={img}
            alt="background image"
            fill
            sizes="800"
            placeholder="blur"
            priority
            blurDataURL="/hero-img-blur.png"
          />
          <div
            className={`${color()} ${
              idx % 2 !== 0 && "order-1"
            } text-theme_white-900 h-[60vh] flex `}
          >
            <motion.div
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{
                bounce: 0,
              }}
              viewport={{ once: true }}
              className="h-fit m-auto p-2 md:p-8"
            >
              <h3 className="text-center capitalize text-3xl pb-10 font-patua">
                {title}
              </h3>
              {content.map((para: string) => (
                <p
                  key={para}
                  className="text-center leading-6 pb-4 sm:text-sm lg:text-base"
                >
                  {para}
                </p>
              ))}
              <div className="m-auto w-fit mt-8">
                <Link href={path}>
                  <SecondaryBtn label="Learn More...." btnColor={btnColor} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ============== new end ============== */}
      <div
        className={`${color()} ${
          idx % 2 !== 0 && "order-1"
        } text-theme_white-900 h-[60vh] md:flex hidden`}
      >
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{
            bounce: 0,
          }}
          viewport={{ once: true }}
          className="h-fit m-auto p-2 md:p-8"
        >
          <h3 className="text-center capitalize text-3xl pb-10 font-patua">
            {title}
          </h3>
          {content.map((para: string) => (
            <p
              key={para}
              className="text-center leading-6 pb-4 sm:text-sm lg:text-base"
            >
              {para}
            </p>
          ))}
          <div className="m-auto w-fit mt-8">
            <Link href={path}>
              <SecondaryBtn label="Learn More...." btnColor={btnColor} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActionBox;
