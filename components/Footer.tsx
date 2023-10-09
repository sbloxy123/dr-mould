import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="pt-20 bg-theme_white-900">
      <div className="w-fit m-auto flex-shrink-0 flex items-center gap-2 pb-8">
        <Image alt="Dr Mould Logo" src="/icon.png" width={30} height={30} />
        <Link
          href="/"
          className="font-patua text-xl font-semibold text-theme_dark_green-900"
        >
          Dr Mould
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 m-auto md:w-[30%] w-fit text-center">
        <Link href="/" className="nav-link text-md font-sans font-light">
          Home
        </Link>

        <Link
          href="/information"
          className="nav-link text-md font-sans font-light "
        >
          Information
        </Link>

        <Link href="/gallery" className="nav-link text-md font-sans font-light">
          Gallery
        </Link>

        <Link href="contact" className="nav-link text-md font-sans font-light">
          Contact
        </Link>
      </div>
      <div className="flex flex-col md:flex-row pt-8 w-[75%] m-auto justify-between text-center md:text-left items-center">
        <div>
          <h2 className="text-2xl">Enquiries</h2>
          <ul className="pt-4 text-lg">
            <li>
              Tel: <a href="tel:07806615231">07806 615231</a>
            </li>
          </ul>
        </div>
        <div className="h-fit py-2 px-20 bg-theme_indigo-900 text-white tracking-wider hover:bg-theme_light_green-900 ease-in-out duration-300 cursor-pointer mt-6 w-full md:w-fit">
          <Link href="/contact">GET A QUOTE!</Link>
        </div>
      </div>
      <p className="text-sm py-12 m-auto w-fit text-center md:text-left p-4">
        © 2023 Dr Mould, All rights reserved | Design & Build by{" "}
        <a
          className="text-blue-500 font-semibold hover:text-theme_dark_green-900"
          target="_blank"
          href="https://www.bloxywebservices.co.uk/"
        >
          Bloxy Web Services
        </a>
      </p>
    </div>
  );
};

export default Footer;
