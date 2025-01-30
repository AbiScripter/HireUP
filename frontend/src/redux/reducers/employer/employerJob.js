import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteJob,
  getApplicants,
  getEmployerBasicDetails,
  getEmployerJobDetails,
  getPostedJobs,
  postJob,
  updateApplicationStatus,
} from "../../../services/api";

export const getEmployerBasicDetailsThunk = createAsyncThunk(
  "employer/get-employer-basics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployerBasicDetails();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const getPostedJobsThunk = createAsyncThunk(
  "employer/get-posted-jobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPostedJobs();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const postJobThunk = createAsyncThunk(
  "employer/post-job",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postJob(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const deleteJobThunk = createAsyncThunk(
  "employer/delete-job",
  async (job_id, { rejectWithValue }) => {
    console.log("data inside delete redux", job_id);
    try {
      const data = { job_id: job_id };
      const response = await deleteJob(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

export const getJobDetailsThunk = createAsyncThunk(
  "employer/get-jobs",
  async (job_id, { rejectWithValue }) => {
    try {
      const data = { job_id: job_id };
      const response = await getEmployerJobDetails(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

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

export const updateApplicationStatusThunk = createAsyncThunk(
  "employer/update-application-status",
  async (data, { rejectWithValue }) => {
    try {
      console.log("job status update reduxxxx", data);
      console.log(data);
      const response = await updateApplicationStatus(data);

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
    basicDetails: null,
    postedJobs: [],
    jobPageData: null,
    applicantsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getEmployerBasicDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployerBasicDetailsThunk.fulfilled, (state, action) => {
        state.basicDetails = action.payload.user_data;
        state.loading = false;
      })
      .addCase(getEmployerBasicDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //get jobs
      .addCase(getPostedJobsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostedJobsThunk.fulfilled, (state, action) => {
        state.postedJobs = action.payload.jobs;
        state.loading = false;
      })
      .addCase(getPostedJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //post a job
      .addCase(postJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJobThunk.fulfilled, (state, action) => {
        state.postedJobs = [...state.postedJobs, action.payload.job];
        toast.success(action.payload.msg);
        state.loading = false;
      })
      .addCase(postJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //delete job
      .addCase(deleteJobThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.postedJobs = state.postedJobs.filter(
          (job) => job._id !== action.payload.job._id
        );
        toast.success(action.payload.msg);
        state.loading = false;
      })
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //get job details
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

      //get job applicants
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

      //update application status
      .addCase(updateApplicationStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicationStatusThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateApplicationStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default employerSlice.reducer;
