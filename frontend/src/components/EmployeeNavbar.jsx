import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const EmployeeNavbar = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/employee/dashboard">
        <h1 className="text-xl ">HireUp!</h1>
      </Link>
      <AccountMenu />
    </div>
  );
};

export default EmployeeNavbar;
