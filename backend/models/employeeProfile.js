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
  },
});

const EmployeeProfile = mongoose.model(
  "EmployeeProfile",
  employeeProfileSchema
);

module.exports = EmployeeProfile;
