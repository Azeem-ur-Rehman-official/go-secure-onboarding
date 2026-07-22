"use client";
import * as XLSX from "xlsx";
import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Building2,
  Mail,
  ShieldCheck,
  Download,
  Trash2,
  Eye,
  Loader2,
  Users,
} from "lucide-react";

import ViewEmployeeModal from "../../../components/ViewDetail/ViewEmployeeModal";

// Skeleton component updated for desktop table and mobile cards
function TableSkeleton({ rows = 5 }) {
  return (
    <>
      {/* Desktop Skeleton */}
      <tbody className="hidden md:table-row-group divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, idx) => (
          <tr key={idx} className="animate-pulse">
            <td className="px-6 py-4">
              <div className="h-4 w-32 bg-slate-200 rounded mb-1.5" />
              <div className="h-3 w-44 bg-slate-100 rounded" />
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-16 bg-slate-200 rounded" />
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </td>
            <td className="px-6 py-4">
              <div className="h-5 w-20 bg-purple-100 rounded-full" />
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-2">
                <div className="h-7 w-16 bg-slate-200 rounded-lg" />
                <div className="h-7 w-16 bg-slate-200 rounded-lg" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {/* Mobile Skeleton */}
      <div className="divide-y divide-slate-100 md:hidden">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="p-4 space-y-3 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-3 w-40 bg-slate-100 rounded" />
              </div>
              <div className="h-5 w-16 bg-purple-100 rounded-full" />
            </div>
            <div className="flex gap-4 text-xs">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-3 w-24 bg-slate-100 rounded" />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <div className="h-8 w-20 bg-slate-200 rounded-lg" />
              <div className="h-8 w-20 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const getEmployees = async (page = 1, search = "") => {
  const res = await fetch(
    `/api/employees?page=${page}&limit=10&search=${search}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch employee data");
  }

  return await res.json();
};

export default function EmployeesDashboardPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Loading & Action states
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // States for Popup Module
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const exportExcel = async () => {
    try {
      setIsExporting(true);

      const formattedData = employees.map((emp) => ({
        Title: emp.title || "",
        Forenames: emp.forenames || "",
        Surname: emp.surname || "",
        "Email Address": emp.emailAddress || "",
        "Mobile Phone": emp.mobile || "",
        Gender: emp.gender || "",
        "Date of Birth": emp.dateOfBirth
          ? new Date(emp.dateOfBirth).toLocaleDateString()
          : "",
        Nationality: emp.nationality || "",
        "Application Status": emp.applicationStatus || "",
        "Bank Name": emp.bankName || "",
        "Account Number": emp.accountNumber || "",
        "Sort Code": emp.sortCode || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

      XLSX.writeFile(
        workbook,
        `Employees_Export_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (err) {
      console.error("Export Error:", err);
      alert("Failed to export Excel file.");
    } finally {
      setIsExporting(false);
    }
  };

  // Debounce search query
  useEffect(() => {
    if (searchQuery !== debouncedSearch) {
      setIsSearching(true);
    }
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEmployees(currentPage, debouncedSearch);
      setEmployees(data.data || []);
      if (data.totalPages) setTotalPages(data.totalPages);
      if (data.totalRecords || data.totalEmployees) {
        setTotalEmployees(data.totalRecords || data.totalEmployees);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // View button handler
  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee record?"
    );
    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/employees?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete employee record");

      setEmployees((prev) => prev.filter((emp) => (emp._id || emp.id) !== id));
      setTotalEmployees((prev) => Math.max(0, prev - 1));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete record");
      fetchData();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Applications
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your workforce, roles, and status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              title="Refresh table"
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isLoading ? "animate-spin text-purple-600" : ""
                }`}
              />
            </button>
            <button
              onClick={exportExcel}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>{isExporting ? "Exporting..." : "Download Excel"}</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
            <p>{error}</p>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            {(isSearching || (isLoading && searchQuery)) && (
              <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-purple-600" />
            )}
          </div>
        </div>

        {/* Table / Card Container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : employees.length > 0 ? (
            <>
              {/* DESKTOP TABLE (Hidden on mobile) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Employee</th>
                      <th className="px-6 py-4 font-semibold">Gender</th>
                      <th className="px-6 py-4 font-semibold">Nationality</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((employee) => {
                      const empId = employee._id || employee.id;
                      const isDeleting = deletingId === empId;

                      return (
                        <tr key={empId} className="hover:bg-slate-50/80 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-900">
                              {employee.forenames} {employee.surname}
                            </div>
                            <div className="text-xs text-slate-500">
                              {employee.emailAddress}
                            </div>
                          </td>
                          <td className="px-6 py-4">{employee.gender || "N/A"}</td>
                          <td className="px-6 py-4">
                            {employee.nationality || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                              {employee.applicationStatus || "Active"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleView(employee)}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>View</span>
                              </button>

                              <button
                                onClick={() => handleDelete(empId)}
                                disabled={isDeleting}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                              >
                                {isDeleting ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                                <span>
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS (Visible only on mobile) */}
              <div className="divide-y divide-slate-100 md:hidden">
                {employees.map((employee) => {
                  const empId = employee._id || employee.id;
                  const isDeleting = deletingId === empId;

                  return (
                    <div key={empId} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-slate-900">
                            {employee.forenames} {employee.surname}
                          </div>
                          <div className="text-xs text-slate-500 break-all">
                            {employee.emailAddress}
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 shrink-0">
                          {employee.applicationStatus || "Active"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                        <div>
                          <span className="text-slate-400 block">Gender</span>
                          <span className="font-medium text-slate-700">
                            {employee.gender || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Nationality</span>
                          <span className="font-medium text-slate-700">
                            {employee.nationality || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => handleView(employee)}
                          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => handleDelete(empId)}
                          disabled={isDeleting}
                          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* EMPTY STATE */
            <div className="px-6 py-12 text-center text-slate-400">
              <div className="flex flex-col items-center gap-2">
                <Users className="h-8 w-8 text-slate-300" />
                <p className="text-sm font-medium text-slate-600">
                  No employees found
                </p>
                <p className="text-xs text-slate-400">
                  {searchQuery
                    ? "Try searching for a different keyword."
                    : "There are currently no records to display."}
                </p>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 px-4 sm:px-6 py-3 bg-slate-50 text-xs text-slate-500">
              <div>
                Page <span className="font-semibold text-slate-700">{currentPage}</span> of{" "}
                <span className="font-semibold text-slate-700">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || isLoading}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL COMPONENT */}
      <ViewEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee}
      />
    </div>
  );
}