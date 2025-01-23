import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavouritesThunk } from "../../redux/reducers/employee/jobFavourite";

const JobCard = ({ job, color }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favouriteJobs } = useSelector((state) => state.jobFavourite);
  const isFavourite = favouriteJobs?.includes(job._id);

  function handleFavourites() {
    dispatch(toggleFavouritesThunk(job._id));
  }

  const handleDetailsClick = () => {
    navigate(`/employee/job/${job._id}`);
  };

  return (
    <div
      className="w-96 flex gap-5 flex-col p-2 border rounded-lg  border-gray-300 capitalize "
      style={{ backgroundColor: "#E5E4E2" }}
    >
      <div
        className="rounded-md p-3 flex flex-col gap-4 relative bg-gray-300"
        style={{ backgroundColor: color }}
      >
        <div className=" absolute right-[1.5px] top-[2px] p-1 rounded-full cursor-pointer">
          <Heart
            size={20}
            onClick={handleFavourites}
            fill={isFavourite ? "red" : ""}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-sm">{job.company_name}</h4>

          <div className="min-h-24">
            <h1 className="font-bold text-2xl capitalize ">{job.title}</h1>
            {/* Add company logo afterwards */}
            {/* <img src="/"/> */}
          </div>
        </div>

        {/* Addtional info */}
        <div className="flex flex-wrap  gap-1 text-xs">
          <p className="py-1 px-2 rounded-full border-2 border-gray-400">
            {job.employment_type}
          </p>
          <p className="py-1 px-2  rounded-full border-2 border-gray-400">
            {job.work_mode}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center p-3">
        <div>
          <h2 className="font-semibold">₹{job.salary}/Year</h2>
          <p className="text-sm -mt-1 text-gray-500">{job.location.trim()}</p>
        </div>

        <button
          className="bg-gray-400 text-white hover:bg-gray-500 px-2 py-1 rounded-sm text-sm font-light"
          type="button"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
