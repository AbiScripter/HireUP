import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employee/employee";
import employeeProfileReducer from "./reducers/employee/employeeProfile";
import employeeAuthReducer from "./reducers/employee/employeeAuth";
import jobFavouriteReducer from "./reducers/employee/jobFavourite";
import employeeNavbarReducer from "./reducers/employee/employeeNavbar";
import jobDetailsReducer from "./reducers/employee/jobDetails";

import employerAuthReducer from "./reducers/employer/employerAuth";
import employerJobReducer from "./reducers/employer/employerJob";

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
    employerAuth: employerAuthReducer,
    employerJob: employerJobReducer,
  },
});

export default store;
