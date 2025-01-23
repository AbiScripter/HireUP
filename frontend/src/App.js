import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { lazy } from "react";
import "./App.css";

// !Lazy Loading
const Home = lazy(() => import("./pages/Home"));
// Employee
const EmployeeLayout = lazy(() => import("./Layout/EmployeeLayout"));
const EmployeeLogin = lazy(() => import("./pages/Employee/Login"));
const EmployeeSignup = lazy(() => import("./pages/Employee/Signup"));
const EmployeeDashBoard = lazy(() => import("./pages/Employee/DashBoard"));
const EmployeeJobDetails = lazy(() => import("./pages/Employee/JobDetails"));
const EmployeeProfile = lazy(() => import("./pages/Employee/Profile"));
const FavouriteJobs = lazy(() => import("./pages/Employee/FavouriteJobs"));
const AppliedJobs = lazy(() => import("./pages/Employee/AppliedJobs"));
// Employer
const EmployerLayout = lazy(() => import("./Layout/EmployerLayout"));
const EmployerSignup = lazy(() => import("./pages/Employer/Signup"));
const EmployerLogin = lazy(() => import("./pages/Employer/Login"));
const EmployerDashboard = lazy(() => import("./pages/Employer/Dashboard"));
const EmployerJobDetails = lazy(() => import("./pages/Employer/JobDetails"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/signup" element={<EmployeeSignup />} />
          <Route element={<EmployeeLayout />}>
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute>
                  <EmployeeDashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/job/:jobId"
              element={
                <ProtectedRoute>
                  <EmployeeJobDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <ProtectedRoute>
                  <EmployeeProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/favourites"
              element={
                <ProtectedRoute>
                  <FavouriteJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/applied"
              element={
                <ProtectedRoute>
                  <AppliedJobs />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Employer Routes */}
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/signup" element={<EmployerSignup />} />

          <Route element={<EmployerLayout />}>
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/job/:jobId"
              element={
                <ProtectedRoute>
                  <EmployerJobDetails />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
