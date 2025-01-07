const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Middleware to hash the password before saving to DB
employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password isn't modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
