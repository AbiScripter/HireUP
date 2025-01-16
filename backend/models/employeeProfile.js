const mongoose = require("mongoose");

const employeeProfileSchema = new mongoose.Schema({
  fullname: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  mobile: { type: String, trim: true },
  yearsOfExperience: { type: Number, min: 0 },
  location: { type: String, trim: true },
  topSkills: { type: [String], default: [] },
  resumeUrl: { type: String, trim: true }, // supabase url
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // reference to  employer model
    required: true,
    unique: true,
  },
  favouriteJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

const EmployeeProfile = mongoose.model(
  "EmployeeProfile",
  employeeProfileSchema
);

module.exports = EmployeeProfile;
