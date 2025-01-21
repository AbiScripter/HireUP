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

export const jobApply = (data) => API.post("/job-apply", data);

export const toggleFavouriteJob = (data) => API.post("/toggle-favourite", data);
export const fetchFavouriteJobs = () => API.get("/get-favourites");
export const fetchAppliedJobs = () => API.get("/get-applied");

export const fetchJobDetails = (data) =>
  API.get("/get-job-details", { params: data });

export const fetchFavouriteJobDetails = (data) =>
  API.get("/get-favourites-details", { params: data });

export const fetchAppliedJobDetails = (data) =>
  API.get("/get-applied-details", { params: data });

export const fetchJobStatus = (data) =>
  API.get("/get-job-status", {
    params: {
      employee_id: data.employee_id,
      job_id: data.job_id,
    },
  });

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
export const getJobDetails = (data) =>
  API.get("/employer-get-job-details", { params: data });

export const updateJobStatus = (data) =>
  API.put("/update-job-status", { params: data });
