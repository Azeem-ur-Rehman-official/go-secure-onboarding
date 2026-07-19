import React from 'react';

const StepFive = ({ register, errors, watch }) => {
  // Watch the criminal conviction selection to show/hide details conditionally
  const hasConvictions = watch("hasConvictions");

  return (
    <div className="space-y-12">
      
      {/* =================== SECTION 10: CRIMINAL CONVICTIONS DECLARATION =================== */}
      <section className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              10
            </span>
            CRIMINAL CONVICTIONS DECLARATION *
          </h2>
          <div className="mt-2 text-xs text-slate-500 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p>
              This post is a security role. You must declare all <span className="font-bold text-slate-800">unspent</span> convictions, cautions, reprimands and final warnings.
            </p>
            <p>
              Because certain security roles are exempt under the Rehabilitation of Offenders Act 1974 (Exceptions) Order 1975, you may additionally be asked to disclose spent matters where a Standard or Enhanced DBS check applies. Do not disclose protected cautions or convictions that are "filtered".
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Radio Dropdown/Selection for Convictions */}
          <div className="flex flex-col gap-1.5 md:w-1/2">
            <label className="text-sm font-semibold text-slate-600">
              Do you have any unspent convictions, cautions, or pending prosecutions? *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  {...register("hasConvictions")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  {...register("hasConvictions")}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors?.hasConvictions && <p className="text-xs text-red-500 font-medium">{errors.hasConvictions.message}</p>}
          </div>

         
        </div>
      </section>

      {/* =================== SECTION 17: EMPLOYEE CONSENT =================== */}
      <section className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              17
            </span>
            EMPLOYEE CONSENT *
          </h2>
        </div>

        {/* Declaration Statement Content */}
        <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-xl space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            I declare that all information provided in this application is true and correct to the best of my knowledge. I confirm that I have received, read, and understood the terms and conditions and other relevant documents provided by the Employer, and I agree to comply with them. I consent to the processing of my personal data in accordance with the Employer's Privacy Notice and applicable law.
          </p>

          {/* Interactive Checkbox for Consent Acknowledgement */}
          <label className="flex items-start gap-3 cursor-pointer group pt-2">
            <input
              type="checkbox"
              {...register("consentAgreed")}
              className="mt-1 w-4 h-4 rounded text-[#1E6BFF] border-slate-300 focus:ring-[#1E6BFF]"
            />
            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
              I unconditionally read, understand, and agree to the declaration statement written above. *
            </span>
          </label>
          {errors?.consentAgreed && <p className="text-xs text-red-500 font-medium pl-7">{errors.consentAgreed.message}</p>}
        </div>

        {/* Signature Box Meta Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Employee Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Employee Name *</label>
            <input
              {...register("consentEmployeeName")}
              placeholder="Your full legal name"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.consentEmployeeName ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.consentEmployeeName && <p className="text-xs text-red-500 font-medium">{errors.consentEmployeeName.message}</p>}
          </div>

          {/* Electronic Signature */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Digital Signature / Acknowledgement *</label>
            <input
              {...register("consentSignature")}
              placeholder="Type name to sign electronically"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 font-serif italic transition-all ${
                errors?.consentSignature ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.consentSignature && <p className="text-xs text-red-500 font-medium">{errors.consentSignature.message}</p>}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Date *</label>
            <input
              type="date"
              {...register("consentDate")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                errors?.consentDate ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.consentDate && <p className="text-xs text-red-500 font-medium">{errors.consentDate.message}</p>}
          </div>
        </div>
      </section>

    </div>
  );
};

export default StepFive;