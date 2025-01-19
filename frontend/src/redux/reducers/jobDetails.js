import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchAppliedJobs,
  fetchJobDetails,
  fetchJobStatus,
  jobApply,
} from "../../services/api";

export const getJobDetailsThunk = createAsyncThunk(
  "employer/get-jobDetails",
  async (job_id, { rejectWithValue }) => {
    try {
      console.log("Data inside reduxxxx", job_id);
      const data = { job_id: job_id };
      console.log(data);
      const response = await fetchJobDetails(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const getAppliedJobsThunk = createAsyncThunk(
  "employer/get-applied",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAppliedJobs();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const getJobStatusThunk = createAsyncThunk(
  "employer/get-jobStatus",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Data inside reduxxxx", data);
      // const data = { job_id: job_id };
      const response = await fetchJobStatus(data);
      console.log("response Status Redux :", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const jobApplyThunk = createAsyncThunk(
  "profile/postApplication",
  async (passedData, { rejectWithValue }) => {
    try {
      console.log("Data inside redux", passedData);
      // Prepare the data to send
      // const data = {
      //   ...formData,
      //   // topSkills: topSkills,
      //   // resumeUrl: resumeUrl,
      // };

      const data = {
        job_id: passedData,
      };

      const response = await jobApply(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || "Failed to Post Job."
      );
    }
  }
);

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState: {
    appliedJobs: [],
    jobPageData: null,
    loading: false,
    error: null,
    currentJobStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get job details
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

      //Apply for Job
      .addCase(jobApplyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(jobApplyThunk.fulfilled, (state, action) => {
        const job_id = action.meta.arg; // Get the job ID that was toggled
        state.appliedJobs.push(job_id);
        state.loading = false;
        toast.success(action.payload.msg);
      })
      .addCase(jobApplyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Get Applied Jobs
      .addCase(getAppliedJobsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppliedJobsThunk.fulfilled, (state, action) => {
        state.appliedJobs = action.payload.appliedJobs;
        state.loading = false;
        toast.success(action.payload.msg);
      })
      .addCase(getAppliedJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //Get Job Status
      .addCase(getJobStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobStatusThunk.fulfilled, (state, action) => {
        state.currentJobStatus = action.payload.status;
        state.loading = false;
        toast.success(action.payload.msg);
      })
      .addCase(getJobStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default jobDetailsSlice.reducer;
