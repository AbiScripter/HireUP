import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { postJobThunk } from "../../redux/reducers/employer/employerJob";

const PostJobForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company_name: "",
    title: "",
    description: "",
    employment_type: "",
    salary: "",
    work_mode: "",
    location: "",
    no_of_positions: "",
    years_of_experience: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic form validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });

    // if there are no erros: post the job
    if (Object.keys(newErrors).length === 0) {
      dispatch(postJobThunk(formData));
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form
      className="w-full max-w-lg mx-auto p-6 bg-white shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">Post Job</h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <TextField
            fullWidth
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            error={!!errors.company_name}
            helperText={errors.company_name}
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Job Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormControl fullWidth error={!!errors.employment_type}>
              <InputLabel>Employment Type</InputLabel>
              <Select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
              </Select>
            </FormControl>
            {errors.employment_type && (
              <p className="text-red-500 text-sm">{errors.employment_type}</p>
            )}
          </div>

          <div>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormControl fullWidth error={!!errors.work_mode}>
              <InputLabel>Work Mode</InputLabel>
              <Select
                name="work_mode"
                value={formData.work_mode}
                onChange={handleChange}
              >
                <MenuItem value="On-site">On-site</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
            {errors.work_mode && (
              <p className="text-red-500 text-sm">{errors.work_mode}</p>
            )}
          </div>

          <div>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TextField
              fullWidth
              label="Number of Positions"
              name="no_of_positions"
              type="number"
              value={formData.no_of_positions}
              onChange={handleChange}
              error={!!errors.no_of_positions}
              helperText={errors.no_of_positions}
            />
          </div>

          <div>
            <TextField
              fullWidth
              label="Years of Experience"
              name="years_of_experience"
              type="number"
              value={formData.years_of_experience}
              onChange={handleChange}
              error={!!errors.years_of_experience}
              helperText={errors.years_of_experience}
            />
          </div>
        </div>

        <div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Post Job
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostJobForm;
