import { ChevronsUp } from "lucide-react";
import UserInfoCard from "./UserInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <Link to="/employer/dashboard">
        <h1 className="text-3xl flex font-semibold">
          <span>Hire</span>
          <span className="">Up</span>
          <ChevronsUp size={36} className="-ml-2 text-purple-500" />
        </h1>
      </Link>

      <UserInfoCard />
    </div>
  );
};

export default Navbar;
