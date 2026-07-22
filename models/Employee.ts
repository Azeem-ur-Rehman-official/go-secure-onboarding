import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

/* ---------------- Address History ---------------- */

const AddressHistorySchema = new Schema(
  {
    fullAddress: String,
    postcode: String,
    timelineDate: Date,
  },
  { _id: false }
);

/* ---------------- Education ---------------- */

const EducationSchema = new Schema(
  {
    institution: String,
    qualification: String,
    year: String,
  },
  { _id: false }
);

/* ---------------- Employment ---------------- */

const EmploymentHistorySchema = new Schema(
  {
    employer: String,
    jobTitle: String,
    fromDate: String,
    toDate: String,
    reasonForLeaving: String,
  },
  { _id: false }
);

/* ---------------- Reference ---------------- */

const ReferenceSchema = new Schema(
  {
    companyName: String,
    contactName: String,
    email: String,
    telephone: String,
  },
  { _id: false }
);

/* ---------------- Medical ---------------- */

const MedicalItemSchema = new Schema(
  {
    hasCondition: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
  },
  { _id: false }
);

const MedicalSchema = new Schema(
  {
    heartCirculatory: MedicalItemSchema,
    epilepsyDizziness: MedicalItemSchema,
    diabetes: MedicalItemSchema,
    musculoskeletal: MedicalItemSchema,
    sensoryImpairment: MedicalItemSchema,
    mentalHealth: MedicalItemSchema,
    currentMedication: MedicalItemSchema,
    shiftNightWork: MedicalItemSchema,
  },
  { _id: false }
);

/* ================= Employee Application ================= */

const EmployeeApplicationSchema = new Schema(
  {
    // ===== Personal =====

    title: String,
    preferredName: String,

    forenames: {
      type: String,
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },

    gender: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    nationality: String,

    mobile: String,

    emailAddress: {
      type: String,
      lowercase: true,
    },

    availability: String,

    yearsOfExperience: Number,

    profilePhotoMatches: String,

    // ===== Address =====

    addressHistory: [AddressHistorySchema],

    // ===== Right To Work =====

    rightToWork: String,
    rightToLicense: String,
    rtwBasis: String,

    passportNumber: String,
    passportNationality: String,
    passportExpiryDate: Date,

    onlineShareCode: String,
    shareCode: String,
    shareCodeValidityDate: Date,
    shareCodeCheckCompletedDate: Date,

    nationalInsuranceNo: String,

    // ===== SIA =====

    siaLicenceNumber: String,
    siaLicenceStatus: String,
    siaLicenceType: String,
    siaExpiryDate: Date,

    licenseNumber: String,
    licenseExpiryDate: Date,
    categoriesHeld: String,

    // ===== Banking =====

    bankName: String,
    accountHolderName: String,
    accountNumber: String,
    sortCode: String,

    // ===== Emergency =====

    emergencyContactName: String,
    emergencyRelationship: String,
    emergencyDaytimePhone: String,
    emergencyAlternativePhone: String,

    // ===== Education =====

    education: [EducationSchema],

    // ===== Employment =====

    employmentHistory: [EmploymentHistorySchema],

    // ===== References =====

    references: [ReferenceSchema],

    // ===== Medical =====

    medical: MedicalSchema,

    // ===== Declaration =====

    hasConvictions: String,

    consentEmployeeName: String,
    consentSignature: String,
    consentDate: Date,

    consentAgreed: {
      type: Boolean,
      default: false,
    },

    // ===== Documents =====

    documents: {
      passport: String,
      rightToWork: String,
      siaLicence: String,
      drivingLicence: String,
      proofOfAddress: String,
      cv: String,
      dbsCertificate: String,
      other: [String],
    },

    // ===== Admin =====

    applicationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    assignedTo: String,

    notes: String,

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.EmployeeApplication ||
  model("EmployeeApplication", EmployeeApplicationSchema);

