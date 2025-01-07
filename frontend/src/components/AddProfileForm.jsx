import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { uploadResumeToSupabase } from "../services/supabaseClient";
import { addEmployeeProfileData } from "../services/api";
import { toast } from "react-toastify";

const AddProfileForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    yearsOfExperience: "",
    location: "",
    topSkills: [], // Display as comma-separated string
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

    let resumeUrl = null;
    if (formData.resume) {
      resumeUrl = await uploadResumeToSupabase(formData.resume);
    }

    const data = {
      ...formData,
      topSkills:
        formData.topSkills.length > 0
          ? formData.topSkills.split(",").map((skill) => skill.trim())
          : [],
      resumeUrl,
    };

    // Remove the 'resume' field before sending it to the backend (since it's not in the schema)
    delete data.resume;

    console.log("Submitted Data:", data);

    try {
      const response = await addEmployeeProfileData(data);
      toast.success(response.msg);
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Box
      component="form"
      className="max-w-xl mx-auto p-6 rounded-lg shadow-lg bg-white"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" className="font-bold">
        Add Profile
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
          required
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
        Add Profile
      </Button>
    </Box>
  );
};

export default AddProfileForm;
