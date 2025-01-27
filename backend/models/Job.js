const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  work_mode: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  no_of_positions: {
    type: Number,
    required: true,
  },
  years_of_experience: {
    type: Number,
    required: true,
  },
  job_status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  employer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer", // reference to  employer model
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
