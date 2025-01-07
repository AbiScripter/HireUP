import { Heart } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="w-96 flex gap-5 flex-col  p-4 bg-white rounded-md relative">
      <div className=" absolute right-2 top-1 bg-gray-100 p-1 rounded-full cursor-pointer">
        <Heart size={20} />
      </div>
      {/* Job header */}
      <div className="flex gap-4">
        <h2 className="capitalize border-custom-black text-custom-black rounded-full bg-red-100 w-12 h-12 flex justify-center items-center font-semibold text-lg">
          <span>{job.company_name.slice(0, 1)}</span>
        </h2>
        {/* <img src="/"/> */}

        <div className="flex flex-col">
          <h2 className="font-bold text-lg">{job.company_name}</h2>
          <h4 className="text-sm -mt-1 text-gray-500">{job.location.trim()}</h4>
        </div>
      </div>

      {/* Job body */}
      <div>
        <h1 className="font-bold text-lg">{job.title}</h1>
        <p className="text-sm text-gray-500 h-10">{job.description}</p>
      </div>

      {/* Addtional info */}
      <div className="flex flex-wrap gap-x-4 gap-y-3 text-sm">
        <p className="bg-blue-100 px-2 text-blue-600 font-semibold rounded-sm">
          {job.no_of_positions} Positions
        </p>
        <p className="bg-orange-100 px-2 text-orange-500 font-semibold rounded-sm">
          {job.employment_type}
        </p>
        <p className="bg-green-100 px-2 text-green-500 font-semibold rounded-sm">
          {job.years_of_experience} Years
        </p>
        <p className="bg-cyan-50 px-2 text-cyan-500 font-semibold rounded-sm">
          ₹{job.salary}/Year
        </p>
        <p className="bg-red-50 px-2 text-red-500 font-semibold rounded-sm">
          {job.work_mode}
        </p>
      </div>

      {/* Apply button */}
      <div className="flex gap-4 text-sm">
        <button className="bg-purple-700 text-white  px-4 py-2 rounded-md">
          Apply Now
        </button>
        <button className="border border-black px-4 py-2 rounded-md">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
