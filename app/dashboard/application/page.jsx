'use client';
import * as XLSX from 'xlsx';
import React, { useState, useEffect, useCallback } from 'react';
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
  Eye
} from 'lucide-react';

// API Fetch Function
const getEmployees = async (page = 1, search = "") => {
  const res = await fetch(
    `/api/employees?page=${page}&limit=10&search=${search}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch employee data');
  }

  return await res.json();
};

export default function EmployeesDashboardPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const exportExcel = async () => {
    try {
      setIsExporting(true);

      const formattedData = employees.map((emp) => ({
        // Personal Details
        'Title': emp.title || '',
        'Forenames': emp.forenames || '',
        'Surname': emp.surname || '',
        'Preferred Name': emp.preferredName || '',
        'Email Address': emp.emailAddress || '',
        'Mobile Phone': emp.mobile || '',
        'Gender': emp.gender || '',
        'Date of Birth': emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : '',
        'Place of Birth': emp.placeOfBirth || '',
        'Nationality': emp.nationality || '',
        'National Insurance No': emp.nationalInsuranceNo || '',

        // Right to Work & Passport
        'Right to Work': emp.rightToWork || '',
        'RTW Basis': emp.rtwBasis || '',
        'Online Share Code': emp.onlineShareCode || emp.shareCode || '',
        'Share Code Check Date': emp.shareCodeCheckCompletedDate ? new Date(emp.shareCodeCheckCompletedDate).toLocaleDateString() : '',
        'Share Code Validity Date': emp.shareCodeValidityDate ? new Date(emp.shareCodeValidityDate).toLocaleDateString() : '',
        'Passport Number': emp.passportNumber || '',
        'Passport Nationality': emp.passportNationality || '',
        'Passport Expiry Date': emp.passportExpiryDate ? new Date(emp.passportExpiryDate).toLocaleDateString() : '',

        // SIA Licence Details
        'SIA Licence Number': emp.siaLicenceNumber || '',
        'SIA Licence Type': emp.siaLicenceType || '',
        'SIA Licence Status': emp.siaLicenceStatus || '',
        'SIA Expiry Date': emp.siaExpiryDate ? new Date(emp.siaExpiryDate).toLocaleDateString() : '',

        // Driving License Details
        'License Number': emp.licenseNumber || '',
        'License Expiry Date': emp.licenseExpiryDate ? new Date(emp.licenseExpiryDate).toLocaleDateString() : '',
        'Categories Held': emp.categoriesHeld || '',
        'Right to License': emp.rightToLicense || '',

        // Bank Details
        'Bank Name': emp.bankName || '',
        'Account Holder Name': emp.accountHolderName || '',
        'Account Number': emp.accountNumber || '',
        'Sort Code': emp.sortCode || '',

        // Emergency Contact
        'Emergency Contact Name': emp.emergencyContactName || '',
        'Emergency Relationship': emp.emergencyRelationship || '',
        'Emergency Daytime Phone': emp.emergencyDaytimePhone || '',
        'Emergency Alternative Phone': emp.emergencyAlternativePhone || '',

        // Application & Background
        'Application Status': emp.applicationStatus || '',
        'Availability': emp.availability || '',
        'Years of Experience': emp.yearsOfExperience ?? '',
        'Has Convictions': emp.hasConvictions || '',
        'Profile Photo Matches': emp.profilePhotoMatches || '',

        // Nested Arrays Formatted as readable strings
        'References': Array.isArray(emp.references)
          ? emp.references.map((r, i) => `Ref ${i + 1}: ${r.contactName || ''} (${r.companyName || ''}, ${r.email || ''}, ${r.telephone || ''})`).join(' | ')
          : '',
        
        'Education History': Array.isArray(emp.education)
          ? emp.education.map((e, i) => `Edu ${i + 1}: ${e.institutionName || e.school || ''} (${e.qualification || ''})`).join(' | ')
          : '',

        'Employment History': Array.isArray(emp.employmentHistory)
          ? emp.employmentHistory.map((e, i) => `Job ${i + 1}: ${e.employerName || e.company || ''} - ${e.jobTitle || e.role || ''}`).join(' | ')
          : '',

        'Address History': Array.isArray(emp.addressHistory)
          ? emp.addressHistory.map((a, i) => `Address ${i + 1}: ${a.addressLine1 || a.street || ''}, ${a.postcode || a.city || ''}`).join(' | ')
          : '',

        // Consent & Audit Metadata
        'Consent Agreed': emp.consentAgreed ? 'Yes' : 'No',
        'Consent Employee Name': emp.consentEmployeeName || '',
        'Consent Date': emp.consentDate ? new Date(emp.consentDate).toLocaleDateString() : '',
        'Submitted At': emp.submittedAt ? new Date(emp.submittedAt).toLocaleString() : '',
        'Created At': emp.createdAt ? new Date(emp.createdAt).toLocaleString() : '',
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

      XLSX.writeFile(workbook, `Employees_Export_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (err) {
      console.error('Export Error:', err);
      alert('Failed to export Excel file.');
    } finally {
      setIsExporting(false);
    }
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEmployees(currentPage, debouncedSearch);
      setEmployees(data.data || []);
      // setTotalPages(data.totalPages || 1);
      // setTotalEmployees(data.totalEmployees || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle View Action
  const handleView = (employee) => {
    // You can replace this with a modal trigger or router push to detail page
    console.log("Viewing employee:", employee);
    alert(`Viewing details for ${employee.forenames} ${employee.surname || ''}`);
  };

  // Handle Delete Action
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee record?");
    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/employees?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to delete employee record');
      }

      // Optimistically remove from state
      setEmployees((prev) => prev.filter((emp) => (emp._id || emp.id) !== id));
      setTotalEmployees((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err instanceof Error ? err.message : "Failed to delete record");
      fetchData(); // Refetch on failure to ensure correct state
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Applications
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your workforce, roles, and status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition shadow-sm hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => exportExcel()} 
              disabled={isExporting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-500/20 transition hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              <span>{isExporting ? 'Exporting...' : 'Download Excel'}</span>
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or role..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-purple-500/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-900">{employees.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{totalEmployees}</span> total records
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {error ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
              <p className="text-base font-semibold text-slate-900">Failed to load data</p>
              <p className="mt-1 text-sm text-slate-500">{error}</p>
              <button
                onClick={fetchData}
                className="mt-4 rounded-xl bg-slate-100 border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Employee</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Gender</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Nationality</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    /* Skeleton Loading Rows */
                    Array.from({ length: 5 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 rounded bg-slate-200" />
                              <div className="h-3 w-40 rounded bg-slate-100" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-slate-200" /></td>
                        <td className="px-6 py-4"><div className="h-4 w-20 rounded bg-slate-200" /></td>
                        <td className="px-6 py-4"><div className="h-6 w-16 rounded-full bg-slate-200" /></td>
                        <td className="px-6 py-4 text-right"><div className="ml-auto h-8 w-16 rounded-lg bg-slate-200" /></td>
                      </tr>
                    ))
                  ) : employees.length === 0 ? (
                    /* Empty State */
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-slate-400">
                        No employees found matching your search.
                      </td>
                    </tr>
                  ) : (
                    /* Employee Rows */
                    employees.map((employee) => {
                      const empId = employee._id || employee.id;
                      const isDeleting = deletingId === empId;

                      return (
                        <tr key={empId} className="transition hover:bg-slate-50/80">
                          
                          {/* Name & Email */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-sm font-semibold text-white shadow-sm">
                                {employee.avatar ? (
                                  <img 
                                    src={employee.avatar} 
                                    alt={employee.forenames} 
                                    className="h-10 w-10 rounded-full object-cover" 
                                  />
                                ) : (
                                  employee.forenames?.charAt(0).toUpperCase() || 'E'
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{employee.forenames} {employee.surname || ''}</div>
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                  <Mail className="h-3 w-3" />
                                  {employee.emailAddress}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Gender */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <ShieldCheck className="h-4 w-4 text-purple-600" />
                              <span>{employee.gender || 'Male'}</span>
                            </div>
                          </td>

                          {/* Nationality */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Building2 className="h-4 w-4 text-slate-400" />
                              <span>{employee.nationality || 'General'}</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                                employee.status === 'Active'
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                  : employee.status === 'On Leave'
                                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                                  : 'border-slate-200 bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span
                                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                  employee.status === 'Active'
                                    ? 'bg-emerald-500'
                                    : employee.status === 'On Leave'
                                    ? 'bg-amber-500'
                                    : 'bg-slate-400'
                                }`}
                              />
                              {employee.applicationStatus || 'Active'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* View Button */}
                              <button
                                onClick={() => handleView(employee)}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                title="View details"
                              >
                                <Eye className="h-3.5 w-3.5 text-slate-500" />
                                <span>View</span>
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(empId)}
                                disabled={isDeleting}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50"
                                title="Delete record"
                              >
                                <Trash2 className={`h-3.5 w-3.5 ${isDeleting ? 'animate-spin' : ''}`} />
                                <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {!error && (
            <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-slate-500">
                Page <span className="font-semibold text-slate-800">{currentPage}</span> of{' '}
                <span className="font-semibold text-slate-800">{totalPages}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0 || isLoading}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}