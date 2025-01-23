import { ChevronsUp } from "lucide-react";

const AppLogo = () => {
  return (
    <div>
      <h1 className="text-3xl flex font-semibold">
        <span>Hire</span>
        <span className="">Up</span>
        <ChevronsUp size={38} className="-ml-1 text-primary" />
      </h1>
    </div>
  );
};

export default AppLogo;
