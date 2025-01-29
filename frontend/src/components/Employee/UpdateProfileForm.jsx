import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { editProfileThunk } from "../../redux/reducers/employee/employeeProfile";

const UpdateProfileForm = ({ initialData, handleClose }) => {
  console.log("INITIAL DATA", initialData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: initialData?.fullname || "",
    email: initialData?.email || "",
    mobile: initialData?.mobile || "",
    experience: initialData?.experience || "",
    currentPosition: initialData?.currentPosition || "",
    education: initialData?.education || "",
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
          name="experience"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Current Position"
          name="currentPosition"
          value={formData.currentPosition}
          onChange={handleChange}
          variant="outlined"
          className="mb-2"
        />

        <TextField
          fullWidth
          label="Education"
          name="education"
          value={formData.education}
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

        <div className="flex items-center gap-2">
          <p className="font-medium text-lg text-gray-700">Resume : </p>
          {initialData?.resumeUrl ? (
            <a
              href={initialData?.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              View Resume
            </a>
          ) : (
            <p className="text-gray-500">No resume uploaded</p>
          )}
        </div>

        <div className="">
          <label className="block font-medium text-gray-700">
            Upload New Resume
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 mb-4"
          />
        </div>
      </Box>

      <button
        type="submit"
        variant="contained"
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md w-full"
      >
        Update Profile
      </button>
    </Box>
  );
};

export default UpdateProfileForm;
