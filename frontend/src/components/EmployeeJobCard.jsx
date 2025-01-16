import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavouritesThunk } from "../redux/reducers/employeeProfileReducer";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const { favouriteJobs } = useSelector((state) => state.employeeProfile);
  console.log(favouriteJobs);
  const isFavourite = favouriteJobs?.includes(job._id);

  function handleFavourites() {
    dispatch(toggleFavouritesThunk(job._id));
  }

  return (
    <div className="w-96 flex gap-5 flex-col p-2 bg-white border rounded-lg  capitalize">
      <div className="rounded-md p-3 flex flex-col gap-4 relative bg-gray-200">
        <div className=" absolute right-[1.5px] top-[2px] p-1 rounded-full cursor-pointer">
          <Heart
            size={20}
            onClick={handleFavourites}
            fill={isFavourite ? "red" : ""}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-sm">{job.company_name}</h4>

          <div className="flex gap-3 justify-between items-start min-h-24">
            <h1 className="font-bold text-2xl capitalize ">{job.title}</h1>

            <h2 className="capitalize rounded-full bg-red-100 w-10 h-10 flex justify-center items-center font-semibold text-lg">
              <span>{job.company_name.slice(0, 1)}</span>
            </h2>
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
          <p className="text-sm -mt-1 text-gray-400">{job.location.trim()}</p>
        </div>

        <button
          className="bg-black text-white hover:text-black hover:bg-white hover:border px-2 py-1 rounded-full text-sm font-light"
          type="button"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
