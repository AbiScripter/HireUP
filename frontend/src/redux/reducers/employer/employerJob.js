import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getApplicants,
  getJobDetails,
  updateJobStatus,
} from "../../../services/api";

// Async Thunk for Employee Registration
export const getJobDetailsThunk = createAsyncThunk(
  "employer/get-jobs",
  async (job_id, { rejectWithValue }) => {
    try {
      console.log("job Details reduxxxx", job_id);
      const data = { job_id: job_id };
      const response = await getJobDetails(data);
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
      console.log("job applicants reduxxxx", job_id);
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

// Async Thunk for Employee Registration
export const updateJobStatusThunk = createAsyncThunk(
  "employer/update-status",
  async (data, { rejectWithValue }) => {
    try {
      console.log("job status update reduxxxx", data);
      console.log(data);
      const response = await updateJobStatus(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

const employerSlice = createSlice({
  name: "employerJob",
  initialState: {
    jobPageData: null,
    applicantsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobDetailsThunk.fulfilled, (state, action) => {
        state.jobPageData = action.payload.jobData;
        state.loading = false;
      })
      .addCase(getJobDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      .addCase(getJobApplicantsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobApplicantsThunk.fulfilled, (state, action) => {
        state.applicantsData = action.payload.applicants;
        state.loading = false;
      })
      .addCase(getJobApplicantsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      .addCase(updateJobStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJobStatusThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateJobStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default employerSlice.reducer;
