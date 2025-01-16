import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchJobDetails, jobApply } from "../../services/api";

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
    jobPageData: null,
    loading: false,
    error: null,
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
        state.loading = false;
        toast.success(action.payload.msg);
      })
      .addCase(jobApplyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default jobDetailsSlice.reducer;
