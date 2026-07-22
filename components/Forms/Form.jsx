"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
// =================== GLOBAL MASTER SCHEMAS ===================
const masterFormSchema = z
  .object({
    // --- SECTION 1: PERSONAL DETAILS ---
    title: z.string().min(1, "Title is required"),
    preferredName: z.string().optional(),
    surname: z.string().min(2, "Surname must be at least 2 characters"),
    forenames: z.string().min(2, "Forename(s) are required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    placeOfBirth: z.string().min(2, "Place/Country of birth is required"),
    nationality: z.string().min(2, "Nationality is required"),
    gender: z.string().optional(),
    nationalInsuranceNo: z
      .string()
      .min(1, "National Insurance Number is required"),

    mobile: z.string().min(10, "Valid mobile number is required"),
    emailAddress: z.string().email("Invalid email address"),
    availability: z.string().min(5, "Please specify your availability details"),

    // --- SECTION 2: CURRENT ADDRESS & HISTORY (5 YEARS) ---
    addressHistory: z.array(
      z.object({
        fullAddress: z.string().min(1, "Full address is required"),
        postcode: z.string().min(2, "Postcode is required"),
        timelineDate: z.string().min(1, "Date is required"),
      }),
    ),

    // --- SECTION 3: RIGHT TO WORK IN THE UK ---
    rightToWork: z.enum(["yes", "no"], {
      required_error: "Please select an option",
    }),
    rtwBasis: z.string().min(2, "RTW basis is required (e.g., British/Visa)"),
    passportNumber: z.string().min(5, "Passport number is required"),
    passportNationality: z.string().min(2, "Passport nationality is required"),
    passportExpiryDate: z.string().min(1, "Passport expiry date is required"),
    shareCode: z.string().optional(),
    rightToLicense: z.string().optional(),
    licenseNumber: z.string().optional(),
    categoriesHeld: z.string().optional(),
    licenseExpiryDate: z.string().optional(),
    siaLicenceNumber: z.string().min(1, "SIA licence number is required"),
    siaLicenceType: z.string().min(1, "SIA licence type is required"),
    siaExpiryDate: z.string().min(1, "SIA expiry date is required"),
    siaLicenceStatus: z.string().min(1, "SIA licence status is required"),
    yearsOfExperience: z.string().min(1, "Years of experience is required"),

    employmentHistory: z.array(
      z.object({
        employer: z.string(),
        jobTitle: z.string(),
        fromDate: z.string(),
        toDate: z.string(),
        reasonForLeaving: z.string(),
      }),
    ),
    // --- SECTION 7: EMPLOYEE REFERENCES (Strictly requires 2 complete reference bodies) ---
    references: z
      .array(
        z.object({
          companyName: z.string().min(2, "Company name is required"),
          contactName: z.string().min(2, "Contact name is required"),
          email: z.string().email("Please enter a valid email address"),
          telephone: z.string().min(9, "Valid telephone number is required"),
        }),
      )
      .length(2, "You must provide exactly two references"),

    // --- SECTION 8: EDUCATION & QUALIFICATIONS (Set optional or min requirements as needed) ---
    education: z
      .array(
        z.object({
          institution: z.string().optional(),
          qualification: z.string().optional(),
          year: z.string().max(4, "Invalid year format").optional(),
        }),
      )
      .optional(),

    // --- SECTION 9: EMERGENCY CONTACT 1 ---
    emergencyContactName: z
      .string()
      .min(2, "Emergency contact name is required"),
    emergencyRelationship: z
      .string()
      .min(2, "Relationship details are required"),
    emergencyDaytimePhone: z
      .string()
      .min(9, "Primary daytime contact number is required"),
    emergencyAlternativePhone: z.string().optional(),

    // --- SECTION 14: SHARE CODE ---
    onlineShareCode: z
      .string()
      .min(9, "Share code must be at least 9 characters")
      .regex(/^\w+$/i, "Share code must be alphanumeric"),
    shareCodeValidityDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid validity date",
      }),
    shareCodeCheckCompletedDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid check completed date",
      }),
    profilePhotoMatches: z.enum(["yes", "no"], {
      required_error: "Please confirm profile identity matches",
    }),

    // --- SECTION 16: MEDICAL RECORD MATRIX (Forces explicit text details if "Yes" is checked)
    medical: z.record(
      z.object({
        hasCondition: z.enum(["yes", "no"]),
      }),
    ),

    // --- SECTION 17: BANK ACCOUNT DETAILS ---
    accountHolderName: z.string().min(2, "Account holder name required"),
    bankName: z.string().min(2, "Bank structure identity is required"),
    accountNumber: z
      .string()
      .regex(/^\d{8}$/, "Account number must be exactly 8 digits"),
    sortCode: z
      .string()
      .min(6, "Valid sort code format is required (e.g. 20-30-40)"),
    // --- SECTION 10: CRIMINAL CONVICTIONS DECLARATION ---
    hasConvictions: z.enum(["yes", "no"], {
      required_error: "Please declare your conviction status selection",
    }),

    // --- SECTION 17: EMPLOYEE CONSENT & SIGN-OFF ---
    consentAgreed: z.literal(true, {
      errorMap: () => ({
        message:
          "You must accept the terms of the declaration statement to proceed",
      }),
    }),
    consentEmployeeName: z
      .string()
      .min(3, "Please print your full employee name block"),
    consentSignature: z
      .string()
      .min(2, "An electronic signature sign-off is required"),
    consentDate: z
      .string()
      .min(1, "Please select the signing verification date"),
  })
  .superRefine((data, ctx) => {
    const validity = data.shareCodeValidityDate;
    const completed = data.shareCodeCheckCompletedDate;
    if (validity && completed) {
      const validityDate = new Date(validity);
      const completedDate = new Date(completed);
      if (completedDate < validityDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shareCodeCheckCompletedDate"],
          message: "Check completed date cannot be before validity date",
        });
      }
    }
  });

