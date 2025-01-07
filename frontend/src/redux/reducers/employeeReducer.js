import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllJobs,
  getEmployeeProfileData,
  loginEmployee,
  registerEmployee,
} from "../../services/api";

// Async Thunk for Employee Registration
export const registerEmployeeThunk = createAsyncThunk(
  "employee/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerEmployee(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

// Async Thunk for Employee Login
export const loginEmployeeThunk = createAsyncThunk(
  "employee/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginEmployee(userData);
      // Saving the token in localstorage
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

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

// Fetch employee profile data
export const fetchEmployeeProfile = createAsyncThunk(
  "profile/fetchProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployeeProfileData();
      return response.data.profile_data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch profile.");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    jobs: [],
    profileData: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
        toast.success(action.payload.msg); // Show success toast
      })
      .addCase(registerEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload); // Show error toast
      })

      // Login
      .addCase(loginEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
        toast.success(action.payload.msg); // Show success toast
      })
      .addCase(loginEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload); // Show error toast
      })

      //Fetch all jobs
      .addCase(fetchJobsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload; // Set the fetched jobs
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture any error
      })

      // fetch profile data
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload; // Set the fetched jobs
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture any error
      });
  },
});

export default employeeSlice.reducer;
