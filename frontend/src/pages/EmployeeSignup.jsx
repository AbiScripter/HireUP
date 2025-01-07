import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerEmployeeThunk } from "../redux/reducers/employeeReducer";
import Loader from "../components/Loader";

const EmployeeSignup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.employee);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerEmployeeThunk(formData))
      .unwrap() // Wait for the thunk to resolve
      .then(() => {
        // Reset formData after success
        setFormData({ username: "", email: "", password: "" });
      })
      .catch((error) => {
        // Handle error (optional)
        console.error(error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-center text-3xl font-bold text-purple-500 mb-8">
          Job Seeker Sign Up
        </h2>

        <div className="mb-6">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mb-6"
          />
        </div>

        <div className="mb-6">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mb-6"
          />
        </div>

        <div className="mb-6">
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-6"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          className="w-full py-3 text-lg"
        >
          Sign Up
        </Button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/employee/login"
              className="text-purple-500 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmployeeSignup;
