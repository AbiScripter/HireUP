import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchFavouriteJobs,
  getEmployeeProfileData,
  toggleFavouriteJob,
  updateEmployeeProfileData,
} from "../../services/api";
import { uploadResumeToSupabase } from "../../services/supabaseClient";

// Fetch employee profile data
export const fetchProfileThunk = createAsyncThunk(
  "profile/fetchProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployeeProfileData();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch profile.");
    }
  }
);

export const editProfileThunk = createAsyncThunk(
  "profile/editProfile",
  async (formData, { rejectWithValue }) => {
    try {
      let topSkills = [];
      let resumeUrl = formData.resumeUrl;

      // Process topSkills
      if (formData.topSkills.length > 0) {
        topSkills = formData.topSkills.split(",").map((skill) => skill.trim());
      }

      // Upload resume if provided
      if (formData.resume) {
        resumeUrl = await uploadResumeToSupabase(formData.resume);

        if (!resumeUrl) {
          throw new Error("Failed to upload resume. Please try again.");
        }
      }

      const data = {
        ...formData,
        topSkills: topSkills,
        resumeUrl: resumeUrl,
      };

      // Remove the 'resume' field (not part of the backend schema)
      delete data.resume;

      const response = await updateEmployeeProfileData(data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || "Failed to add profile."
      );
    }
  }
);

export const fetchFavouritesThunk = createAsyncThunk(
  "profile/fetch-favourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFavouriteJobs();
      console.log("Redux Response for fetch favs", response);
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

export const toggleFavouritesThunk = createAsyncThunk(
  "profile/toggle-favourite",
  async (job_id, { rejectWithValue }) => {
    try {
      const data = {
        job_id,
      };
      console.log("redux toggle", data);
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

const employeeProfileSlice = createSlice({
  name: "employeeProfile",
  initialState: {
    profileData: null,
    favouriteJobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch profile data
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload.profile_data;
        toast.success(action.payload.msg);
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // Update Profile Data
      .addCase(editProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload.profile_data;
        toast.success(action.payload.msg);
      })
      .addCase(editProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

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
      });
  },
});

export default employeeProfileSlice.reducer;
