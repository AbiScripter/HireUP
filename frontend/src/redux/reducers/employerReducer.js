import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getApplicants,
  loginEmployer,
  registerEmployer,
} from "../../services/api";

// Async Thunk for Employer Registration
export const registerEmployerThunk = createAsyncThunk(
  "employer/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerEmployer(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

// Async Thunk for Employee Registration
export const loginEmployerThunk = createAsyncThunk(
  "employer/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginEmployer(userData);
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

// Async Thunk for Employee Registration
export const getJobApplicantsThunk = createAsyncThunk(
  "employer/view-applicants",
  async (job_id, { rejectWithValue }) => {
    try {
      console.log("Data inside reduxxxx", job_id);
      const data = { job_id: job_id };
      console.log(data);
      const response = await getApplicants(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

const employerSlice = createSlice({
  name: "employer",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerEmployerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
        toast.success(action.payload.msg);
      })
      .addCase(registerEmployerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Login
      .addCase(loginEmployerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmployerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
        toast.success(action.payload.msg);
      })
      .addCase(loginEmployerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default employerSlice.reducer;
