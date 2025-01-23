import { Outlet } from "react-router-dom";
import EmployeeNavbar from "../components/Employee/Navbar";

const EmployeeLayout = () => {
  return (
    <div>
      <EmployeeNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
