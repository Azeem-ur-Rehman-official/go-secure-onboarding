import React from 'react'

const StepOne = ({register,errors,addressFields}) => {
  return (
    <div>
    {/* =================== SECTION 1: PERSONAL DETAILS =================== */}
        <section className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-3">
                    <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
                      <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
                        1
                      </span>
                      Personal Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-1.5 lg:col-span-1">
                      <label className="text-sm font-semibold text-slate-600">
                        Title
                      </label>
                      <input
                        {...register("title")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.title
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                        placeholder="e.g. Mr / Ms / Dr"
                      />
                      {errors.title && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 lg:col-span-3">
                      <label className="text-sm font-semibold text-slate-600">
                        Preferred Name{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <input
                        {...register("preferredName")}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#23466f] focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Surname / Family Name
                      </label>
                      <input
                        {...register("surname")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.surname
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                      />
                      {errors.surname && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.surname.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Forename(s)
                      </label>
                      <input
                        {...register("forenames")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.forenames
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                      />
                      {errors.forenames && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.forenames.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        {...register("dateOfBirth")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all text-slate-700 ${
                          errors.dateOfBirth
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Place / Country of Birth
                      </label>
                      <input
                        {...register("placeOfBirth")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.placeOfBirth
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                      />
                      {errors.placeOfBirth && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.placeOfBirth.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Nationality
                      </label>
                      <input
                        {...register("nationality")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.nationality
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                      />
                      {errors.nationality && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.nationality.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Gender{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <select
                        {...register("gender")}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#23466f] focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] bg-no-repeat pr-10"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        National Insurance No.
                      </label>
                      <input
                        {...register("nationalInsuranceNo")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all uppercase ${
                          errors.nationalInsuranceNo
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                        placeholder="e.g. QQ 12 34 56 A"
                      />
                      {errors.nationalInsuranceNo && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.nationalInsuranceNo.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Mobile
                      </label>
                      <input
                        type="tel"
                        {...register("mobile")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.mobile
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                      />
                      {errors.mobile && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.mobile.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("emailAddress")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.emailAddress
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.emailAddress && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.emailAddress.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Availability (Working day & working hrs)
                      </label>
                      <input
                        {...register("availability")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.availability
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#23466f] focus:ring-[#23466f]/20"
                        }`}
                        placeholder="e.g. Mon-Fri, 09:00 - 17:00"
                      />
                      {errors.availability && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.availability.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
                {/* =================== SECTION 2: CURRENT ADDRESS HISTORY =================== */}
                <section className="space-y-4 animate-fadeIn pt-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
                      <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
                        2
                      </span>
                      Address History (5 Years)
                    </h2>
                    <p className="mt-1.5 text-xs italic text-slate-500">
                      List all addresses covering the last five years. There
                      must be no gaps in the timeline.
                    </p>
                  </div>
                 

                  <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                    <div className="hidden md:grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase p-3 gap-4 text-slate-600">
                      <div className="col-span-6">Full Address</div>
                      <div className="col-span-3">Postcode</div>
                      <div className="col-span-3">From - To (MM/YYYY)</div>
                    </div>
                    <div className="divide-y divide-slate-200">
                      {addressFields.map((field, index) => {
                        const rowErrors = errors.addressHistory?.[index];
                        return (
                          <div
                            key={field.id}
                            className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-3 gap-4 bg-white items-start"
                          >
                            {/* Dynamic Row Full Address */}
                            <div className="col-span-1 md:col-span-6 flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-500 uppercase md:hidden">
                                Address {index + 1}
                              </label>
                              <input
                                {...register(
                                  `addressHistory.${index}.fullAddress`,
                                )}
                                className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                                  rowErrors?.fullAddress
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-slate-300 focus:border-[#23466f]"
                                }`}
                                placeholder="Street name, City"
                              />
                              {rowErrors?.fullAddress && (
                                <p className="text-[11px] text-red-500 font-medium">
                                  {rowErrors.fullAddress.message}
                                </p>
                              )}
                            </div>

                            {/* Dynamic Row Postcode */}
                            <div className="col-span-1 md:col-span-3 flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-500 uppercase md:hidden">
                                Postcode
                              </label>
                              <input
                                {...register(
                                  `addressHistory.${index}.postcode`,
                                )}
                                className={`w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none transition-all ${
                                  rowErrors?.postcode
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-slate-300 focus:border-[#23466f]"
                                }`}
                                placeholder="E1 6AN"
                              />
                              {rowErrors?.postcode && (
                                <p className="text-[11px] text-red-500 font-medium">
                                  {rowErrors.postcode.message}
                                </p>
                              )}
                            </div>

                            {/* Dynamic Row Timeline Date Range */}
                            <div className="col-span-1 md:col-span-3 flex flex-col gap-1">
                              <label className="text-xs font-bold text-slate-500 uppercase md:hidden">
                                Timeline Date
                              </label>
                              <input
                                type="date"
                                {...register(
                                  `addressHistory.${index}.timelineDate`,
                                )}
                                className={`w-full rounded-lg border px-2 py-1.5 text-xs focus:outline-none transition-all ${
                                  rowErrors?.timelineDate
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-slate-300 focus:border-[#23466f]"
                                }`}
                              />
                              {rowErrors?.timelineDate && (
                                <p className="text-[11px] text-red-500 font-medium">
                                  {rowErrors.timelineDate.message}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* =================== SECTION 3: RIGHT TO WORK =================== */}
                <section className="space-y-6 pt-5 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-3">
                    <h2 className="text-xl font-bold tracking-wide text-[#23466f] uppercase flex items-center gap-2">
                      <span className="flex items-center justify-center bg-[#23466f] text-white w-7 h-7 rounded-full text-sm">
                        3
                      </span>
                      Right To Work In The UK
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Do you have the right to work in the UK?
                      </label>
                      <select
                        {...register("rightToWork")}
                        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%20%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] bg-no-repeat pr-10 ${
                          errors.rightToWork
                            ? "border-red-500"
                            : "border-slate-300 focus:border-[#23466f]"
                        }`}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {errors.rightToWork && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.rightToWork.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        RTW Basis{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (British / Settled / Visa)
                        </span>
                      </label>
                      <input
                        {...register("rtwBasis")}
                        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all ${
                          errors.rtwBasis
                            ? "border-red-500"
                            : "border-slate-300 focus:border-[#23466f]"
                        }`}
                      />
                      {errors.rtwBasis && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.rtwBasis.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Passport Number
                      </label>
                      <input
                        {...register("passportNumber")}
                        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all ${
                          errors.passportNumber
                            ? "border-red-500"
                            : "border-slate-300 focus:border-[#23466f]"
                        }`}
                      />
                      {errors.passportNumber && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.passportNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Passport Nationality
                      </label>
                      <input
                        {...register("passportNationality")}
                        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all ${
                          errors.passportNationality
                            ? "border-red-500"
                            : "border-slate-300 focus:border-[#23466f]"
                        }`}
                      />
                      {errors.passportNationality && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.passportNationality.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Passport Expiry Date
                      </label>
                      <input
                        type="date"
                        {...register("passportExpiryDate")}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all text-slate-700 ${
                          errors.passportExpiryDate
                            ? "border-red-500"
                            : "border-slate-300 focus:border-[#23466f]"
                        }`}
                      />
                      {errors.passportExpiryDate && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.passportExpiryDate.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Share Code{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (If Applicable)
                        </span>
                      </label>
                      <input
                        {...register("shareCode")}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:border-[#23466f] focus:outline-none focus:ring-2 focus:ring-[#23466f]/20 transition-all uppercase"
                        placeholder="e.g. A12 345 67G"
                      />
                    </div>
                  </div>
                </section>
    </div>
  )
}

export default StepOne