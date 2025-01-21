import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { ChevronsUp } from "lucide-react";

const EmployeeNavbar = () => {
  return (
    <div className="flex justify-between items-center border-b py-1 px-4">
      <Link to="/employee/dashboard">
        <h1 className="text-3xl flex font-semibold">
          <span>Hire</span>
          <span className="">Up</span>
          <ChevronsUp size={36} className="-ml-2 text-purple-500" />
        </h1>
      </Link>
      <AccountMenu />
    </div>
  );
};

export default EmployeeNavbar;
