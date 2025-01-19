const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Reference to the job schema
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to the employee schema
    required: true,
  },
  job_title: {
    type: String,
  },
  company_name: {
    type: String,
  },
  fullname: { type: String, required: true }, // Employee details
  resumeUrl: { type: String, required: true }, // Resume link
  topSkills: { type: [String], default: [] },
  applied_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Rejected", "Accepted"],
    default: "Applied",
  },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
