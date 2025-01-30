const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/employer");
const Job = require("../models/Job");
const Application = require("../models/application");

const registerEmployer = async (req, res) => {
  console.log(req);
  try {
    const { username, password, email } = req.body;

    const employer = {
      username: username,
      password: password,
      email: email,
    };

    await Employer.create(employer);
    res.status(200).json({ msg: "Employer Registered successfully " });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email and password backend", email, password);
    const employer = await Employer.findOne({ email });
    console.log(employer);

    if (!employer) {
      return res.status(404).json({ msg: "Employer Not Found" });
    }

    const match = await bcrypt.compare(password, employer.password);

    if (!match) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { employerId: employer._id, email: employer.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // token expiry
    );

    res
      .status(200)
      .json({ msg: "Employer logged in Successfully", token: token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// user data like email,username etc
const getEmployerBasicDetails = async (req, res) => {
  try {
    const employerId = req.employer.employerId; // Get the employerId from the decoded token
    console.log(employerId);
    const employerData = await Employer.findOne({ _id: employerId });

    if (!employerData) {
      return res.status(404).json({ msg: "Employer Not Found" });
    }

    // console.log(employerData);

    res.status(200).json({
      msg: "Employer data fetched Successfully",
      user_data: employerData,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Post job
const postJob = async (req, res) => {
  try {
    const employerId = req.employer.employerId;
    const {
      company_name,
      title,
      description,
      employment_type,
      salary,
      work_mode,
      location,
      no_of_positions,
      years_of_experience,
    } = req.body;

    const job = new Job({
      company_name,
      title,
      description,
      employment_type,
      salary,
      work_mode,
      location,
      no_of_positions,
      years_of_experience,
      employer_id: employerId,
    });

    await job.save();

    res.status(201).json({ msg: "Job Posted Successfully", job });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get posted jobs
const getPostedJobs = async (req, res) => {
  try {
    const employerId = req.employer.employerId; // Get the employerID from the decoded token

    // Fetch only jobs with `job_status: "Active"`
    const jobs = await Job.find({
      employer_id: employerId,
      job_status: "Active",
    });

    res.status(200).json({
      msg: "Posted Jobs fetched Successfully",
      jobs: jobs,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getJobDetails = async (req, res) => {
  try {
    const { job_id } = req.query; // Retrieve job_id from query parameters

    const jobData = await Job.findOne({ _id: job_id });

    if (!jobData) {
      return res.status(404).json({ msg: "No Job Found" });
    }
    res
      .status(200)
      .json({ msg: "Job Details Fetched Successfully", jobData: jobData });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while fetching job data",
    });
  }
};

const getJobApplicants = async (req, res) => {
  try {
    const { job_id } = req.query; // Retrieve job_id from query parameters

    const applicants = await Application.find({ job_id: job_id });

    if (!applicants) {
      res
        .status(200)
        .json({ msg: "No Applicants for this job", applicants: [] });
    }

    res
      .status(200)
      .json({ msg: "Applicants for this job fetched", applicants: applicants });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { job_id, employee_id, application_status } = req.body.params; // Extract data from the request body

    if (!job_id || !employee_id || !application_status) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Find the document by job_id and employee_id and update the status
    const result = await Application.updateOne(
      { job_id, employee_id }, // Query to find the document
      { $set: { application_status } } // Update the status field
    );

    // Check if the document was updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Application not found" });
    }

    res
      .status(200)
      .json({ msg: "Application status updated successfully", result });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

//not deleting the job just changing the job_status because if we delete the job data entirely all the databases which have this job data results error
const deleteJob = async (req, res) => {
  try {
    const { job_id } = req.body.params; // Extract job_id from request body

    //Mark the job as Inactive
    const updatedJob = await Job.findOneAndUpdate(
      { _id: job_id },
      { job_status: "Inactive" },
      { new: true } // Return the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }

    // Update all related applications
    const updatedApplications = await Application.updateMany(
      { job_id: job_id }, // Find all applications for the given job
      { job_status: "Inactive" } // Update their job_status to Inactive
    );

    res.status(200).json({
      msg: "Job and associated applications updated successfully",
      job: updatedJob,
      applicationsUpdated: updatedApplications.modifiedCount, // Number of applications updated
    });
  } catch (error) {
    console.error("Error updating job and applications:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  registerEmployer,
  loginEmployer,
  getEmployerBasicDetails,
  postJob,
  getPostedJobs,
  getJobApplicants,
  getJobDetails,
  updateApplicationStatus,
  deleteJob,
};
