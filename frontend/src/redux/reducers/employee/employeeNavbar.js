import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getEmployeeData } from "../../../services/api";

// Async Thunk for Employee Basic Data like email and username
export const getEmployeeBasicDetailsThunk = createAsyncThunk(
  "employee/get-basicDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployeeData();
      // console.log("employee Detailssss:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }
);

const employeeNavbarSlice = createSlice({
  name: "employeeNavbar",
  initialState: {
    employeeData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Employee Basic Data
      .addCase(getEmployeeBasicDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeBasicDetailsThunk.fulfilled, (state, action) => {
        state.employeeData = action.payload.employeeData;
        state.loading = false;
      })
      .addCase(getEmployeeBasicDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default employeeNavbarSlice.reducer;
