export default function StepOne({ register }: any) {
  const inputClass =
    "w-full h-14 rounded-lg border border-[#2A3550] px-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#1E6BFF] focus:ring-2 focus:ring-[#1E6BFF]/30";

  const textareaClass =
    "w-full rounded-lg border border-[#2A3550] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#1E6BFF] focus:ring-2 focus:ring-[#1E6BFF]/30";

  return (
    <div className="space-y-10 text-white">
      {/* Personal Details */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide text-white">
            Personal Details
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("fullName")}
            placeholder="Full Name *"
            className={inputClass}
          />

          <input
            {...register("contactNumber")}
            placeholder="Contact Number *"
            className={inputClass}
          />

          <input
            type="email"
            {...register("email")}
            placeholder="Email Address *"
            className={`${inputClass} md:col-span-2`}
          />

          <input
            type="date"
            {...register("dob")}
            className={inputClass}
          />

          <div></div>

          <textarea
            rows={4}
            {...register("address")}
            placeholder="Home Address *"
            className={`${textareaClass} md:col-span-2`}
          />
        </div>
      </section>

      {/* Emergency Contact */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide text-white">
            Emergency Contact
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            {...register("emergencyName")}
            placeholder="Contact Name *"
            className={inputClass}
          />

          <input
            {...register("emergencyPhone")}
            placeholder="Contact Number *"
            className={inputClass}
          />

          <input
            {...register("relationship")}
            placeholder="Relationship *"
            className={`${inputClass} md:col-span-2`}
          />
        </div>
      </section>

      {/* Upload Documents */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-blue-600"></div>
          <h2 className="text-xl font-semibold tracking-wide text-white">
            Upload Documents
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Passport */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all hover:border-blue-500 hover:bg-[#182338]">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 group-hover:scale-110 transition"
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
              Passport Copy
            </span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload
            </span>

            <input
              type="file"
              {...register("passport")}
              className="hidden"
            />
          </label>

          {/* Address */}
          <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3550] bg-[#131C2E] p-8 transition-all hover:border-blue-500 hover:bg-[#182338]">
            <svg
              className="mb-3 h-10 w-10 text-blue-500 group-hover:scale-110 transition"
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
              Proof of Address
            </span>

            <span className="mt-1 text-sm text-gray-400">
              Click to upload
            </span>

            <input
              type="file"
              {...register("proofAddress")}
              className="hidden"
            />
          </label>
        </div>
      </section>
    </div>
  );
}