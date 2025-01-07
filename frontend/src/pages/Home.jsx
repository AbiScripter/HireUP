import { Link } from "react-router-dom";
import CompanySwiper from "../components/CompanySwiper";
import "./Home.css";

const Home = () => {
  return (
    <div>
      {/* Grid Background */}
      <div className="grid-background"></div>

      {/* Main Content */}
      <div className="app-content">
        <main className="flex flex-col justify-center items-center h-[80vh] gap-20">
          <div>
            <h1 className="text-8xl text-purple-500 font-semibold mb-5">
              Your Next Career Starts Here
            </h1>
            <h3 className="text-4xl text-center">
              Find Jobs. Unlock Opportunities.
            </h3>
          </div>
          <div className="flex gap-10 font-semibold text-white">
            <Link
              to="/employee/signup"
              className="bg-purple-500 hover:bg-purple-600 px-10 py-3"
            >
              Find Jobs / Job Seekers
            </Link>
            <Link
              to="/employer/signup"
              className="bg-purple-500 hover:bg-purple-600 px-10 py-3"
            >
              Post Job / Employers
            </Link>

            <Link
              to="/jobs"
              className="bg-purple-500 hover:bg-purple-600 px-10 py-3"
            >
              Jobs
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
