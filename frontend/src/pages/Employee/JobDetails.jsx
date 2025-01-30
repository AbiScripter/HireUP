import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  getApplicationStatusThunk,
  getJobDetailsThunk,
  jobApplyThunk,
} from "../../redux/reducers/employee/jobDetails";
import {
  MapPin,
  Globe2,
  Briefcase,
  Users,
  IndianRupee,
  GraduationCap,
  ScrollText,
} from "lucide-react";

const statusColors = {
  Shortlisted: "bg-yellow-500",
  Accepted: "bg-green-500",
  Rejected: "bg-red-500",
  Applied: "bg-blue-500",
};

const JobDetails = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const {
    loading,
    jobPageData: job, //after fetching in useEffect we can get it using redux
    currentApplicationStatus: applicationStatus,
  } = useSelector((state) => state.jobDetails);
  const employee_id = localStorage.getItem("employee_id");
  const isAlreadyApplied = applicationStatus === "" ? false : true;

  //!fetch job details
  useEffect(() => {
    dispatch(getJobDetailsThunk(jobId));
  }, [dispatch, jobId]);

  //!fetch job status
  useEffect(() => {
    dispatch(
      getApplicationStatusThunk({
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

  // If Job Deleted By the employer show this message
  if (job?.job_status === "Inactive") {
    return (
      <div className="max-w-xl mx-auto my-10 text-center">
        <h1 className="text-2xl font-bold text-gray-700">Job Unavailable</h1>
        <p className="mt-4 text-gray-600">
          This job has been removed by the employer and is no longer available.
        </p>
        <Link
          to="/employee/dashboard"
          className="mt-6 px-4 py-2 block bg-primary text-white rounded-lg hover:bg-primaryhover"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-xl border border-gray-300 rounded-xl">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-white p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold capitalize">{job?.title}</h1>
            </div>
            <p className="text-xl opacity-90 capitalize">{job?.company_name}</p>
            <span
              className={`${statusColors[applicationStatus]} px-4 py-2 rounded-full text-sm font-medium inline-flex items-center space-x-1`}
            >
              <span>{applicationStatus}</span>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem icon={MapPin} title="Location" value={job?.location} />
            <InfoItem
              icon={Briefcase}
              title="Employment Type"
              value={job?.employment_type}
            />
            <InfoItem icon={Globe2} title="Work Mode" value={job?.work_mode} />
            <InfoItem
              icon={IndianRupee}
              title="Salary"
              value={`₹${job?.salary?.toLocaleString("en-IN")}`}
            />
            <InfoItem
              icon={GraduationCap}
              title="Experience Required"
              value={`${job?.years_of_experience} years`}
            />
            <InfoItem
              icon={Users}
              title="Open Positions"
              value={job?.no_of_positions}
            />
          </div>

          {/* Job Description */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <ScrollText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-gray-700">
                Job Description
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {job?.description ||
                "No detailed description has been provided for this role."}
            </p>
          </div>
        </div>

        {/* Apply Section */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={handleApply}
            disabled={isAlreadyApplied}
            className={`
              w-full py-4 px-6 rounded-xl text-lg font-semibold
              flex items-center justify-center space-x-2
              transition-all duration-200
              ${
                isAlreadyApplied
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl"
              }
            `}
          >
            <Briefcase className="w-5 h-5" />
            <span>{isAlreadyApplied ? applicationStatus : "Apply Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, title, value }) => (
  <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="p-2 bg-primary/10 rounded-lg">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      <p className="text-gray-600 mt-1">{value}</p>
    </div>
  </div>
);

export default JobDetails;
