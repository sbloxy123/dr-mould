"use client";
import React, { useId, useState, useRef } from "react";
import { validationSchema } from "@/utils/validations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ToastContainer, toast } from "react-toastify";
import { Camera, Upload, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

type FormValues = {
  name: string;
  email: string;
  message: string;
  phone: string;
  address: string;
  images: string[];
};

type Variant = "compact" | "full";

type QuoteFormProps = {
  // "compact" is the home page panel (48px inputs, one-line photo zone).
  // "full" is the contact page (52px inputs, hint text, tall drop zone).
  variant?: Variant;
};

const MAX_IMAGES = 5;

// Shared input styling. 16px text stops iOS zooming in on focus.
const inputBase =
  "w-full rounded-xl border bg-white px-3.5 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-500/70 focus:border-leaf-600 focus-visible:outline-leaf-600 lg:px-4";

function inputClasses(variant: Variant, hasError: boolean) {
  return cn(
    inputBase,
    variant === "compact" ? "h-12" : "h-[50px] lg:h-[52px]",
    hasError ? "border-danger" : "border-sand-400"
  );
}

const ContactForm = ({ variant = "full" }: QuoteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idPrefix = useId();
  const compact = variant === "compact";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (uploadedImages.length + files.length > MAX_IMAGES) {
      toast.error(`You can add up to ${MAX_IMAGES} photos.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      toast.error("Sorry, we couldn't upload that photo. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const fieldId = (name: keyof FormValues) => `${idPrefix}-${name}`;
  const labelClass = cn(
    "flex flex-col font-semibold text-ink-900",
    compact ? "gap-1.5 text-sm" : "gap-1.5 text-[15px] lg:gap-2"
  );
  const errorClass = "text-sm text-danger";
  const photoLimitReached = uploadedImages.length >= MAX_IMAGES;

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
            toast.success(
              "Thanks! Your enquiry has been sent. We'll be in touch soon."
            );
          } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(
              `Sorry, something went wrong. Please try again, or call us on ${site.phoneDisplay}.`
            );
          } finally {
            setSubmitting(false);
            setIsLoading(false);
          }
        }}
      >
        {({ errors, touched }) => {
          const hasError = (name: keyof FormValues) =>
            Boolean(errors[name] && touched[name]);

          return (
            <Form data-slot="quote-form" noValidate>
              <div
                data-slot="quote-form-fields"
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2",
                  compact ? "gap-3.5 lg:gap-[18px]" : "gap-4 lg:gap-x-5 lg:gap-y-[22px]",
                  isLoading && "pointer-events-none opacity-60"
                )}
              >
                <label data-slot="quote-form-field" htmlFor={fieldId("name")} className={labelClass}>
                  Your name
                  <Field
                    type="text"
                    id={fieldId("name")}
                    name="name"
                    autoComplete="name"
                    aria-invalid={hasError("name") || undefined}
                    className={inputClasses(variant, hasError("name"))}
                  />
                  <ErrorMessage name="name" component="span" className={errorClass} />
                </label>

                <label data-slot="quote-form-field" htmlFor={fieldId("phone")} className={labelClass}>
                  Phone number
                  <Field
                    type="tel"
                    id={fieldId("phone")}
                    name="phone"
                    autoComplete="tel"
                    aria-invalid={hasError("phone") || undefined}
                    className={inputClasses(variant, hasError("phone"))}
                  />
                  <ErrorMessage name="phone" component="span" className={errorClass} />
                </label>

                <label data-slot="quote-form-field" htmlFor={fieldId("email")} className={labelClass}>
                  Email
                  <Field
                    type="email"
                    id={fieldId("email")}
                    name="email"
                    autoComplete="email"
                    aria-invalid={hasError("email") || undefined}
                    className={inputClasses(variant, hasError("email"))}
                  />
                  <ErrorMessage name="email" component="span" className={errorClass} />
                </label>

                <label data-slot="quote-form-field" htmlFor={fieldId("address")} className={labelClass}>
                  Town or postcode
                  <Field
                    type="text"
                    id={fieldId("address")}
                    name="address"
                    autoComplete="postal-code"
                    aria-invalid={hasError("address") || undefined}
                    className={inputClasses(variant, hasError("address"))}
                  />
                  <ErrorMessage name="address" component="span" className={errorClass} />
                </label>

                <label
                  data-slot="quote-form-field"
                  htmlFor={fieldId("message")}
                  className={cn(labelClass, "md:col-span-2")}
                >
                  Where&rsquo;s the mould, and how long has it been there?
                  <Field
                    id={fieldId("message")}
                    name="message"
                    as="textarea"
                    rows={compact ? 4 : 5}
                    aria-invalid={hasError("message") || undefined}
                    className={cn(
                      inputBase,
                      "resize-none py-3 leading-[1.5] lg:py-3.5",
                      hasError("message") ? "border-danger" : "border-sand-400"
                    )}
                  />
                  {!compact && (
                    <span className="text-sm font-normal text-ink-500">
                      For example: black spots on the bathroom ceiling, getting
                      worse over the last few months.
                    </span>
                  )}
                  <ErrorMessage name="message" component="span" className={errorClass} />
                </label>

                {/* Photos */}
                <div data-slot="quote-form-photos" className="flex flex-col gap-2 md:col-span-2 lg:gap-2.5">
                  {!compact && (
                    <span className="text-[15px] font-semibold text-ink-900">
                      Photos{" "}
                      <span className="font-normal text-ink-500">
                        (optional, up to {MAX_IMAGES})
                      </span>
                    </span>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    multiple
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    disabled={isUploading || photoLimitReached}
                    aria-busy={isUploading || undefined}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "flex w-full flex-col items-center justify-center gap-1 border-[1.5px] border-dashed border-[#9FB5A7] bg-sage-50 font-semibold text-forest-700 transition-colors hover:border-leaf-600 hover:bg-sage-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-[#9FB5A7] disabled:hover:bg-sage-50",
                      compact
                        ? "h-[60px] rounded-xl lg:h-16"
                        : "h-[88px] rounded-[14px] lg:h-[104px] lg:gap-1.5"
                    )}
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2.5 text-base">
                        <Spinner />
                        Uploading…
                      </span>
                    ) : compact ? (
                      <span className="flex items-center gap-2.5 text-base">
                        <Upload size={20} strokeWidth={2} aria-hidden />
                        {photoLimitReached
                          ? `${MAX_IMAGES} photos added`
                          : "Add photos (optional)"}
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-2 text-base lg:gap-2.5">
                          <Camera
                            size={20}
                            strokeWidth={2}
                            aria-hidden
                            className="lg:hidden"
                          />
                          <Upload
                            size={22}
                            strokeWidth={2}
                            aria-hidden
                            className="hidden lg:block"
                          />
                          {photoLimitReached ? (
                            `${MAX_IMAGES} photos added`
                          ) : (
                            <>
                              <span className="lg:hidden">Take or add photos</span>
                              <span className="hidden lg:inline">Add photos</span>
                            </>
                          )}
                        </span>
                        <span className="text-[13px] font-normal text-ink-500 lg:text-sm">
                          <span className="lg:hidden">
                            Helps us give an accurate quote
                          </span>
                          <span className="hidden lg:inline">
                            JPG or PNG. Photos help us give you an accurate quote.
                          </span>
                        </span>
                      </>
                    )}
                  </button>

                  {uploadedImages.length > 0 && (
                    <ul className="flex flex-wrap gap-2.5 pt-1" aria-label="Uploaded photos">
                      {uploadedImages.map((url, index) => (
                        <li key={url} className="relative h-[72px] w-[72px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Uploaded photo ${index + 1}`}
                            className="h-[72px] w-[72px] rounded-[10px] object-cover"
                          />
                          <button
                            type="button"
                            aria-label={`Remove photo ${index + 1}`}
                            onClick={() =>
                              setUploadedImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="absolute -right-2 -top-2 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-paper bg-ink-900 text-paper transition-colors hover:bg-danger"
                          >
                            <X size={12} strokeWidth={3} aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Submit */}
                <button
                  data-slot="quote-form-submit"
                  type="submit"
                  disabled={isLoading || isUploading}
                  className={cn(
                    "flex w-full items-center justify-center gap-2.5 rounded-full bg-forest-700 font-semibold text-paper transition-colors hover:bg-forest-900 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2",
                    compact
                      ? "h-[54px] text-[17px] lg:h-14"
                      : "h-14 text-[17px] lg:mt-1.5 lg:h-[60px] lg:text-lg"
                  )}
                >
                  {isLoading && <Spinner />}
                  {isLoading ? "Sending…" : "Send my enquiry"}
                </button>

                <p
                  data-slot="quote-form-note"
                  className={cn(
                    "text-center text-[13px] leading-[1.5] text-ink-500 md:col-span-2",
                    !compact && "lg:text-sm lg:leading-[1.55]"
                  )}
                >
                  We&rsquo;ll only use your details to reply to your enquiry.
                  {/* The full variant adds this on desktop; the mobile design
                      keeps the line short. */}
                  {!compact && (
                    <span className="hidden lg:inline">
                      {" "}
                      Your data is handled in line with UK data protection law.
                    </span>
                  )}
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default ContactForm;
