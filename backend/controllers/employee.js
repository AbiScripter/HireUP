const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Job = require("../models/Job");
const Employee = require("../models/employee");
const EmployeeProfile = require("../models/employeeProfile");

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

    // Generate JWT token
    const token = jwt.sign(
      { employeeId: employee._id, email: employee.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // token expiry
    );

    res
      .status(200)
      .json({ msg: "Employee logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// user data like email,username etc
const getEmployeeData = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId; // Get the user ID from the decoded token
    console.log(employeeId);
    const employeeData = await Employee.findOne({ _id: employeeId });

    if (!employeeData) {
      return res.status(404).json({ msg: "Employee Not Found" });
    }

    // console.log(employerData);

    res.status(200).json({
      msg: "Employee data fetched Successfully",
      user_data: employeeData,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get posted jobs
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
const getEmployeeProfileData = async (req, res) => {
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

// Add employee profile data
const addEmployeeProfileData = async (req, res) => {
  try {
    const employeeId = req.employee.employeeId;
    console.log(employeeId);
    const {
      fullname,
      email,
      mobile,
      yearsOfExperience,
      location,
      topSkills,
      resumeUrl,
    } = req.body;

    const profileData = new EmployeeProfile({
      fullname,
      email,
      mobile,
      yearsOfExperience,
      location,
      topSkills,
      resumeUrl,
      employee_id: employeeId,
    });

    await profileData.save();

    res.status(200).json({
      msg: "Profile Data Added Successfully",
      profile_data: profileData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getEmployeeData,
  getAllJobs,
  getEmployeeProfileData,
  addEmployeeProfileData,
};
