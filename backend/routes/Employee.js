const express = require("express");
const {
  registerEmployee,
  loginEmployee,
  getAllJobs,
  getEmployeeData,
  getEmployeeProfileData,
  addEmployeeProfileData,
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

router.post(
  "/add-employee-profile-data",
  employeeAuthMiddleware,
  addEmployeeProfileData
);

module.exports = router;
