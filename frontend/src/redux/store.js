import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employeeReducer";
import employerReducer from "./reducers/employerReducer";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    employer: employerReducer,
  },
});

export default store;
