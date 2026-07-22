"use client";

import { Menu, Bell, Search } from "lucide-react";
import { useEffect } from "react";

export default function Navbar({ setOpen }) {


  return (
    <header className="sticky top-0 z-30 bg-white border-b  border-slate-200 shadow h-20 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-3" size={18} />

          <input
            placeholder="Search Employee..."
            className="pl-10 w-96 h-11 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button>
          <Bell />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
            A
          </div>

          <div>
            <h4 className="font-semibold">Admin</h4>

            <p className="text-sm text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
