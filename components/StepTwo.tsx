export default function StepTwo({ register }: any) {
  const inputClass =
    "w-full h-14 rounded-lg border border-[#2A3550] bg-[#131C2E] px-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#1E6BFF] focus:ring-2 focus:ring-[#1E6BFF]/30";

  return (
    <div className="space-y-10 text-white">
      {/* Employment */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide">
            Employment Details
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("workCode")}
            placeholder="Work Code *"
            className={inputClass}
          />

          <input
            {...register("jobTitle")}
            placeholder="Job Title *"
            className={inputClass}
          />

          <input
            {...register("department")}
            placeholder="Department *"
            className={inputClass}
          />

          <input
            type="date"
            {...register("startDate")}
            className={inputClass}
          />

          <select
            {...register("employmentType")}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Employment Type *</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
            <option>Temporary</option>
          </select>
        </div>
      </section>

      {/* SIA Details */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide">
            SIA Licence Details
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("siaNumber")}
            placeholder="SIA Licence Number *"
            className={inputClass}
          />

          <input
            type="date"
            {...register("siaExpiry")}
            className={inputClass}
          />

          <input
            {...register("siaType")}
            placeholder="SIA Licence Type *"
            className={`${inputClass} md:col-span-2`}
          />
        </div>
      </section>

      {/* Upload Documents */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide">
            Upload Documents
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* SIA Copy */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all hover:border-blue-500 hover:bg-[#182338]">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 transition group-hover:scale-110"
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

            <span className="font-medium">SIA Licence Copy</span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload
            </span>

            <input
              type="file"
              {...register("siaCopy")}
              className="hidden"
            />
          </label>

          {/* Right to Work */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all hover:border-blue-500 hover:bg-[#182338]">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 transition group-hover:scale-110"
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

            <span className="font-medium">
              Right to Work Documents
            </span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload
            </span>

            <input
              type="file"
              {...register("rightToWork")}
              className="hidden"
            />
          </label>

          {/* DBS */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all hover:border-blue-500 hover:bg-[#182338] md:col-span-2">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 transition group-hover:scale-110"
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

            <span className="font-medium">
              DBS Certificate (Optional)
            </span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload
            </span>

            <input
              type="file"
              {...register("dbs")}
              className="hidden"
            />
          </label>
        </div>
      </section>
    </div>
  );
}