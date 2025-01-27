import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { uploadResumeToSupabase } from "../../../services/supabaseClient";
import {
  getEmployeeProfile,
  updateEmployeeProfile,
} from "../../../services/api";

// Fetch employee profile data
export const fetchProfileThunk = createAsyncThunk(
  "profile/fetchProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployeeProfile();
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

      const response = await updateEmployeeProfile(data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || "Failed to add profile."
      );
    }
  }
);

const employeeProfileSlice = createSlice({
  name: "employeeProfile",
  initialState: {
    profileData: null,
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
      });
  },
});

export default employeeProfileSlice.reducer;
