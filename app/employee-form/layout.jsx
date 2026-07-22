"use client";

import { useState } from "react";

import Header from "../../components/Header";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <div>{children}</div>
    </div>
  );
}
