import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  applyToJob,
  getApplicationStatus,
  getAppliedJobDetails,
  getAppliedJobs,
  getJobDetails,
} from "../../../services/api";

export const getJobDetailsThunk = createAsyncThunk(
  "employee/get-jobDetails",
  async (job_id, { rejectWithValue }) => {
    try {
      const data = { job_id: job_id };
      console.log(data);
      const response = await getJobDetails(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const getAppliedJobsThunk = createAsyncThunk(
  "employee/get-applied",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAppliedJobs();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const getApplicationStatusThunk = createAsyncThunk(
  "employee/get-application-status",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Status thunk Data", data);
      // const data = { job_id: job_id };
      const response = await getApplicationStatus(data);
      console.log("response Status Redux :", response);
      return response.data;
    } catch (error) {
      console.log("status redux errror", error);
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
      // Prepare the data to send
      // const data = {
      //   ...formData,
      //   // topSkills: topSkills,
      //   // resumeUrl: resumeUrl,
      // };

      const data = passedData;
      console.log("data for jobApply", data);
      const response = await applyToJob(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || "Failed to Post Job."
      );
    }
  }
);

export const fetchAppliedJobsDetailsThunk = createAsyncThunk(
  "employee/fetchAppliedJobDetails",
  async (employee_id, { rejectWithValue }) => {
    try {
      console.log("data insdie fetchapplyredux", employee_id);
      const data = { employee_id: employee_id };
      const response = await getAppliedJobDetails(data);
      console.log(response);
      return response.data; // Full job details array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Failed to fetch Applied  Jobs."
      );
    }
  }
);

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState: {
    appliedJobs: [],
    appliedJobsDetails: [],
    jobPageData: null,
    loading: false,
    error: null,
    currentApplicationStatus: "",
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
        state.currentApplicationStatus = "Applied";

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

      //Get application Status
      .addCase(getApplicationStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationStatusThunk.fulfilled, (state, action) => {
        state.currentApplicationStatus = action.payload.status;
        state.loading = false;
      })
      .addCase(getApplicationStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //applied job details - applied jobs page
      .addCase(fetchAppliedJobsDetailsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppliedJobsDetailsThunk.fulfilled, (state, action) => {
        state.appliedJobsDetails = action.payload.jobsData;
        state.loading = false;
      })
      .addCase(fetchAppliedJobsDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobDetailsSlice.reducer;
