import React from 'react'

const StepTwo = ({ register, errors,employmentFields }) => {
  return (
    <div className="space-y-12">
      {/* =================== SECTION 4: DRIVING LICENSE (OPTIONAL) =================== */}
      <section className="space-y-6 pt-5 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              4
            </span>
            DRIVING LICENSE (OPTIONAL)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">
              Do you hold a full driving licence?
            </label>
            <select
              {...register("rightToLicense")}
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] bg-no-repeat pr-10"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">
              Licence Number
            </label>
            <input
              {...register("licenseNumber")}
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all "
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">
              Categories Held
            </label>
            <input
              {...register("categoriesHeld")}
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all "
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("licenseExpiryDate")}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700 "
            />
          </div>
        </div>
      </section>

      {/* =================== SECTION 5: SIA LICENCE & SECURITY EXPERIENCE =================== */}
      <section className="space-y-6 pt-5 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              5
            </span>
            SIA LICENCE & SECURITY EXPERIENCE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">SIA Licence Number *</label>
            <input
              {...register("siaLicenceNumber")}
              placeholder="e.g. 1234 5678 1234 5678"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.siaLicenceNumber ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-[#23466f]/20"
              }`}
            />
            {errors?.siaLicenceNumber && <p className="text-xs text-red-500 font-medium">{errors.siaLicenceNumber.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Licence Type / Sector *</label>
            <input
              {...register("siaLicenceType")}
              placeholder="e.g. Door Supervision"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.siaLicenceType ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-[#23466f]/20"
              }`}
            />
            {errors?.siaLicenceType && <p className="text-xs text-red-500 font-medium">{errors.siaLicenceType.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Licence Expiry Date *</label>
            <input
              type="date"
              {...register("siaExpiryDate")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                errors?.siaExpiryDate ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-[#23466f]/20"
              }`}
            />
            {errors?.siaExpiryDate && <p className="text-xs text-red-500 font-medium">{errors.siaExpiryDate.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Licence Status *</label>
            <select
              {...register("siaLicenceStatus")}
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700"
            >
              <option value="Active / Valid">Active / Valid</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Years of Security Experience *</label>
            <input
              type="number"
              {...register("yearsOfExperience")}
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">Primary Role Experience *</label>
            <input
              {...register("primaryRoleExperience")}
              placeholder="e.g. Door Supervision / Guarding"
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* =================== SECTION 6: EMPLOYMENT HISTORY (5 YEARS) =================== */}
      <section className="space-y-4 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              6
            </span>
            EMPLOYMENT HISTORY (5 YEARS) *
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
            Provide a continuous record for the last five years including any periods of self-employment, unemployment, education, travel or military service. <span className="italic font-bold text-slate-700">Explain every gap.</span>
          </p>
        </div>

        {/* Responsive Table Layout Grid */}
        <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
          {/* Desktop Table Headers */}
          <div className="hidden lg:grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase p-3 gap-3 text-slate-600">
            <div className="col-span-4">Employer / Activity</div>
            <div className="col-span-3">Job Title</div>
            <div className="col-span-1.5">From</div>
            <div className="col-span-1.5">To</div>
            <div className="col-span-2">Reason for Leaving</div>
          </div>

          {/* Table Rows Array rendering */}
          <div className="divide-y divide-slate-200">
            {employmentFields.map((index) => {
              const rowErrors = errors?.employmentHistory?.[index];
              return (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-12 p-4 lg:p-3 gap-3 bg-white items-start">
                  
                  {/* Employer / Activity */}
                  <div className="col-span-1 lg:col-span-4 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase lg:hidden">Employer / Activity</label>
                    <input
                      {...register(`employmentHistory.${index}.employer`)}
                      placeholder="Company Name / Unemployment / Education"
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        rowErrors?.employer ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {rowErrors?.employer && <p className="text-[11px] text-red-500 font-medium">{rowErrors.employer.message}</p>}
                  </div>

                  {/* Job Title */}
                  <div className="col-span-1 lg:col-span-3 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase lg:hidden">Job Title</label>
                    <input
                      {...register(`employmentHistory.${index}.jobTitle`)}
                      placeholder="e.g. Security Officer (or N/A)"
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        rowErrors?.jobTitle ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {rowErrors?.jobTitle && <p className="text-[11px] text-red-500 font-medium">{rowErrors.jobTitle.message}</p>}
                  </div>

                  {/* From Date */}
                  <div className="col-span-1 lg:col-span-1.5 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase lg:hidden">From Date</label>
                    <input
                      type="month"
                      {...register(`employmentHistory.${index}.fromDate`)}
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs focus:outline-none transition-all ${
                        rowErrors?.fromDate ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {rowErrors?.fromDate && <p className="text-[11px] text-red-500 font-medium">{rowErrors.fromDate.message}</p>}
                  </div>

                  {/* To Date */}
                  <div className="col-span-1 lg:col-span-1.5 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase lg:hidden">To Date</label>
                    <input
                      type="month"
                      {...register(`employmentHistory.${index}.toDate`)}
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs focus:outline-none transition-all ${
                        rowErrors?.toDate ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {rowErrors?.toDate && <p className="text-[11px] text-red-500 font-medium">{rowErrors.toDate.message}</p>}
                  </div>

                  {/* Reason for Leaving */}
                  <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase lg:hidden">Reason for Leaving</label>
                    <input
                      {...register(`employmentHistory.${index}.reasonForLeaving`)}
                      placeholder="Resigned / End of Contract"
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        rowErrors?.reasonForLeaving ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {rowErrors?.reasonForLeaving && <p className="text-[11px] text-red-500 font-medium">{rowErrors.reasonForLeaving.message}</p>}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StepTwo