const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Job = require("../models/Job");
const Employee = require("../models/employee");
const EmployeeProfile = require("../models/employeeProfile");
const Application = require("../models/application");

const registerEmployee = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const employee = {
      username: username,
      password: password,
      email: email,
    };

    await Employee.create(employee);
    res.status(200).json({ msg: "Employee Registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ msg: "Employee Not Found" });
    }

    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: password does not match" });
    }

    // Check if EmployeeProfile exists
    let profile = await EmployeeProfile.findOne({ employee_id: employee._id });

    if (!profile) {
      // Create a default profile if it doesn't exist
      profile = new EmployeeProfile({
        fullname: employee.username, // Default fullname from username
        email: employee.email, // Email from employee record
        mobile: "", // Default empty fields
        yearsOfExperience: 0,
        location: "",
        topSkills: [],
        resumeUrl: "",
        employee_id: employee._id, // Associate with the employee
      });

      await profile.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { employeeId: employee._id, email: employee.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // token expiry
    );

    res.status(200).json({
      msg: "Employee logged in successfully",
      token: token,
      profile: profile, // Send back the profile data for use in the frontend
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// user data like email,username etc
const getEmployeeBasicDetails = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId; // Get the user ID from the decoded token
    const employeeData = await Employee.findOne({ _id: employeeId });

    if (!employeeData) {
      return res.status(404).json({ msg: "Employee Not Found" });
    }

    res.status(200).json({
      msg: "Employee data fetched Successfully",
      employeeData: employeeData,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get all posted jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      msg: "Jobs fetched Successfully",
      jobs: jobs,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

// get employee profile data
const getEmployeeProfile = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;
    const profileData = await EmployeeProfile.findOne({
      employee_id: employeeId,
    });

    res.status(200).json({
      msg: "Profile Data fetched Successfully",
      profile_data: profileData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const updateEmployeeProfile = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;

    const updatedProfile = await EmployeeProfile.findOneAndUpdate(
      { employee_id: employeeId },
      { ...req.body, employee_id: employeeId },
      { new: true } // This ensures the updated document is returned
    );

    res.status(200).json({
      msg: "Profile Data updated Successfully",
      profile_data: updatedProfile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;
    const profileData = await EmployeeProfile.findOne({
      employee_id: employeeId,
    });

    //receive job_status and add
    const { job_id, company_name, job_title } = req.body;

    const { fullname, resumeUrl } = profileData;

    if (!fullname) {
      return res.status(404).json({
        msg: "FullName Not Provided, Please update it in Profile Page",
      });
    }

    if (!resumeUrl) {
      return res
        .status(404)
        .json({ msg: "Resume Not Provided, Please update it in Profile Page" });
    }

    const applicationData = new Application({
      fullname: fullname,
      resumeUrl: resumeUrl,
      job_title: job_title,
      company_name: company_name,
      job_id: job_id,
      employee_id: employeeId,
    });

    // saving to application model
    await applicationData.save();

    //adding to applied jobs in employeeProfile Model
    await EmployeeProfile.updateOne(
      { employee_id: employeeId },
      { $addToSet: { appliedJobs: job_id } }
    );

    res.status(200).json({
      msg: "Job Applied Successfully",
      application_data: applicationData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getApplicationStatus = async (req, res) => {
  const { employee_id, job_id } = req.query; // Extract the query parameters

  // Validate input
  if (!employee_id || !job_id) {
    return res.status(400).json({ error: "employeeId and jobId are required" });
  }

  try {
    // Find the job application by employeeId and jobId
    const application = await Application.findOne({
      employee_id: employee_id,
      job_id: job_id,
    });

    if (!application) {
      return res.json({
        status: "",
        msg: "No application found for this job and employee",
      });
    }

    // Return the status field
    res.json({ status: application.application_status });
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const toggleFavouriteJob = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId; // Extract from authenticated request (e.g., via JWT)
    const { job_id } = req.body;

    // Find the employee profile
    const employeeProfile = await EmployeeProfile.findOne({
      employee_id: employeeId,
    });

    if (!employeeProfile) {
      return res.status(404).json({ msg: "Employee profile not found" });
    }

    if (employeeProfile.favouriteJobs.includes(job_id)) {
      // Remove the jobId from favourites
      await EmployeeProfile.updateOne(
        { employee_id: employeeId },
        { $pull: { favouriteJobs: job_id } }
      );
      return res.status(200).json({ msg: "Job removed from favourites" });
    } else {
      // Add the jobId to favourites
      await EmployeeProfile.updateOne(
        { employee_id: employeeId },
        { $addToSet: { favouriteJobs: job_id } }
      );
      return res.status(200).json({ msg: "Job added to favourites" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ msg: "An error occurred while toggling favourite job" });
  }
};

const getFavouriteJobs = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;

    // Using Mongoose projection to fetch only the favouriteJobs field
    const employeeProfile = await EmployeeProfile.findOne(
      { employee_id: employeeId },
      "favouriteJobs" // Projection: only fetch the favouriteJobs field
    );

    if (!employeeProfile) {
      return res.status(404).json({ msg: "Employee profile not found" });
    }

    res.status(200).json({ favouriteJobs: employeeProfile.favouriteJobs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "An error occurred while fetching favourite jobs",
    });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;

    // Using Mongoose projection to fetch only the favouriteJobs field
    const employeeProfile = await EmployeeProfile.findOne(
      { employee_id: employeeId },
      "appliedJobs" // Projection: only fetch the favouriteJobs field
    );

    if (!employeeProfile) {
      return res.status(404).json({ msg: "Employee profile not found" });
    }

    res.status(200).json({ appliedJobs: employeeProfile.appliedJobs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "An error occurred while fetching applied jobs",
    });
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

const getFavouriteJobDetails = async (req, res) => {
  try {
    const { jobIds } = req.query; // Array of job IDs
    const jobsData = await Job.find({ _id: { $in: jobIds } }); // Fetch matching jobs
    res.status(200).json({
      msg: "Favourite Job Details Fetched Successfully",
      jobsData: jobsData,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Favourite Job Details" });
  }
};

const getAppliedJobDetails = async (req, res) => {
  try {
    const { employee_id } = req.query; // Array of job IDs

    const jobsData = await Application.find({ employee_id: employee_id }); // Fetch matching jobs
    res.status(200).json({
      msg: "Applied Job Details Fetched Successfully",
      jobsData: jobsData,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Applied Job Details" });
  }
};

const getPaginatedJobs = async (req, res) => {
  try {
    const { page } = req.query || 1; // Default to page 1
    const limit = 10;
    const skip = (Number(page) - 1) * limit;
    console.log("backend page", page);

    const totalJobs = await Job.countDocuments();
    const jobs = await Job.find().skip(skip).limit(limit); // Fetch jobs for the current page

    res.status(200).json({
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getEmployeeBasicDetails,
  getAllJobs,
  getEmployeeProfile,
  updateEmployeeProfile,
  applyToJob,
  toggleFavouriteJob,
  getFavouriteJobs,
  getAppliedJobs,
  getJobDetails,
  getApplicationStatus,
  getFavouriteJobDetails,
  getAppliedJobDetails,
  getPaginatedJobs,
};
