"use client";

import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Clock3,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
export default function MobileSidebar({ open, setOpen }) {
  const pathname = usePathname();
  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },

    {
      title: "Employees",
      icon: Users,
      href: "/employees",
    },

    {
      title: "Applications",
      icon: FileText,
      href: "/dashboard/application",
    },

    {
      title: "Pending",
      icon: Clock3,
      href: "/pending",
    },

    {
      title: "Reports",
      icon: BarChart3,
      href: "/reports",
    },

    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-screen w-72 transform bg-white transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 border-b  border-slate-200 shadow px-5">
          <h2 className="font-bold text-xl text-blue-600">ERP SYSTEM</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="flex-1 p-5 space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-xl transition

${
  pathname === item.href
    ? "bg-blue-600 text-white"
    : "text-slate-700 hover:bg-slate-100"
}

`}
              >
                <Icon size={20} />

                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="p-5 border-t">
          <button className="flex items-center gap-3 text-red-500">
            <LogOut />
            Logout
          </button>
        </div>
        {/* <Sidebar /> */}
      </div>
    </>
  );
}
