import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getAllJobs } from "../../../services/api";
import { toast } from "react-toastify";
import { getPaginatedJobs } from "../../../services/api";

// Fetch all jobs for the employees
// export const fetchJobsThunk = createAsyncThunk(
//   "jobs/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       // const response = await getAllJobs();
//       if (response.data.jobs.length === 0) {
//         return rejectWithValue("No jobs found.");
//       }
//       return response.data.jobs; // Return the list of jobs
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to fetch jobs.");
//     }
//   }
// );

export const fetchPaginatedJobs = createAsyncThunk(
  "jobs/fetchPaginatedJobs",
  async (page, { rejectWithValue }) => {
    try {
      console.log("in paginatred redx", page);
      const data = { page: page };
      const response = await getPaginatedJobs(data);
      if (response.data.jobs.length === 0) {
        return rejectWithValue("No jobs found.");
      }
      return response.data; // Return the list of jobs
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch jobs.");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    jobs: [],
    totalJobs: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch all jobs
      // .addCase(fetchJobsThunk.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchJobsThunk.fulfilled, (state, action) => {
      //   state.jobs = action.payload; // Set the fetched jobs
      //   state.loading = false;
      // })
      // .addCase(fetchJobsThunk.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      //   toast.error(state.error);
      // });

      .addCase(fetchPaginatedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs; // Set the fetched jobs
        state.totalJobs = action.payload.totalJobs;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchPaginatedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default employeeSlice.reducer;
