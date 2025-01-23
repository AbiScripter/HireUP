import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import AppLogo from "../AppLogo";

const EmployeeNavbar = () => {
  return (
    <div className="flex justify-between items-center border-b py-1 px-4 bg-gray-300">
      <Link to="/employee/dashboard">
        <AppLogo />
      </Link>
      <AccountMenu />
    </div>
  );
};

export default EmployeeNavbar;
