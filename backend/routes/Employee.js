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

router.post("/post-application", employeeAuthMiddleware, postApplication);
router.post("/toggle-favourite", employeeAuthMiddleware, toggleFavouriteJob);
router.get("/get-favourites", employeeAuthMiddleware, fetchFavouriteJobs);

module.exports = router;
