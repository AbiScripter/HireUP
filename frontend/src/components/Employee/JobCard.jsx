import { Heart, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavouritesThunk } from "../../redux/reducers/employee/jobFavourite";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favouriteJobs } = useSelector((state) => state.jobFavourite);
  const isFavourite = favouriteJobs?.includes(job._id);

  function handleFavourites(event) {
    event.stopPropagation(); // Prevents the event from reaching the parent so that detailClik wont get invoked
    dispatch(toggleFavouritesThunk(job._id));
  }

  const handleDetailsClick = () => {
    navigate(`/employee/job/${job._id}`);
  };

  return (
    <div
      className="w-full p-1 border rounded-lg border-gray-300 capitalize shadow-xl hover:shadow-2xl cursor-pointer bg-gray-200"
      onClick={handleDetailsClick}
    >
      <div className="rounded-md p-3 flex flex-col gap-4 relative">
        <div className=" absolute right-[2px] top-[2px] rounded-full cursor-pointer heart">
          <Heart
            size={20}
            onClick={handleFavourites}
            fill={isFavourite ? "red" : ""}
          />
        </div>

        <div>
          <h1 className="font-bold text-xl capitalize ">{job.title}</h1>

          <div className="flex flex-col lg:flex-row lg:justify-between gap-y-2">
            <div className="flex gap-2 md:gap-4 items-center flex-wrap">
              <p className="text-sm">{job.company_name}</p>
              {/* Addtional info */}

              <div className="flex gap-1">
                <p className="px-2 rounded-full text-sm border-2 bg-gray-300 ">
                  {job.employment_type}
                </p>
                <p className="px-2 rounded-full text-sm border-2 bg-gray-300 ">
                  {job.work_mode}
                </p>
              </div>

              <p className="font-semibold text-sm w-full md:w-auto">
                ₹{job?.salary.toLocaleString("en-IN")}/Year
              </p>
            </div>

            <div className="flex items-center text-sm">
              <MapPin size={18} />
              {job.location.trim()}
            </div>
          </div>

          <p className="pt-2 text-gray-400 hidden sm:block">
            {job?.description.slice(0, 50)}
          </p>
        </div>
      </div>

      {/* <button
        className="bg-gray-400 text-white hover:bg-gray-500 px-2 py-1 rounded-sm text-sm font-light"
        type="button"
      >
        Details
      </button> */}
    </div>
  );
};

export default JobCard;
