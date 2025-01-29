import { Link } from "react-router-dom";
import CompanySwiper from "../components/CompanySwiper";
import "./Home.css";
import { ChevronsUp } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Grid Background */}
      <div className="grid-background bg-gray-300"></div>
      <div className="flex justify-center pt-4">
        <h1 className="text-4xl flex font-semibold">
          <span>Hire</span>
          <span className="">Up</span>
          <ChevronsUp size={42} className="-ml-1 text-primary" />
        </h1>
      </div>
      {/* Main Content */}
      <div className="app-content">
        <main className="flex flex-col justify-center items-center h-[80vh] gap-20">
          <div>
            <h1 className="text-6xl xs:text-7xl sm:text-8xl text-primary font-semibold mb-12">
              Your Next Career Starts Here
            </h1>

            <div className="flex justify-center">
              <h3 className="text-2xl sm:text-4xl">
                Find Jobs. Unlock Opportunities
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-10 gap-y-5 font-semibold text-white">
            <Link
              to="/employee/signup"
              className="bg-primary hover:bg-primaryhover px-10 py-2 sm:py-3 rounded-sm"
            >
              Find Jobs / Job Seekers
            </Link>
            <Link
              to="/employer/signup"
              className="bg-primary hover:bg-primaryhover px-10 py-2 sm:py-3 rounded-sm"
            >
              Post Job / Employers
            </Link>
          </div>
        </main>

        {/* Company swiper */}
        <div>
          <CompanySwiper />
        </div>
      </div>
    </div>
  );
};

export default Home;
