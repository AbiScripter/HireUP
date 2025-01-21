import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobs } from "../../../services/api";
import { toast } from "react-toastify";

// Fetch all jobs for the employees
export const fetchJobsThunk = createAsyncThunk(
  "jobs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllJobs();
      if (response.data.jobs.length === 0) {
        return rejectWithValue("No jobs found.");
      }
      return response.data.jobs; // Return the list of jobs
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch jobs.");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch all jobs
      .addCase(fetchJobsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.jobs = action.payload; // Set the fetched jobs
        state.loading = false;
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default employeeSlice.reducer;
