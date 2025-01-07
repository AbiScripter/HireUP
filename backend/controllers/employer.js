const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/employer");
const Job = require("../models/Job");

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
    const employer = await Employer.findOne({ email });

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
const getEmployerData = async (req, res) => {
  try {
    const employerId = req.employer.employerId; // Get the user ID from the decoded token
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
    const employerId = req.employer.employerId; // Get the user ID from the decoded token

    const jobs = await Job.find({ employer_id: employerId });

    res.status(200).json({
      msg: "Posted Jobs fetched Successfully",
      jobs: jobs,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  registerEmployer,
  loginEmployer,
  getEmployerData,
  postJob,
  getPostedJobs,
};
