import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employeeReducer";
import employerReducer from "./reducers/employerReducer";
import employeeProfileReducer from "./reducers/employeeProfileReducer";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employer: employerReducer,
    employeeProfile: employeeProfileReducer,
  },
});

export default store;
