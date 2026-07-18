export default function StepThree({ register }: any) {
  const inputClass =
    "w-full h-14 rounded-lg border border-[#2A3550] bg-[#131C2E] px-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#1E6BFF] focus:ring-2 focus:ring-[#1E6BFF]/30";

  return (
    <div className="space-y-10 text-white">
      {/* Bank Details */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide">
            Bank Details
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("accountName")}
            placeholder="Account Name *"
            className={inputClass}
          />

          <input
            {...register("accountNumber")}
            placeholder="Account Number *"
            className={inputClass}
          />

          <input
            {...register("sortCode")}
            placeholder="Sort Code *"
            className={`${inputClass} md:col-span-2`}
          />
        </div>
      </section>

      {/* Documents */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide">
            Documents
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("nino")}
            placeholder="National Insurance Number (NINO) *"
            className={`${inputClass} md:col-span-2`}
          />

          {/* CV Upload */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all duration-300 hover:border-blue-500 hover:bg-[#182338]">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>

            <span className="font-medium text-white">Upload CV</span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload your CV
            </span>

            <input
              type="file"
              {...register("cv")}
              className="hidden"
            />
          </label>

          {/* Driving Licence */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all duration-300 hover:border-blue-500 hover:bg-[#182338]">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>

            <span className="font-medium text-white">
              Driving Licence (Optional)
            </span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload
            </span>

            <input
              type="file"
              {...register("drivingLicence")}
              className="hidden"
            />
          </label>
        </div>
      </section>

      {/* Declaration */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide">
            Declaration
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("signature")}
            placeholder="Employee Signature *"
            className={inputClass}
          />

          <input
            type="date"
            {...register("date")}
            className={inputClass}
          />
        </div>

        <div className="mt-6 rounded-xl border border-[#2A3550] bg-[#131C2E] p-5">
          <p className="text-sm leading-7 text-gray-400">
            By submitting this form, I confirm that all information provided is
            accurate and complete. I understand that any false or misleading
            information may result in disciplinary action or termination of
            employment.
          </p>
        </div>
      </section>
    </div>
  );
}