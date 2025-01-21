const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getEmployerData,
  registerEmployer,
  loginEmployer,
  postJob,
  getPostedJobs,
  getJobApplicants,
  fetchJobDetails,
  updateJobStatus,
} = require("../controllers/employer");
const router = express.Router();

router.post("/register-employer", registerEmployer);
router.post("/login-employer", loginEmployer);

//!protected Route
router.get("/employer-data", authMiddleware, getEmployerData);
router.post("/post-job", authMiddleware, postJob);
router.get("/posted-jobs", authMiddleware, getPostedJobs);
router.get("/employer-get-job-details", authMiddleware, fetchJobDetails);
router.put("/update-job-status", authMiddleware, updateJobStatus);
router.get("/view-applicants", authMiddleware, getJobApplicants);

module.exports = router;
