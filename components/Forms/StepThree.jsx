import React from 'react';

const StepThree = ({ register, errors, referenceFields, educationFields }) => {
  return (
    <div className="space-y-12">
      
      {/* =================== SECTION 7: EMPLOYEE REFERENCE (2) =================== */}
      <section className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              7
            </span>
            EMPLOYEE REFERENCE *
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {referenceFields.map((field, idx) => {
            const refErrors = errors?.references?.[idx];
            return (
              <div key={field.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-[#23466f] uppercase tracking-wider pb-1 border-b border-slate-200">
                  Reference {idx + 1}
                </h3>
                
                <div className="space-y-3">
                  {/* Company Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">Company Name *</label>
                    <input
                      {...register(`references.${idx}.companyName`)}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        refErrors?.companyName ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {refErrors?.companyName && <p className="text-[11px] text-red-500 font-medium">{refErrors.companyName.message}</p>}
                  </div>

                  {/* Contact Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">Contact Name *</label>
                    <input
                      {...register(`references.${idx}.contactName`)}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        refErrors?.contactName ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {refErrors?.contactName && <p className="text-[11px] text-red-500 font-medium">{refErrors.contactName.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">Email *</label>
                    <input
                      type="email"
                      {...register(`references.${idx}.email`)}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        refErrors?.email ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {refErrors?.email && <p className="text-[11px] text-red-500 font-medium">{refErrors.email.message}</p>}
                  </div>

                  {/* Telephone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">Telephone *</label>
                    <input
                      type="tel"
                      {...register(`references.${idx}.telephone`)}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        refErrors?.telephone ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {refErrors?.telephone && <p className="text-[11px] text-red-500 font-medium">{refErrors.telephone.message}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =================== SECTION 8: EDUCATION & QUALIFICATIONS =================== */}
      <section className="space-y-4 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              8
            </span>
            EDUCATION & QUALIFICATIONS
          </h2>
        </div>

        <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
          {/* Table Headers */}
          <div className="hidden md:grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase p-3 gap-3 text-slate-600">
            <div className="col-span-5">School / College / University</div>
            <div className="col-span-5">Qualification</div>
            <div className="col-span-2">Year</div>
          </div>

          {/* Qualification Rows */}
          <div className="divide-y divide-slate-200">
            {educationFields.map((_, index) => {
              const eduErrors = errors?.education?.[index];
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-3 gap-3 bg-white items-start">
                  {/* Institution */}
                  <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase md:hidden">School/Uni</label>
                    <input
                      {...register(`education.${index}.institution`)}
                      placeholder="e.g. High School or University"
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        eduErrors?.institution ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {eduErrors?.institution && <p className="text-[11px] text-red-500 font-medium">{eduErrors.institution.message}</p>}
                  </div>

                  {/* Qualification */}
                  <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase md:hidden">Qualification</label>
                    <input
                      {...register(`education.${index}.qualification`)}
                      placeholder="e.g. GCSEs, Diploma, Degree"
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        eduErrors?.qualification ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {eduErrors?.qualification && <p className="text-[11px] text-red-500 font-medium">{eduErrors.qualification.message}</p>}
                  </div>

                  {/* Year */}
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-400 uppercase md:hidden">Year</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="YYYY"
                      {...register(`education.${index}.year`)}
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                        eduErrors?.year ? "border-red-500 focus:ring-1 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]"
                      }`}
                    />
                    {eduErrors?.year && <p className="text-[11px] text-red-500 font-medium">{eduErrors.year.message}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================== SECTION 9: EMERGENCY CONTACT 1 =================== */}
      <section className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
            <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
              9
            </span>
            EMERGENCY CONTACT *
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Contact Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Contact Name *</label>
            <input
              {...register("emergencyContactName")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.emergencyContactName ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.emergencyContactName && (
              <p className="text-xs text-red-500 font-medium">{errors.emergencyContactName.message}</p>
            )}
          </div>

          {/* Relationship */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Relationship *</label>
            <input
              {...register("emergencyRelationship")}
              placeholder="e.g. Spouse, Parent, Friend"
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.emergencyRelationship ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.emergencyRelationship && (
              <p className="text-xs text-red-500 font-medium">{errors.emergencyRelationship.message}</p>
            )}
          </div>

          {/* Daytime Telephone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Daytime Telephone *</label>
            <input
              type="tel"
              {...register("emergencyDaytimePhone")}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors?.emergencyDaytimePhone ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-[#23466f]/20"
              }`}
            />
            {errors?.emergencyDaytimePhone && (
              <p className="text-xs text-red-500 font-medium">{errors.emergencyDaytimePhone.message}</p>
            )}
          </div>

          {/* Alternative Telephone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Alternative Telephone <span className="text-xs text-slate-400 font-normal">(Optional)</span></label>
            <input
              type="tel"
              {...register("emergencyAlternativePhone")}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700"
            />
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default StepThree;