'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

export default function SimpleWelcomePage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Application Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Before You Begin
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Please make sure you have the required documents ready before starting your application.
          </p>
        </div>

        {/* Quick Requirements Checklist */}
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Required Items
          </div>

          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>Right to Work Document / Share Code</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>SIA License & Driving License Details</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>5-Year Address & Work History</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span>Details for 2 Professional Referees</span>
            </li>
          </ul>
        </div>

        {/* Time estimate */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400" /> Takes approx. 10 minutes
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-slate-400" /> Auto-saves progress
          </span>
        </div>

        {/* Checkbox Agreement */}
        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
          <span className="text-xs text-slate-600">
            I have my details ready and am prepared to complete the form.
          </span>
        </label>

        {/* Proceed Button */}
        <Link
          href="/employee-form" // Update with your actual form URL
          onClick={(e) => {
            if (!agreed) {
              e.preventDefault();
              alert("Please confirm you have your details ready.");
            }
          }}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition ${
            agreed 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/20 cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Start Application</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>
    </div>
  );
}