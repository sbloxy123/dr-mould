import React from "react";
import ContactForm from "./Form";

const Contact = () => {
  return (
    <section className="w-screen flex items-center md:h-screen h-fit last:pt-10  bg-theme_indigo-900 text-theme_white-900">
      <div className="w-fit m-auto flex flex-col content-center">
        <div className="flex flex-col md:flex-row lg:w-[80vw] w-[95vw] m-auto">
          <div className="w-full md:w-1/2 md:px-10 text-center md:text-left ">
            <h2 className="text-4xl capitalize tracking-wide pt-10 md:pt-0">
              Contact us today for a{" "}
              <strong className="text-theme_gold-900">no obligation</strong>{" "}
              free quote
            </h2>
            <p className="pt-10 text-lg">
              Please fill in the form or get in touch with the details below:
            </p>
            <ul className="pt-10 pb-10 text-xl">
              <li className="pb-2">
                Tel:{" "}
                <a
                  className="text-theme_dark_green-900 hover:text-theme_gold-900 ease-in-out duration-300"
                  href="tel:07806615231"
                >
                  07806 615231
                </a>
              </li>
              {/* <li className="">
                Email:{" "}
                <a
                  className="text-theme_dark_green-900"
                  href="email:sbloxy123@gmail.com"
                >
                  sbloxy123@gmail.com
                </a>
              </li> */}
            </ul>
          </div>
          <div className="md:px-10 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold tracking-wide pb-6">
              Enquiry Form
            </h2>
            <ContactForm />
          </div>
        </div>
        <p className="mt-10 md:mt-20 mb-10 md:mb-0 md:w-2/3 w-[75vw] text-center text-sm mx-auto opacity-70">
          All personal data herein are processed in accordance with UK data
          protection legislation. All feasible security measures are in place.
          Further information is in our Privacy Notice.
        </p>
      </div>
    </section>
  );
};

export default Contact;
