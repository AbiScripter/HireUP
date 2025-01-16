import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { editProfileThunk } from "../redux/reducers/employeeProfileReducer";

const UpdateProfileForm = ({ initialData, handleClose }) => {
  console.log("INITIAL DATA", initialData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: initialData?.fullname || "",
    email: initialData?.email || "",
    mobile: initialData?.mobile || "",
    yearsOfExperience: initialData?.yearsOfExperience || "",
    location: initialData?.location || "",
    topSkills: initialData?.topSkills.join(", ") || "",
    resumeUrl: initialData?.resumeUrl || "",
    resume: null, // For file upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(editProfileThunk(formData));
    handleClose();
  };

  return (
    <Box
      component="form"
      className="max-w-xl mx-auto p-6 rounded-lg shadow-lg bg-white"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" className="font-bold">
        Update Profile
      </Typography>

      <Box className="space-y-4 mt-6">
        <TextField
          fullWidth
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Top Skills (comma-separated)"
          name="topSkills"
          value={formData.topSkills}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <div>
          <p className="font-medium text-lg text-gray-700">Resume:</p>
          {initialData?.resumeUrl ? (
            <a
              href={initialData?.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resume
            </a>
          ) : (
            <p className="text-gray-500">No resume uploaded</p>
          )}
        </div>

        <div className="">
          <label className="block font-medium text-gray-700">
            Upload Resume
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 mb-4"
          />
        </div>
      </Box>

      <Button
        type="submit"
        variant="contained"
        className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default UpdateProfileForm;
