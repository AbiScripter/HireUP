import axios from "axios";

export const API = axios.create({
  baseURL: "https://hireup-backend-osp0.onrender.com/api",
});

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

// !Employee protected APIs
// basic details
export const getEmployeeBasicDetails = () => API.get("/employee-basics");

// profile
export const getEmployeeProfile = () => API.get("/employee-profile");
export const updateEmployeeProfile = (data) =>
  API.put("/update-employee-profile", data);

// jobs
export const getPaginatedJobs = (data) => API.get("/jobs", { params: data });
export const applyToJob = (data) => API.post("/job-apply", data);
export const getJobDetails = (data) =>
  API.get("/job-details", { params: data });
export const getApplicationStatus = (data) =>
  API.get("/application-status", {
    params: {
      employee_id: data.employee_id,
      job_id: data.job_id,
    },
  });

// favourites
export const toggleFavouriteJob = (data) => API.post("/toggle-favourite", data);
export const getFavouriteJobs = () => API.get("/favourite-jobs");
export const getFavouriteJobDetails = (data) =>
  API.get("/favourite-job-details", { params: data });

// applied
export const getAppliedJobs = () => API.get("/applied-jobs");
export const getAppliedJobDetails = (data) =>
  API.get("/applied-job-details", { params: data });

//!Employer Auth APIs
export const registerEmployer = (userData) =>
  API.post("/register-employer", userData);
export const loginEmployer = (loginData) =>
  API.post("/login-employer", loginData);

// !Employer protected
// basic details
export const getEmployerBasicDetails = () => API.get("/employer-basics");

//job
export const getEmployerJobDetails = (data) =>
  API.get("/employer-job-details", { params: data });
export const postJob = (formData) => API.post("/post-job", formData);

//not deleting the job just changing the job_status to Inactive because if we delete the job entirely all the dbs which are having this job data will be in issue
export const deleteJob = (data) => API.put("/delete-job", { params: data });
export const updateApplicationStatus = (data) =>
  API.put("/update-application-status", { params: data });
export const getPostedJobs = () => API.get("/posted-jobs");

//applicants
export const getApplicants = (data) => API.get("/applicants", { params: data });
