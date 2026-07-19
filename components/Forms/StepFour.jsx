"use client"
import React from 'react';

const StepFour = ({ register, errors, watch }) => {
  // Medical declaration condition array matching the document
  const medicalConditions = [
    { id: "heartCirculatory", label: "Heart, blood pressure, or circulatory condition" },
    { id: "epilepsyDizziness", label: "Epilepsy, blackouts, fainting, or dizziness" },
    { id: "diabetes", label: "Diabetes" },
    { id: "musculoskeletal", label: "Back, joint, or musculoskeletal problems" },
    { id: "sensoryImpairment", label: "Hearing or eyesight impairment (not corrected)" },
    { id: "mentalHealth", label: "Mental health condition affecting work" },
    { id: "shiftNightWork", label: "Condition affecting shift or night work" },
    { id: "currentMedication", label: "Any current medication affecting duties" },
  ];

  return (
    <div className="space-y-12">
      
      {/* =================== SECTION 14: ONLINE / SHARE CODE CHECK =================== */}
      <section className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              14
            </span>
            ONLINE / SHARE CODE CHECK *
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Online Share Code */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Online Share Code *</label>
            <input
              {...register("onlineShareCode")}
              placeholder="e.g. W12 345 67K"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 uppercase transition-all ${
                errors?.onlineShareCode ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.onlineShareCode && <p className="text-xs text-red-500 font-medium">{errors.onlineShareCode.message}</p>}
          </div>

          {/* Date Code Validity */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Date Code Validity *</label>
            <input
              type="date"
              {...register("shareCodeValidityDate")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                errors?.shareCodeValidityDate ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.shareCodeValidityDate && <p className="text-xs text-red-500 font-medium">{errors.shareCodeValidityDate.message}</p>}
          </div>

          {/* Date Check Completed */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Date Check Completed *</label>
            <input
              type="date"
              {...register("shareCodeCheckCompletedDate")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                errors?.shareCodeCheckCompletedDate ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.shareCodeCheckCompletedDate && <p className="text-xs text-red-500 font-medium">{errors.shareCodeCheckCompletedDate.message}</p>}
          </div>

          {/* Profile Photo Matches */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Profile Photo Matches? *</label>
            <select
              {...register("profilePhotoMatches")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] bg-no-repeat pr-10 ${
                errors?.profilePhotoMatches ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            >
              <option value="">Select Status</option>
              <option value="yes">Yes - Photo Matches Applicant</option>
              <option value="no">No - Discrepancy Found</option>
            </select>
            {errors?.profilePhotoMatches && <p className="text-xs text-red-500 font-medium">{errors.profilePhotoMatches.message}</p>}
          </div>
        </div>
      </section>

      {/* =================== SECTION 16: MEDICAL DECLARATION =================== */}
      <section className="space-y-4 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              16
            </span>
            MEDICAL DECLARATION *
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 font-semibold">
            Do you currently have, or have you had, any of the following?
          </p>
        </div>

        {/* Declaration Form Matrix Grid Table */}
        <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase p-3 text-slate-600 tracking-wider">
            <div className="col-span-6 sm:col-span-7">Condition Condition</div>
            <div className="col-span-3 sm:col-span-2 text-center">Yes</div>
            <div className="col-span-3 sm:col-span-3 text-center md:text-left md:pl-4"></div>
          </div>

          {/* Body Matrix Rows */}
          <div className="divide-y divide-slate-200">
            {medicalConditions.map((condition) => {
              const conditionValue = watch(`medical.${condition.id}.hasCondition`);
              const baseErrors = errors?.medical?.[condition.id];

              return (
                <div key={condition.id} className="grid grid-cols-12 p-3 bg-white items-center gap-2">
                  {/* Condition label description */}
                  <div className="col-span-6 sm:col-span-7 text-xs sm:text-sm font-medium text-slate-700 pr-2">
                    {condition.label}
                  </div>

                  {/* Yes/No Radial Selections */}
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-center gap-4">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="yes"
                        {...register(`medical.${condition.id}.hasCondition`)}
                        className="w-4 h-4 text-[#1E6BFF] border-slate-300 focus:ring-[#1E6BFF]"
                      />
                      <span className="text-xs font-bold text-slate-600 sm:hidden">Y</span>
                    </label>

                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        value="no"
                        defaultChecked
                        {...register(`medical.${condition.id}.hasCondition`)}
                        className="w-4 h-4 text-[#1E6BFF] border-slate-300 focus:ring-[#1E6BFF]"
                      />
                      <span className="text-xs font-bold text-slate-600 sm:hidden">N</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================== SECTION 17: ACCOUNT DETAIL =================== */}
      <section className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              17
            </span>
            ACCOUNT DETAIL
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Account Holder Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Account Holder Name *</label>
            <input
              {...register("accountHolderName")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.accountHolderName ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.accountHolderName && <p className="text-xs text-red-500 font-medium">{errors.accountHolderName.message}</p>}
          </div>

          {/* Bank Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Bank Name *</label>
            <input
              {...register("bankName")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.bankName ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.bankName && <p className="text-xs text-red-500 font-medium">{errors.bankName.message}</p>}
          </div>

          {/* Account No. */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Account No. *</label>
            <input
              type="text"
              maxLength={8}
              {...register("accountNumber")}
              placeholder="e.g. 12345678"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.accountNumber ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.accountNumber && <p className="text-xs text-red-500 font-medium">{errors.accountNumber.message}</p>}
          </div>

          {/* Sort Code */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Sort Code *</label>
            <input
              type="text"
              placeholder="e.g. 20-30-40"
              {...register("sortCode")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.sortCode ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.sortCode && <p className="text-xs text-red-500 font-medium">{errors.sortCode.message}</p>}
          </div>
        </div>
      </section>

    </div>
  );
};

export default StepFour;