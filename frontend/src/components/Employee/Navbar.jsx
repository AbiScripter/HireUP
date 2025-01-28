import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import AppLogo from "../AppLogo";

const EmployeeNavbar = () => {
  return (
    <div className="flex gap-12 md:justify-between items-center border-b py-1 px-4 bg-gray-300 ">
      <div className="grow flex justify-end xs:justify-center md:justify-start">
        <Link to="/employee/dashboard">
          <AppLogo />
        </Link>
      </div>
      <AccountMenu />
    </div>
  );
};

export default EmployeeNavbar;
