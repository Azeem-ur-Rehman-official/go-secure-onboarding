import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    employeeName: String,
    email: String,
    phone: String,
    dob: String,
    nationality: String,
    passportNumber: String,

    documents: {
      passportCopy: String,
      rightToWork: String,
      cv: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Employee ||
mongoose.model("Employee", EmployeeSchema);