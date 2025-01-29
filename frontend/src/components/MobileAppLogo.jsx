import { ChevronsUp } from "lucide-react";

const MobileAppLogo = ({ color, logoColor = "white" }) => {
  return (
    <div>
      <h1 className="text-3xl flex font-semibold" style={{ color: color }}>
        <span>Hire</span>
        <span>Up</span>
        <ChevronsUp size={38} className="-ml-1" style={{ color: logoColor }} />
      </h1>
    </div>
  );
};

export default MobileAppLogo;
