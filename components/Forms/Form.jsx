"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

// =================== GLOBAL MASTER SCHEMAS ===================
const masterFormSchema = z.object({
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
  siaLicenceNumber: z.string().optional(),
  siaLicenceType: z.string().optional(),
  siaExpiryDate: z.string().optional(),
  siaLicenceStatus: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  primaryRoleExperience: z.string().optional(),
  employmentHistory: z.array(
    z.object({
      employer: z.string().optional(),
      jobTitle: z.string().optional(),
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
      reasonForLeaving: z.string().optional(),
    })
  ).optional()
  
});

const Form = () => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 5;

  const stepsConfig = [
    { id: 1, label: "Step 1" },
    { id: 2, label: "Step 2" },
    { id: 3, label: "Step 3" },
    { id: 4, label: "Step 4" },
    { id: 5, label: "Final" },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(masterFormSchema),
    mode: "onTouched",
    defaultValues: {
      rightToWork: "yes",
      rightToLicense: "yes",
      // Pre-populate 5 rows for address history grid matching your layout
      addressHistory: Array(1).fill({
        fullAddress: "",
        postcode: "",
        timelineDate: "",
      }),
      employmentHistory: Array(1).fill({
        employer: "",
        jobTitle: "",
        fromDate: "",
        toDate: "",
        reasonForLeaving: "",
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
    "primaryRoleExperience",
    "employmentHistory",
    
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
    }
    else if (activeStep === 2) {
      const isStepTwoValid = await trigger(stepTwoFields);
      console.log("Step Two Validation Result:", isStepTwoValid);
      if (isStepTwoValid) {
        setActiveStep(3);
      }
    }
     else if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const onFinalFormSubmit = (data) => {
    console.log("Ultimate Validated Data Payloads:", data);
    alert("Application successfully securely locked & submitted!");
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  return (
    <>
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
            onSubmit={
              activeStep === totalSteps
                ? handleSubmit(onFinalFormSubmit)
                : handleNextStep
            }
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

            {/* FUTURE STEPS IN THE CONTEXT OF PIPELINE FLOW */}
            {activeStep > 2 && (
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

              <button
                type="submit"
                className="bg-[#23466f] hover:bg-[#1a3554] text-white px-8 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95"
              >
                {activeStep === totalSteps ? "Submit Application" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
