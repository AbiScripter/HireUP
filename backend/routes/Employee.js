const express = require("express");
const {
  registerEmployee,
  loginEmployee,
  getAllJobs,
  getEmployeeData,
  getEmployeeProfileData,
  updateEmployeeProfileData,
  postApplication,
  toggleFavouriteJob,
  fetchFavouriteJobs,
  fetchJobDetails,
  jobApply,
  fetchJobStatus,
  fetchAppliedJobs,
  fetchFavouriteJobDetails,
  fetchAppliedJobDetails,
} = require("../controllers/employee");
const employeeAuthMiddleware = require("../middlewares/employeeAuthMiddlware");

const router = express.Router();

router.post("/register-employee", registerEmployee);
router.post("/login-employee", loginEmployee);

//!protected Route
router.get("/employee-data", employeeAuthMiddleware, getEmployeeData);
router.get("/jobs", employeeAuthMiddleware, getAllJobs);
router.get(
  "/employee-profile-data",
  employeeAuthMiddleware,
  getEmployeeProfileData
);

router.put(
  "/update-employee-profile-data",
  employeeAuthMiddleware,
  updateEmployeeProfileData
);

router.post("/job-apply", employeeAuthMiddleware, jobApply);
router.post("/toggle-favourite", employeeAuthMiddleware, toggleFavouriteJob);
router.get("/get-favourites", employeeAuthMiddleware, fetchFavouriteJobs);
router.get(
  "/get-favourites-details",
  employeeAuthMiddleware,
  fetchFavouriteJobDetails
);
router.get("/get-applied", employeeAuthMiddleware, fetchAppliedJobs);
router.get("/get-job-details", employeeAuthMiddleware, fetchJobDetails);
router.get(
  "/get-applied-details",
  employeeAuthMiddleware,
  fetchAppliedJobDetails
);
router.get("/get-job-status", employeeAuthMiddleware, fetchJobStatus);

module.exports = router;
