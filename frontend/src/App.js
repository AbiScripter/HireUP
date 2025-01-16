import "./App.css";
// import Home from "./pages/Home";
// import JobsPage from "./pages/JobsPage";
// import EmployeeLogin from "./pages/EmployeeLogin";
// import EmployeeSignup from "./pages/EmployeeSignup";
// import EmployeeDashBoard from "./pages/EmployeeDashBoard";
// import EmployeeProfile from "./pages/EmployeeProfile";

// import EmployerDashboard from "./pages/EmployerDashboard";
// import EmployerLogin from "./pages/EmployerLogin";
// import EmployerSignup from "./pages/EmployerSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { lazy } from "react";

// !Lazy Loading
const Home = lazy(() => import("./pages/Home"));
const EmployeeLogin = lazy(() => import("./pages/Employee/EmployeeLogin"));
const EmployeeSignup = lazy(() => import("./pages/Employee/EmployeeSignup"));
const EmployeeDashBoard = lazy(() =>
  import("./pages/Employee/EmployeeDashBoard")
);
const EmployeeProfile = lazy(() => import("./pages/Employee/EmployeeProfile"));

const EmployerSignup = lazy(() => import("./pages/Employer/EmployerSignup"));
const EmployerLogin = lazy(() => import("./pages/Employer/EmployerLogin"));
const EmployerDashboard = lazy(() =>
  import("./pages/Employer/EmployerDashboard")
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/jobs" element={<JobsPage />} /> */}

          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/signup" element={<EmployeeSignup />} />
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute>
                <EmployeeDashBoard />
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

          {/* Employer Routes */}
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/signup" element={<EmployerSignup />} />
          <Route
            path="/employer/dashboard"
            element={
              <ProtectedRoute>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
