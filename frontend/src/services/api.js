import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Adding a request interceptor to include the token in the Authorization header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//! Employee Auth APIs
export const registerEmployee = (userData) =>
  API.post("/register-employee", userData);
export const loginEmployee = (loginData) =>
  API.post("/login-employee", loginData);

// !Employee protected
export const getEmployeeData = () => API.get("/employee-data");
export const getAllJobs = () => API.get("/jobs");
export const getEmployeeProfileData = () => API.get("/employee-profile-data");

export const updateEmployeeProfileData = (data) =>
  API.put("/update-employee-profile-data", data);

export const postJobApplication = (data) => API.post("/post-application", data);

export const toggleFavouriteJob = (data) => API.post("/toggle-favourite", data);
export const fetchFavouriteJobs = () => API.get("/get-favourites");

//!Employer Auth APIs
export const registerEmployer = (userData) =>
  API.post("/register-employer", userData);
export const loginEmployer = (loginData) =>
  API.post("/login-employer", loginData);

// !Employer protected
export const getEmployerData = () => API.get("/employer-data");
export const postJob = (formData) => API.post("/post-job", formData);
export const getPostedJobs = () => API.get("/posted-jobs");
export const getApplicants = (data) =>
  API.get("/view-applicants", { params: data });
