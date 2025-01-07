// Form.tsx
"use client";
import React, { useState, useRef } from "react";
import { validationSchema } from "@/utils/validations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ToastContainer, toast } from "react-toastify";
import Script from "next/script"; // Import Next.js's Script component

type FormValues = {
  name: string;
  email: string;
  message: string;
  phone: string;
  address: string;
  images: string[]; // Array of Cloudinary image URLs
};

declare global {
  interface Window {
    cloudinary: any; // Declare cloudinary in the global window object
  }
}

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const widgetRef = useRef<any>(null); // Reference to the Cloudinary widget
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // Local state for uploaded images

  // Callback function for the Cloudinary widget
  const handleWidgetCallback = (error: any, result: any) => {
    if (!error && result && result.event === "success") {
      console.log("Uploaded image info:", result.info);
      setUploadedImages((prevImages) => [...prevImages, result.info.secure_url]);
    } else if (error) {
      console.error("Cloudinary Widget Error:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  // Function to open the Cloudinary widget
  const openCloudinaryWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <>
      {/* Include Cloudinary's Upload Widget script using Next.js's Script component */}
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="lazyOnload" // Load the script lazily during idle time
        onLoad={() => {
          console.log("Cloudinary Widget script loaded.");
          if (window.cloudinary && !widgetRef.current) {
            // Initialize the widget only once
            widgetRef.current = window.cloudinary.createUploadWidget(
              {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
                uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, // Your unsigned upload preset
                multiple: true, // Allow multiple file uploads
                sources: ["local", "url", "camera"], // Sources for uploading
                folder: "contact_form_uploads", // Optional: specify a folder in Cloudinary
                maxFiles: 5, // Maximum number of files
                maxFileSize: 5 * 1024 * 1024, // 5MB per file
                clientAllowedFormats: ["jpg", "jpeg", "png", "gif"], // Allowed file formats
              },
              handleWidgetCallback
            );
          }
        }}
        onError={(e) => {
          console.error("Cloudinary Widget script failed to load:", e);
          toast.error(
            "Failed to load upload widget. Please refresh the page or try again later."
          );
        }}
      />

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
          images: [],
        }}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={async (
          values: FormValues,
          {
            setSubmitting,
            resetForm,
          }: {
            setSubmitting: (isSubmitting: boolean) => void;
            resetForm: () => void;
          }
        ) => {
          try {
            setIsLoading(true);
            // Send form data along with image URLs to your backend
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...values, images: uploadedImages }),
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            // Reset the form and uploaded images
            resetForm();
            setUploadedImages([]);
            toast.success("Form submitted successfully!");
          } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(
              "Oops.. something went wrong! If the issue persists, please email us directly 🙂"
            );
          } finally {
            setSubmitting(false);
            setIsLoading(false);
          }
        }}
      >
        {() => (
          <Form>
            <div className="">
              {isLoading && (
                <div className="absolute h-full w-full top-0 bottom-0 left-0 right-0 bg-gray-300 opacity-30 flex justify-center items-center">
                  <div className="h-20 w-20 bg-white rounded-lg flex justify-center items-center">
                    <div className="animate-spin bg-white text-4xl">⏳</div>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap -m-2">
                {/* Name Field */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-700">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-80 rounded-sm border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-80 rounded-sm border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-700">
                      Phone Number
                    </label>
                    <Field
                      type="phone"
                      id="phone"
                      name="phone"
                      className="w-full bg-gray-100 bg-opacity-80 rounded-sm border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Address Field */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-700">
                      Location
                    </label>
                    <Field
                      type="text" // Changed from "address" to "text" as "address" is not a valid input type
                      id="address"
                      name="address"
                      className="w-full bg-gray-100 bg-opacity-80 rounded-sm border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="p-2 w-full">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-700">
                      Message
                    </label>
                    <Field
                      id="message"
                      name="message"
                      as="textarea"
                      className="w-full bg-gray-100 bg-opacity-80 rounded-sm border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Images Upload Field */}
                <div className="p-2 w-full">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-700">
                      {/* Upload Images */}
                    </label>
                    <button
                      type="button"
                      onClick={openCloudinaryWidget}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Upload Images
                    </button>
                    <div className="mt-2 flex flex-wrap">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="w-20 h-20 object-cover mr-2 mb-2 rounded"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setUploadedImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Optionally, display an error message if needed */}
                    <ErrorMessage
                      name="images"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-2 w-full">
                <button
                    type="submit"
                  disabled={isLoading}
                  className="text-theme_indigo-900 w-full bg-theme_gold-900 border-0 py-2 px-8 focus:outline-none ease-in-out duration-300 hover:bg-theme_light_green-900 rounded-sm text-lg"
                >
                  Submit
                </button>
              </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        className="h-4"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default ContactForm;
