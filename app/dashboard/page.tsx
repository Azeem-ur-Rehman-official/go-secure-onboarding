import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: 325,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending Records",
    value: 18,
    icon: Clock3,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Approved",
    value: 296,
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Rejected",
    value: 11,
    icon: XCircle,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Documents",
    value: 1458,
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Downloads",
    value: 583,
    icon: Download,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function Dashboard() {
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((item) => {
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
                    {item.value}
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Employee
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Email
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Submitted
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">John Smith</td>
                <td className="px-6 py-4">john@gmail.com</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">Today</td>
              </tr>

              <tr className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">Ahmed Ali</td>
                <td className="px-6 py-4">ahmed@gmail.com</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Approved
                  </span>
                </td>
                <td className="px-6 py-4">Yesterday</td>
              </tr>

              <tr className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">Usman Khan</td>
                <td className="px-6 py-4">usman@gmail.com</td>
                <td className="px-6 py-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                    Rejected
                  </span>
                </td>
                <td className="px-6 py-4">2 Days Ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}