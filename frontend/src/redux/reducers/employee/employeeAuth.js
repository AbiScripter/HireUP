import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginEmployee, registerEmployee } from "../../../services/api";
import { toast } from "react-toastify";

// Async Thunk for Employee Registration
export const registerEmployeeThunk = createAsyncThunk(
  "employeeAuth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerEmployee(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

// Async Thunk for Employee Login
export const loginEmployeeThunk = createAsyncThunk(
  "employeeAuth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginEmployee(userData);
      // Saving the token in localstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("employee_id", response.data.profile.employee_id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

const employeeAuthSlice = createSlice({
  name: "employeeAuth",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.msg); // Show success toast
      })
      .addCase(registerEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload); // Show error toast
      })

      // Login
      .addCase(loginEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.msg); // Show success toast
      })
      .addCase(loginEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload); // Show error toast
      });
  },
});

export default employeeAuthSlice.reducer;
