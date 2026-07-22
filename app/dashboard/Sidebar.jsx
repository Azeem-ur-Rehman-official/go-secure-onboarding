"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Clock3,
  BarChart3,
  Settings,
  LogOut,
  Loader2,
  AlertTriangle,
} from "lucide-react";

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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Optional: Call your auth logout API here
      // await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
      setIsModalOpen(false);
      // Redirect to root link
      router.push("/");
    }
  };

  return (
    <>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-xl z-30">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-center border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow">
              <span className="text-white font-bold text-xl">GO</span>
            </div>
            <div>
              <h1 className="text-blue-600 text-2xl font-bold">SECURE</h1>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout Button Section */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group flex w-full items-center justify-between rounded-xl p-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200/80 text-slate-500 shadow-sm group-hover:border-rose-200 group-hover:bg-rose-100 group-hover:text-rose-600 transition-all duration-200">
                <LogOut size={18} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              </div>
              <span className="font-semibold">Log Out</span>
            </div>
            
            <span className="text-xs font-normal text-slate-400 group-hover:text-rose-400 transition-colors">
              Exit
            </span>
          </button>
        </div>
      </aside>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Confirm Logout
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to log out? You will be returned to the home screen.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoggingOut}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 transition-colors disabled:opacity-50 shadow-sm shadow-rose-500/20"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Exiting...</span>
                  </>
                ) : (
                  <span>Log Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}