"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <MobileSidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="lg:ml-72">

        <Navbar
          setOpen={setOpen}
        />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}