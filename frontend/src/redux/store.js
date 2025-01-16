import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employee";
import employerReducer from "./reducers/employer";
import employeeProfileReducer from "./reducers/employeeProfile";
import employeeAuthReducer from "./reducers/employeeAuth";
import jobFavouriteReducer from "./reducers/jobFavourite";
import employeeNavbarReducer from "./reducers/employeeNavbar";
import jobDetailsReducer from "./reducers/jobDetails";

const store = configureStore({
  reducer: {
    // Employee
    employee: employeeReducer,
    employeeAuth: employeeAuthReducer,
    employeeNavbar: employeeNavbarReducer,
    employeeProfile: employeeProfileReducer,
    jobFavourite: jobFavouriteReducer,
    jobDetails: jobDetailsReducer,
    // Employer
    employer: employerReducer,
  },
});

export default store;
