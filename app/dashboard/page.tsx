"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
} from "lucide-react";

interface DashboardStats {
  totalEmployees: number;
  pendingRecords: number;
  approvedRecords: number;
  rejectedRecords: number;
  totalReferences: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    pendingRecords: 0,
    approvedRecords: 0,
    rejectedRecords: 0,
    totalReferences: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success) {
        console.log("sa",result);
        setStats(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Applications",
      value: stats.totalEmployees,
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Records",
      value: stats.pendingRecords,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Approved",
      value: stats.approvedRecords,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rejected",
      value: stats.rejectedRecords,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "References",
      value: stats.totalReferences,
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Emplyees",
      value: 0,
      icon: Users,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {loading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      item.value
                    )}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Applications
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest employee form submissions
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
            View All
          </button>
        </div>

        <div className="p-8 text-center text-gray-500">
          Recent applications table will be connected next.
        </div>
      </div>
    </div>
  );
}