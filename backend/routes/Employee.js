const express = require("express");
const {
  registerEmployee,
  loginEmployee,
  getAllJobs,
  toggleFavouriteJob,
  getEmployeeBasicDetails,
  getEmployeeProfile,
  updateEmployeeProfile,
  applyToJob,
  getJobDetails,
  getFavouriteJobs,
  getFavouriteJobDetails,
  getAppliedJobs,
  getAppliedJobDetails,
  getApplicationStatus,
  getPaginatedJobs,
} = require("../controllers/employee");

const employeeAuthMiddleware = require("../middlewares/employeeAuthMiddlware");

const router = express.Router();

router.post("/register-employee", registerEmployee);
router.post("/login-employee", loginEmployee);

//!protected Route
router.get("/employee-basics", employeeAuthMiddleware, getEmployeeBasicDetails);

// router.get("/jobs", employeeAuthMiddleware, getAllJobs);
router.post("/job-apply", employeeAuthMiddleware, applyToJob);
router.get("/job-details", employeeAuthMiddleware, getJobDetails);
router.get("/application-status", employeeAuthMiddleware, getApplicationStatus);

router.get("/employee-profile", employeeAuthMiddleware, getEmployeeProfile);
router.put(
  "/update-employee-profile",
  employeeAuthMiddleware,
  updateEmployeeProfile
);

router.get("/favourite-jobs", employeeAuthMiddleware, getFavouriteJobs);
router.post("/toggle-favourite", employeeAuthMiddleware, toggleFavouriteJob);
router.get(
  "/favourite-job-details",
  employeeAuthMiddleware,
  getFavouriteJobDetails
);

router.get("/applied-jobs", employeeAuthMiddleware, getAppliedJobs);
router.get(
  "/applied-job-details",
  employeeAuthMiddleware,
  getAppliedJobDetails
);

router.get("/jobs", employeeAuthMiddleware, getPaginatedJobs);

module.exports = router;
