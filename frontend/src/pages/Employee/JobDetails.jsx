import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee } from "lucide-react"; // Importing icons from lucide-react
import Loader from "../../components/Loader";
import {
  getJobDetailsThunk,
  getJobStatusThunk,
  jobApplyThunk,
} from "../../redux/reducers/employee/jobDetails";

const statusColors = {
  Applied: "#7ec8e3", // Lighter Blue
  Shortlisted: "#ffd56b", // Lighter Yellow
  Rejected: "#f85a5a", // Lighter Red
  Accepted: "#81c784", // Lighter Green
};

const JobDetails = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const {
    loading,
    jobPageData: job, //after fetching in useEffect we can get it using redux
    appliedJobs,
    currentJobStatus: status,
  } = useSelector((state) => state.jobDetails);
  const employee_id = localStorage.getItem("employee_id");
  const isAlreadyApplied = status === "" ? false : true;

  console.log("job Details", job);
  //!fetch job details
  useEffect(() => {
    dispatch(getJobDetailsThunk(jobId));
  }, [dispatch, jobId]);

  //!fetch job status
  useEffect(() => {
    dispatch(
      getJobStatusThunk({
        job_id: jobId,
        employee_id: employee_id,
      })
    );
  }, [dispatch]);

  //!handle job apply
  function handleApply() {
    dispatch(
      jobApplyThunk({
        job_id: jobId,
        company_name: job.company_name,
        job_title: job.title,
      })
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-8 bg-gray-300 p-4 h-screen">
      <div className="flex justify-between pt-10">
        {/* <h1 className="text-3xl font-semibold">
          {job.company_name.slice(0, 1).toUpperCase()}
        </h1> */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold capitalize">
            {job?.company_name}
          </h2>
          <p className="capitalize text-lg">{job?.title}</p>
          <p className="capitalize text-gray-400 text-md">
            {job?.location} - {job?.work_mode}
          </p>
        </div>

        <h1
          className="h-min px-2 py-1 text-white rounded-md"
          style={{ backgroundColor: statusColors[status] }}
        >
          {status || ""}
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-10 justify-between">
        <div
          className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
          style={{ backgroundColor: "#A7F3D0" }}
        >
          <div className="flex gap-2 items-center">
            <p className="">Salary</p>
          </div>

          <p className="text-xl">₹{job?.salary}/Year</p>
        </div>
        <div
          className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
          style={{ backgroundColor: "#93C5FD" }}
        >
          <p className="">Job Type</p>
          <p className="text-xl">{job?.employment_type}</p>
        </div>

        <div
          className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
          style={{ backgroundColor: "#FECAC0" }}
        >
          <p className="">Number Of Positions</p>
          <p className="text-xl"> {job?.no_of_positions}</p>
        </div>

        <div
          className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
          style={{ backgroundColor: "#A5B4FC" }}
        >
          <p className="">Years Of Experience</p>
          <p className="text-xl">{job?.years_of_experience}</p>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">Job Description</h1>
        <p className="text-gray-400 text-sm">{job?.description}</p>
      </div>

      <div>
        <button
          className={`bg-black text-white w-full rounded-md py-2 ${
            isAlreadyApplied && "cursor-not-allowed"
          }`}
          onClick={handleApply}
          disabled={isAlreadyApplied}
        >
          {isAlreadyApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
