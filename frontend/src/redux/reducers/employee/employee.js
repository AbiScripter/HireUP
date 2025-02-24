import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPaginatedJobs } from "../../../services/api";

//FetchJobs
export const fetchPaginatedJobs = createAsyncThunk(
  "jobs/fetchPaginatedJobs",
  async ({ page, filters }, { rejectWithValue }) => {
    try {
      console.log("redux filter", page, filters);
      const response = await getPaginatedJobs({ page, ...filters });
      return response.data;
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
    filters: {
      employment_type: [],
      salary: [],
      work_mode: [],
      search_term: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1; // Reset to first page when filters change
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs;
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

export const { setFilters } = employeeSlice.actions;

export default employeeSlice.reducer;