const Form = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const totalSteps = 6;

  const stepsConfig = [
    { id: 1, label: "Step 1" },
    { id: 2, label: "Step 2" },
    { id: 3, label: "Step 3" },
    { id: 4, label: "Step 4" },
    { id: 5, label: "Step 5" },
    { id: 6, label: "Preview" },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(masterFormSchema),
    mode: "onTouched",
    shouldUnregister: false,
    defaultValues: {
      medical: {},
      rightToWork: "yes",
      rightToLicense: "yes",
      // Pre-populate 5 rows for address history grid matching your layout
      addressHistory: Array(5).fill({
        fullAddress: "",
        postcode: "",
        timelineDate: "",
      }),
      employmentHistory: Array(5).fill({
        employer: "",
        jobTitle: "",
        fromDate: "",
        toDate: "",
        reasonForLeaving: "",
      }),
      references: Array(2).fill({
        companyName: "",
        contactName: "",
        email: "",
        telephone: "",
      }),
      education: Array(4).fill({
        institution: "",
        qualification: "",
        year: "",
      }),
    },
  });

  // react-hook-form array helper to manage fields safely
  const { fields: addressFields } = useFieldArray({
    control,
    name: "addressHistory",
  });
  const { fields: employmentFields } = useFieldArray({
    control,
    name: "employmentHistory",
  });
  const { fields: referenceFields } = useFieldArray({
    control,
    name: "references",
  });
  const { fields: educationFields } = useFieldArray({
    control,
    name: "education",
  });

  // Array of fields to validate specifically before leaving Step 1
  const stepOneFields = [
    "title",
    "preferredName",
    "surname",
    "forenames",
    "dateOfBirth",
    "placeOfBirth",
    "nationality",
    "gender",
    "nationalInsuranceNo",
    "mobile",
    "emailAddress",
    "availability",
    "addressHistory",
    "rightToWork",
    "rtwBasis",
    "passportNumber",
    "passportNationality",
    "passportExpiryDate",
    "shareCode",
  ];
  const stepTwoFields = [
    "rightToLicense",
    "licenseNumber",
    "categoriesHeld",
    "licenseExpiryDate",
    "siaLicenceNumber",
    "siaLicenceType",
    "siaExpiryDate",
    "siaLicenceStatus",
    "yearsOfExperience",

    "employmentHistory",
  ];
  const stepThreeFields = [
    "references",
    "education",
    "emergencyContactName",
    "emergencyRelationship",
    "emergencyDaytimePhone",
    "emergencyAlternativePhone",
  ];
  const stepFourFields = [
    "onlineShareCode",
    "shareCodeValidityDate",
    "shareCodeCheckCompletedDate",
    "profilePhotoMatches",
  ];
  const stepFiveFields = [
    "medical",
    "accountHolderName",
    "bankName",
    "accountNumber",
    "sortCode",
    "hasConvictions",
  ];

  const handleNextStep = async (e) => {
    e.preventDefault();

    if (activeStep === 1) {
      // Trigger validation across Sections 1, 2, and 3 simultaneously
      const isStepOneValid = await trigger(stepOneFields);
      console.log("Step One Validation Result:", isStepOneValid);
      if (isStepOneValid) {
        setActiveStep(2);
      }
    } else if (activeStep === 2) {
      const isStepTwoValid = await trigger(stepTwoFields);
      console.log("Step Two Validation Result:", isStepTwoValid);
      if (isStepTwoValid) {
        setActiveStep(3);
      }
    } else if (activeStep === 3) {
      const isStepThreeValid = await trigger(stepThreeFields);
      console.log("Step Three Validation Result:", isStepThreeValid);
      if (isStepThreeValid) {
        setActiveStep(4);
      }
    } else if (activeStep === 4) {
      const isStepFourValid = await trigger(stepFourFields);
      console.log("Step Four Validation Result:", isStepFourValid);
      if (isStepFourValid) {
        setActiveStep(5);
      }
    } else if (activeStep === 5) {
      const isStepFiveValid = await trigger(stepFiveFields);
      console.log("Step Five Validation Result:", isStepFiveValid);
      if (isStepFiveValid) {
        setActiveStep(6);
      }
    } else if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    }
  };

  // Generate PDF of form data
  const generatePdf = () => {
    const doc = new jsPDF();
    // Collect personal information (Step 1 fields)
    const personalData = (function () {
      const fields = stepOneFields;
      const obj = {};
      fields.forEach((f) => {
        obj[f] = watch(f);
      });
      return obj;
    })();
    const rows = Object.entries(personalData).map(([key, value]) => [
      key,
      String(value),
    ]);
    // Use the autoTable plugin correctly
    autoTable(doc, {
      head: [["Field", "Value"]],
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, halign: "left", overflow: "linebreak" },
      headStyles: { fillColor: [30, 107, 255] },
      startY: 20,
    });
    doc.save("employee_onboarding.pdf");
  };
  const finalSubmit = async (data) => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);
      setSubmissionSuccess(true);
    } catch (error) {
      //create popup modal to display error message
     

      console.log(error);
    }
  };
  const onFinalFormSubmit = (data) => {
    console.log("Ultimate Validated Data Payloads:", data ?? {});
    finalSubmit(data);
    // setSubmissionSuccess(true);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      {submissionSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              ✅ Application Submitted
            </h2>
            <p className="text-slate-700">
              Your application has been submitted successfully.
            </p>
          </div>
        </div>
      )}
      <div className="w-full px-4 py-6 sm:px-10 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* =================== TEXT STATUS INDICATORS =================== */}
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6BFF]">
                Current Progress
              </span>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {stepsConfig.find((s) => s.id === activeStep)?.label}
                <span className="text-xs font-medium text-slate-400 normal-case">
                  (Step {activeStep} of {totalSteps})
                </span>
              </h3>
            </div>

            {/* Percentage Counter */}
            <div className="text-right">
              <span className="text-2xl font-black text-slate-800 tracking-tight">
                {Math.round(((activeStep - 1) / (totalSteps - 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* =================== THE PROGRESS BAR TRACK =================== */}
          <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden p-[2px] border border-slate-200/60">
            {/* Active Gradient Fill */}
            <div
              className="h-full bg-gradient-to-r from-[#1E6BFF] to-[#3b82f6] rounded-full transition-all duration-500 ease-out shadow-[0_1px_6px_rgba(30,107,255,0.2)] relative overflow-hidden"
              style={{
                width: `${((activeStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            >
              {/* Animated Glossy Shimmer Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] -translate-x-full animate-[shimmer_2.5s_infinite]" />
            </div>
          </div>

          {/* =================== MINI CAPSULE STEP TRACKERS =================== */}
        </div>
      </div>
      <div className="min-h-screen  py-5 md:py-7 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          {/* =================== STEPPER HEADER =================== */}

          {/* =================== FORM ENGINE CONTAINER =================== */}
          <form
            onSubmit={handleSubmit(onFinalFormSubmit, onError)}
            className="p-6 sm:p-10 mt-4 space-y-12"
          >
            {/* STEP 1 CONTROLS SECTIONS 1, 2, AND 3 */}
            {activeStep === 1 && (
              <>
                {/* =================== SECTION 1: PERSONAL DETAILS =================== */}
                <StepOne
                  register={register}
                  errors={errors}
                  addressFields={addressFields}
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                {/* =================== SECTION 1: PERSONAL DETAILS =================== */}
                <StepTwo
                  register={register}
                  errors={errors}
                  employmentFields={employmentFields}
                />
              </>
            )}
            {activeStep === 3 && (
              <>
                {/* =================== SECTION 1: PERSONAL DETAILS =================== */}
                <StepThree
                  register={register}
                  errors={errors}
                  referenceFields={referenceFields}
                  educationFields={educationFields}
                />
              </>
            )}
            {activeStep === 4 && (
              <>
                {/* =================== SECTION 1: PERSONAL DETAILS =================== */}
                <StepFour register={register} watch={watch} />
              </>
            )}
            {activeStep === 5 && (
              <>
                {/* =================== SECTION 10: CRIMINAL CONVICTIONS DECLARATION =================== */}
                <StepFive register={register} errors={errors} watch={watch} />
              </>
            )}
            {activeStep === 6 && (
              <>
                {/* =================== PREVIEW PERSONAL INFORMATION =================== */}
                <div className="space-y-6 bg-slate-50/50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  {/* =================== HEADER SECTION =================== */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
                        <span className="flex items-center justify-center bg-[#23466f] text-white w-2 h-6 rounded-full" />
                        Preview Personal Information
                      </h2>
                      <p className="text-xs font-medium text-slate-500">
                        Review your details below before generating your final
                        application file.
                      </p>
                    </div>

                    {/* Fully Responsive Download Button */}
                    <button
                      type="button"
                      onClick={generatePdf}
                      className="inline-flex items-center justify-center gap-2 bg-[#23466f] hover:bg-[#1a3554] text-white w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all active:scale-95 group"
                    >
                      <svg
                        className="w-4 h-4 text-slate-200 group-hover:text-white transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download PDF
                    </button>
                  </div>

                  {/* =================== PROFILE DETAILS CONTAINER =================== */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Grid divides into two equal master columns only on medium screens and up */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-slate-100 md:divide-y-0 md:divide-x">
                      {(() => {
                        const data = (() => {
                          const fields = stepOneFields;
                          const obj = {};
                          fields.forEach((f) => {
                            obj[f] = watch(f);
                          });
                          return obj;
                        })();

                        const formatLabel = (str) => {
                          return str
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (match) => match.toUpperCase())
                            .replace("No", "No.");
                        };

                        return Object.entries(data).map(([key, value]) => {
                          const displayValue =
                            value && String(value).trim() !== ""
                              ? String(value)
                              : "—";
                          const isEmpty = displayValue === "—";

                          return (
                            /* 
              CRITICAL CHANGE HERE: 
              - 'flex flex-col' forces the label and value to stack on top of each other on mobile.
              - 'sm:grid sm:grid-cols-12' snaps them side-by-side on tablet/desktop widths.
            */
                            <div
                              key={key}
                              className="flex flex-col gap-1 sm:grid sm:grid-cols-12 px-4 py-3.5 sm:px-5 sm:py-4 hover:bg-slate-50/50 transition-colors items-start sm:items-center"
                            >
                              {/* Field Label (Column 1 on desktop, stacked on mobile) */}
                              <div className="sm:col-span-4 text-[11px] sm:text-xs font-bold text-slate-400 sm:text-slate-500 uppercase tracking-wider">
                                {formatLabel(key)}
                              </div>

                              {/* Field Value (Column 2 on desktop, stacked below on mobile) */}
                              <div
                                className={`sm:col-span-8 text-sm font-semibold tracking-wide break-words w-full ${
                                  isEmpty
                                    ? "text-slate-300 italic font-normal"
                                    : "text-slate-800"
                                }`}
                              >
                                {displayValue}
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* FUTURE STEPS IN THE CONTEXT OF PIPELINE FLOW */}
            {activeStep > 6 && (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-700 mb-2">
                  {stepsConfig.find((s) => s.id === activeStep)?.label} Step
                  Layout
                </h3>
                <p className="text-sm text-slate-500">
                  Provide inputs for Step {activeStep} later when ready.
                  Validation will activate automatically.
                </p>
              </div>
            )}

            {/* =================== ACTION CONTROL FOOTER =================== */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={activeStep === 1}
                className={`px-6 py-2.5 rounded-xl font-semibold border text-sm transition-all
                ${
                  activeStep === 1
                    ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                    : "border-slate-300 text-slate-600 hover:bg-slate-50 active:scale-95"
                }`}
              >
                Back
              </button>
              {activeStep === totalSteps ? (
                <button
                  type="submit"
                  className="bg-[#23466f] hover:bg-[#1a3554] text-white px-8 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-[#23466f] hover:bg-[#1a3554] text-white px-8 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95"
                >
                  Continue
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
