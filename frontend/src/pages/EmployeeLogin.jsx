import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { loginEmployeeThunk } from "../redux/reducers/employeeReducer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.employee);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginEmployeeThunk(formData))
      .unwrap() // Wait for the thunk to resolve
      .then(() => {
        // Reset formData after success
        setFormData({ email: "", password: "" });
        window.location.href = "/employee/dashboard";
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-center text-3xl font-bold text-purple-500 mb-8">
          Job Seeker Login
        </h2>

        <div className="mb-6">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          Login
        </Button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/employee/signup"
              className="text-purple-500 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmployeeLogin;
