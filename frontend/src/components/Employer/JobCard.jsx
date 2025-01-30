import { useNavigate } from "react-router-dom";

const EmployerJobCard = ({ job, onDialogOpen }) => {
  const navigate = useNavigate();

  //view job
  const handleViewDetails = () => {
    navigate(`/employer/job/${job._id}`);
  };

  const handleClickOpen = () => {
    onDialogOpen(job._id);
  };

  return (
    <div>
      {/* Job Card */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 mb-4 flex justify-between items-center capitalize">
        {/* Job Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
          <p className="text-gray-600 font-semibold">{job.company_name}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primaryhover transition"
          >
            View Details
          </button>
          <button
            onClick={handleClickOpen}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobCard;
