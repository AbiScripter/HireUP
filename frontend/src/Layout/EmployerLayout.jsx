import { Outlet } from "react-router-dom";
import Navbar from "../components/Employer/Navbar";

const EmployerLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployerLayout;
