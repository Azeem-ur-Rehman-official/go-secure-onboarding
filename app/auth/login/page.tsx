'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
}
// 1. Define Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // 2. Setup React Hook Form with Zod Resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 3. Form submission handler
  const onSubmit = async (data: LoginFormData) => {
    try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // save HttpOnly cookie
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result: LoginResponse = await res.json();

    if (!res.ok) {
      toast.error(result.message);
      return;
    }
console.log("res",res);
    toast.success(result.message);

    router.push("/dashboard");
    router.refresh();
  } catch (error) {
    console.error(error);

    toast.error("Something went wrong.");
  }
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
          <Image src="/logo.webp" width={200} height={200}/>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-300">Enter your credentials to access your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
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
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white/10 focus:ring-2 ${
                  errors.email
                    ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20'
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-200 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-purple-300 hover:text-purple-200 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white/10 focus:ring-2 ${
                  errors.password
                    ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-purple-400/50 focus:ring-purple-400/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
            {!isSubmitting && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-300">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-semibold text-purple-300 hover:text-purple-200 underline underline-offset-4 transition-colors">
            Sign up now
          </Link>
        </p>

      </div>
    </div>
  );
}