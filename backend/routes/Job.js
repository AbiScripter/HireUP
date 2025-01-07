const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getEmployerData,
  registerEmployer,
  loginEmployer,
} = require("../controllers/employer");
const router = express.Router();

router.post("/register-employer", registerEmployer);
router.post("/login-employer", loginEmployer);

//!protected Route
router.get("/employer-data", authMiddleware, getEmployerData);

module.exports = router;
