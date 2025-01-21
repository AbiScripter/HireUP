import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmployerJobCard = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function handleViewApplicants() {
  //   dispatch(getJobApplicantsThunk(job._id));
  // }

  const handleDetailsClick = () => {
    navigate(`/employer/job/${job._id}`);
  };

  return (
    <div className="w-96 flex gap-5 flex-col p-2 bg-white border rounded-lg  capitalize ">
      <div className="rounded-md p-3 flex flex-col relative bg-gray-200">
        <h4 className="text-sm">{job.company_name}</h4>

        <div className="flex gap-3 justify-between items-start min-h-28">
          <div>
            <h1 className="font-bold text-2xl capitalize ">{job.title}</h1>
            <span className="text-gray-400 text-sm">{job.location}</span>
          </div>

          <h2 className="capitalize rounded-full bg-red-100 w-10 h-10 flex justify-center items-center font-semibold text-lg">
            <span>{job.company_name.slice(0, 1)}</span>
          </h2>
          {/* Add company logo afterwards */}
          {/* <img src="/"/> */}
        </div>
      </div>

      <button
        className="bg-black text-white px-2 py-1 border font-semibold hover:text-black hover:bg-white  rounded-lg text-sm w-full"
        onClick={handleDetailsClick}
        type="button"
      >
        View Details/Applicants
      </button>
    </div>
  );
};

export default EmployerJobCard;
