import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getFavouriteJobDetails,
  getFavouriteJobs,
  toggleFavouriteJob,
} from "../../../services/api";

//Favourite Jobs
export const fetchFavouritesThunk = createAsyncThunk(
  "profile/fetch-favourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFavouriteJobs();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Failed to fetch favourites"
      );
    }
  }
);

// Toggle Favourites
export const toggleFavouritesThunk = createAsyncThunk(
  "profile/toggle-favourite",
  async (job_id, { rejectWithValue }) => {
    try {
      const data = {
        job_id,
      };
      const response = await toggleFavouriteJob(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Failed to toggle favouriteJobs."
      );
    }
  }
);

// Fetch Favourite Job Details
export const fetchFavouriteJobDetailsThunk = createAsyncThunk(
  "jobFavourite/fetchDetails",
  async (jobIds, { rejectWithValue }) => {
    try {
      if (!jobIds || jobIds.length === 0) {
        return { jobsData: [] }; // Return an empty response to avoid backend call
      }
      const data = { jobIds: jobIds };
      const response = await getFavouriteJobDetails(data);
      console.log(response);
      return response.data; // Full job details array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Failed to fetch favouriteJobs."
      );
    }
  }
);

const jobFavouriteSlice = createSlice({
  name: "jobFavourite",
  initialState: {
    favouriteJobs: [],
    favouriteJobDetails: [], // Full job details
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch Favourite Jobs
      .addCase(fetchFavouritesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavouritesThunk.fulfilled, (state, action) => {
        state.favouriteJobs = action.payload.favouriteJobs;
        state.loading = false;
      })
      .addCase(fetchFavouritesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch favourites";
        toast.error(state.error);
      })

      //Toggle Favourite Jobs
      .addCase(toggleFavouritesThunk.pending, (state) => {
        state.loading = true; // Indicate that a toggle operation is in progress
        state.error = null;
      })
      .addCase(toggleFavouritesThunk.fulfilled, (state, action) => {
        const job_id = action.meta.arg; // Get the job ID that was toggled
        const index = state.favouriteJobs.indexOf(job_id);

        if (index !== -1) {
          // Remove the job ID if it exists in favourites
          state.favouriteJobs.splice(index, 1);
        } else {
          // Add the job ID if it doesn't exist in favourites
          state.favouriteJobs.push(job_id);
        }

        state.loading = false;
        // toast.success(action.payload.msg || "Favourites updated successfully!");
      })
      .addCase(toggleFavouritesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      //Fetch Favourite Job Details
      .addCase(fetchFavouriteJobDetailsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavouriteJobDetailsThunk.fulfilled, (state, action) => {
        state.favouriteJobDetails = action.payload.jobsData;
        state.loading = false;
      })
      .addCase(fetchFavouriteJobDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobFavouriteSlice.reducer;
