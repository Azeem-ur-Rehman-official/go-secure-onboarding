"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

import ProgressBar from "./ProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export default function EmployeeForm() {
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);
  console.log("steps", step);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [step]);
  return (
    <section className="min-h-screen bg-[#09111F] py-16 ">
      <div
        ref={formRef}
        className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#233454] bg-[#0D1526] shadow-[0_20px_60px_rgba(0,0,0,.45)]"
      >
        <div className="grid lg:grid-cols-2">
          {/* LEFT */}

          <div className="lg:col-span-2 p-10">
            {/* form fubmitted successfully */}
            {step > 3 && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Check size={48} className="text-green-500" />
                <h2 className="text-2xl font-bold text-white">
                  Form Submitted Successfully!
                </h2>
                <p className="text-gray-400">
                  Thank you for completing the onboarding process.
                </p>
                <p className="text-gray-400">Our team will contact you soon.</p>
              </div>
            )}
            {step <= 3 && (
              <>
                {" "}
                <p className="mb-2 text-gray-400">
                  Complete the onboarding form below.
                </p>
                <h1 className="mb-8 text-4xl font-bold text-white">
                  Employee Onboarding
                </h1>
                <ProgressBar step={step} />
                <form onSubmit={handleSubmit(submit)} className="mt-10">
                  {step === 1 && (
                    <StepOne register={register} errors={errors} />
                  )}

                  {step === 2 && (
                    <StepTwo register={register} errors={errors} />
                  )}

                  {step === 3 && (
                    <StepThree register={register} errors={errors} />
                  )}

                  <div className="mt-10 flex justify-between">
                    {step > 2 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="flex items-center gap-2 rounded-lg border border-[#2D3D5A] bg-[#131C2E] px-7 py-3 text-white transition hover:border-blue-500 hover:bg-[#182338]"
                      >
                        <ChevronLeft size={18} />
                        Previous
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0B5DFF] to-[#2D80FF] px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:scale-105"
                      >
                        Next
                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setStep(step + 1)}
                        type="submit"
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0B5DFF] to-[#2D80FF] px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:scale-105"
                      >
                        Submit
                        <Check size={18} />
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
