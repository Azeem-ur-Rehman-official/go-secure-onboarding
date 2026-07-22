"use client";
import React, { useState } from "react";
import {
  X,
  User,
  Briefcase,
  GraduationCap,
  Home,
  HeartPulse,
  Building,
  FileCheck,
  ShieldAlert,
  Phone,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ViewEmployeeModal({ isOpen, onClose, employee }) {
  const [activeTab, setActiveTab] = useState("personal");

  if (!isOpen || !employee) return null;

  // Helper function to format ISO dates cleanly
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "work", label: "Work & SIA", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "history", label: "History & Address", icon: Home },
    { id: "medical", label: "Medical", icon: HeartPulse },
    { id: "bank", label: "Banking & Emergency", icon: Building },
    { id: "compliance", label: "Right to Work", icon: FileCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold text-lg">
              {employee.forenames?.[0] || ""}{employee.surname?.[0] || ""}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {employee.title} {employee.forenames} {employee.surname}
              </h2>
              <p className="text-xs text-slate-500">
                Preferred Name: <span className="font-medium text-slate-700">{employee.preferredName || "N/A"}</span> • ID: {employee._id || employee.id || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              {employee.applicationStatus || "Pending"}
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-4 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold transition ${
                  isActive
                    ? "border-purple-600 text-purple-600 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white text-sm text-slate-700">
          
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailBox label="Full Name" value={`${employee.forenames || ''} ${employee.surname || ''}`} />
              <DetailBox label="Preferred Name" value={employee.preferredName} />
              <DetailBox label="Title / Role" value={employee.title} />
              <DetailBox label="Email Address" value={employee.emailAddress} />
              <DetailBox label="Mobile Number" value={employee.mobile} />
              <DetailBox label="Gender" value={employee.gender} />
              <DetailBox label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
              <DetailBox label="Place of Birth" value={employee.placeOfBirth} />
              <DetailBox label="Nationality" value={employee.nationality} />
              <DetailBox label="National Insurance No." value={employee.nationalInsuranceNo} />
              <DetailBox label="Profile Photo Match" value={employee.profilePhotoMatches} capitalize />
            </div>
          )}

          {/* TAB 2: WORK & SIA LICENSING */}
          {activeTab === "work" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailBox label="Years of Experience" value={employee.yearsOfExperience ? `${employee.yearsOfExperience} years` : "N/A"} />
                <DetailBox label="Availability" value={employee.availability} />
                <DetailBox label="Has Convictions" value={employee.hasConvictions} highlightWarning={employee.hasConvictions === "yes"} />
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-purple-600" /> SIA License Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailBox label="SIA License Number" value={employee.siaLicenceNumber} />
                  <DetailBox label="SIA Status" value={employee.siaLicenceStatus} />
                  <DetailBox label="SIA Type" value={employee.siaLicenceType} />
                  <DetailBox label="SIA Expiry Date" value={formatDate(employee.siaExpiryDate)} />
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" /> Driving License Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailBox label="License Number" value={employee.licenseNumber} />
                  <DetailBox label="License Expiry Date" value={formatDate(employee.licenseExpiryDate)} />
                  <DetailBox label="Categories Held" value={employee.categoriesHeld} />
                  <DetailBox label="Right to License" value={employee.rightToLicense} capitalize />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Education Qualifications</h3>
              {employee.education && employee.education.length > 0 ? (
                <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 overflow-hidden">
                  {employee.education.map((edu, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/30 hover:bg-slate-50 transition">
                      <div>
                        <p className="font-bold text-slate-900">{edu.qualification || "N/A"}</p>
                        <p className="text-xs text-slate-500">{edu.institution || "N/A"}</p>
                      </div>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {edu.year || "N/A"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No education history recorded.</p>
              )}
            </div>
          )}

          {/* TAB 4: HISTORY & ADDRESS */}
          {activeTab === "history" && (
            <div className="space-y-6">
              {/* Address History */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Address History</h3>
                {employee.addressHistory && employee.addressHistory.length > 0 ? (
                  <div className="space-y-2">
                    {employee.addressHistory.map((addr, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                        <div>
                          <p className="font-medium text-slate-800">{addr.fullAddress}</p>
                          <p className="text-xs text-slate-500">Postcode: {addr.postcode}</p>
                        </div>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {formatDate(addr.timelineDate)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No address history provided.</p>
                )}
              </div>

              {/* Employment History */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Employment History</h3>
                {employee.employmentHistory && employee.employmentHistory.some(emp => emp.employer || emp.jobTitle) ? (
                  <div className="space-y-2">
                    {employee.employmentHistory
                      .filter((emp) => emp.employer || emp.jobTitle)
                      .map((emp, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 p-3 bg-slate-50/50 space-y-1">
                          <p className="font-bold text-slate-900">{emp.jobTitle || "Role N/A"} - <span className="text-slate-600">{emp.employer || "Employer N/A"}</span></p>
                          <p className="text-xs text-slate-500">
                            {formatDate(emp.fromDate)} to {formatDate(emp.toDate)}
                          </p>
                          {emp.reasonForLeaving && (
                            <p className="text-xs text-slate-600 italic">Reason for Leaving: {emp.reasonForLeaving}</p>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No previous employment records listed.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: MEDICAL CONDITIONS */}
          {activeTab === "medical" && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-purple-600" /> Medical Questionnaire
              </h3>
              {employee.medical ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <MedicalStatusBox label="Current Medication" data={employee.medical.currentMedication} />
                  <MedicalStatusBox label="Diabetes" data={employee.medical.diabetes} />
                  <MedicalStatusBox label="Epilepsy / Dizziness" data={employee.medical.epilepsyDizziness} />
                  <MedicalStatusBox label="Heart & Circulatory" data={employee.medical.heartCirculatory} />
                  <MedicalStatusBox label="Mental Health" data={employee.medical.mentalHealth} />
                  <MedicalStatusBox label="Musculoskeletal" data={employee.medical.musculoskeletal} />
                  <MedicalStatusBox label="Sensory Impairment" data={employee.medical.sensoryImpairment} />
                  <MedicalStatusBox label="Shift / Night Work" data={employee.medical.shiftNightWork} />
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No medical records filled out.</p>
              )}
            </div>
          )}

          {/* TAB 6: BANKING & EMERGENCY */}
          {activeTab === "bank" && (
            <div className="space-y-6">
              {/* Bank Details */}
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Building className="h-4 w-4 text-purple-600" /> Bank Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailBox label="Account Holder Name" value={employee.accountHolderName} />
                  <DetailBox label="Bank Name" value={employee.bankName} />
                  <DetailBox label="Account Number" value={employee.accountNumber} />
                  <DetailBox label="Sort Code" value={employee.sortCode} />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-600" /> Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailBox label="Contact Name" value={employee.emergencyContactName} />
                  <DetailBox label="Relationship" value={employee.emergencyRelationship} />
                  <DetailBox label="Daytime Phone" value={employee.emergencyDaytimePhone} />
                  <DetailBox label="Alternative Phone" value={employee.emergencyAlternativePhone} />
                </div>
              </div>

              {/* References */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">References</h3>
                {employee.references && employee.references.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {employee.references.map((ref, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 p-3 bg-slate-50/50 space-y-1">
                        <p className="font-bold text-slate-900">{ref.contactName || "N/A"}</p>
                        <p className="text-xs text-slate-600">{ref.companyName}</p>
                        <p className="text-xs text-slate-500">{ref.email} • {ref.telephone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No references provided.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: COMPLIANCE & RIGHT TO WORK */}
          {activeTab === "compliance" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailBox label="Right to Work" value={employee.rightToWork} capitalize />
                <DetailBox label="RTW Basis" value={employee.rtwBasis} />
                <DetailBox label="Share Code" value={employee.shareCode} />
                <DetailBox label="Online Share Code" value={employee.onlineShareCode} />
                <DetailBox label="Share Code Check Date" value={formatDate(employee.shareCodeCheckCompletedDate)} />
                <DetailBox label="Share Code Validity Date" value={formatDate(employee.shareCodeValidityDate)} />
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Passport Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailBox label="Passport Number" value={employee.passportNumber} />
                  <DetailBox label="Passport Nationality" value={employee.passportNationality} />
                  <DetailBox label="Passport Expiry Date" value={formatDate(employee.passportExpiryDate)} />
                </div>
              </div>

              {/* Consent & Submission */}
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Consent & Signature</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailBox label="Consent Agreed" value={employee.consentAgreed ? "Yes" : "No"} />
                  <DetailBox label="Consent Date" value={formatDate(employee.consentDate)} />
                  <DetailBox label="Consent Signee Name" value={employee.consentEmployeeName} />
                  <DetailBox label="Signature Data" value={employee.consentSignature} />
                  <DetailBox label="Form Submitted At" value={formatDate(employee.submittedAt)} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-components for visual consistency
function DetailBox({ label, value, capitalize = false, highlightWarning = false }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/30">
      <p className="text-[11px] font-semibold text-slate-400 uppercase">{label}</p>
      <p
        className={`font-medium mt-0.5 break-words ${
          highlightWarning ? "text-amber-600 font-bold" : "text-slate-800"
        } ${capitalize ? "capitalize" : ""}`}
      >
        {value !== null && value !== undefined && value !== "" ? String(value) : "N/A"}
      </p>
    </div>
  );
}

function MedicalStatusBox({ label, data }) {
  const hasCondition = data?.hasCondition === "yes";

  return (
    <div className={`flex items-center justify-between rounded-xl border p-3 ${
      hasCondition ? "border-amber-200 bg-amber-50/50" : "border-slate-200 bg-slate-50/30"
    }`}>
      <span className="font-medium text-slate-800 text-xs">{label}</span>
      <div className="flex items-center gap-1.5">
        {hasCondition ? (
          <>
            <XCircle className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-700">Yes</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-medium text-slate-600">No</span>
          </>
        )}
      </div>
    </div>
  );
}