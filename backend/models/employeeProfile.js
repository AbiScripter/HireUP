const mongoose = require("mongoose");

const employeeProfileSchema = new mongoose.Schema({
  fullname: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  mobile: { type: String, trim: true },
  experience: { type: String, trim: true },
  currentPosition: { type: String, trim: true },
  education: { type: String, trim: true },
  topSkills: { type: [String], default: [] },
  resumeUrl: { type: String, trim: true }, // supabase resume url

  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // reference to  employee model
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
