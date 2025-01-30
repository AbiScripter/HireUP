const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerEmployer,
  loginEmployer,
  postJob,
  getPostedJobs,
  getJobApplicants,
  getEmployerBasicDetails,
  getJobDetails,
  updateApplicationStatus,
  deleteJob,
} = require("../controllers/employer");
const router = express.Router();

router.post("/register-employer", registerEmployer);
router.post("/login-employer", loginEmployer);

//!protected Route
router.get("/employer-basics", authMiddleware, getEmployerBasicDetails);
router.get("/employer-job-details", authMiddleware, getJobDetails);

router.post("/post-job", authMiddleware, postJob);
router.put("/delete-job", authMiddleware, deleteJob);

router.get("/posted-jobs", authMiddleware, getPostedJobs);
router.get("/applicants", authMiddleware, getJobApplicants);

router.put(
  "/update-application-status",
  authMiddleware,
  updateApplicationStatus
);

module.exports = router;
