"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 1. Define Zod validation schema for Sign Up
const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Full name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. Setup React Hook Form with Zod Resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const userRegister = async (userData: SignupFormData): Promise<void> => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      console.log("Signup Successful");
    } else {
      console.log(data.message);
    }
  };
  // 3. Form submission handler
  const onSubmit = async (data: SignupFormData) => {
    // Simulate async API call
    userRegister(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Validated Signup Data:", data);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000 ease-out"
        style={{
          backgroundImage: `url('/heroImage.webp')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/60 to-purple-950/40 backdrop-blur-[2px]" />

      {/* Glassmorphic Form Container */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo.webp"
            width={200}
            height={200}
            alt="Logo"
            priority
          />
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Sign up to get started with your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="h-5 w-5" />
              </div>
              <input
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white/10 focus:ring-2 ${
                  errors.name
                    ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/20"
                    : "border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white/10 focus:ring-2 ${
                  errors.email
                    ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/20"
                    : "border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white/10 focus:ring-2 ${
                  errors.password
                    ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/20"
                    : "border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white/10 focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/20"
                    : "border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Creating Account..." : "Sign Up"}</span>
            {!isSubmitting && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-purple-300 hover:text-purple-200 underline underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
