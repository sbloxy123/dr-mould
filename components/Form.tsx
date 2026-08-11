"use client";
import React, { useState, useRef } from "react";
import { validationSchema } from "@/utils/validations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ToastContainer, toast } from "react-toastify";

type FormValues = {
  name: string;
  email: string;
  message: string;
  phone: string;
  address: string;
  images: string[];
};

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (uploadedImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed.");
      return;
    }

    setIsUploading(true);
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
          );
          formData.append("folder", "contact_form_uploads");

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
          );
          if (!res.ok) throw new Error("Upload failed");
          const data = await res.json();
          return data.secure_url as string;
        })
      );
      setUploadedImages((prev) => [...prev, ...urls]);
    } catch {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
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
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...values, images: uploadedImages }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

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
        {({ isSubmitting }) => (
          <Form>
            <div className="">
              <div className={`flex flex-wrap -m-2 ${isLoading ? "opacity-60 pointer-events-none" : ""}`}>
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
                      type="text"
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

                {/* Image Upload */}
                <div className="p-2 w-full">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    disabled={isUploading || uploadedImages.length >= 5}
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload Images"}
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
                </div>

                {/* Submit Button */}
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-theme_indigo-900 w-full bg-theme_gold-900 border-0 py-2 px-8 focus:outline-none ease-in-out duration-300 hover:bg-theme_light_green-900 rounded-sm text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading && (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {isLoading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

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
