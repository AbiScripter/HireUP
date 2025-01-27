import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobApplicantsThunk,
  getJobDetailsThunk,
  updateApplicationStatusThunk,
} from "../../redux/reducers/employer/employerJob";
import { Box, LinearProgress, MenuItem, Select } from "@mui/material";

const statusColors = {
  Applied: "#7ec8e3", // Lighter Blue
  Shortlisted: "#ffd56b", // Lighter Yellow
  Rejected: "#f85a5a", // Lighter Red
  Accepted: "#81c784", // Lighter Green
};

const EmployerJobDetails = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const {
    jobPageData: job,
    applicantsData: applicants,
    loading,
  } = useSelector((state) => state.employerJob);

  console.log("job Details", jobId);
  console.log("job Applicants", applicants);

  //!fetch job details
  useEffect(() => {
    dispatch(getJobDetailsThunk(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    dispatch(getJobApplicantsThunk(jobId));
  }, [dispatch, jobId]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className="mt-10">
      <div className="max-w-4xl mx-auto my-10 bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-xl border border-gray-300 rounded-xl">
        {/* Header with Job Title and Status */}
        <div className="bg-gray-800 text-white p-6 rounded-t-xl">
          <h1 className="text-3xl font-bold capitalize">{job?.title}</h1>
          <p className="mt-2 text-lg capitalize">{job?.company_name}</p>
        </div>

        {/* Job Details Section */}
        <div className="p-8 space-y-6">
          {/* Job Info Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Location</h2>
              <p className="text-gray-600">{job?.location}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Employment Type
              </h2>
              <p className="text-gray-600">{job?.employment_type}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Work Mode</h2>
              <p className="text-gray-600">{job?.work_mode}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Salary</h2>
              <p className="text-gray-600">
                ₹{job?.salary.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Experience Required
              </h2>
              <p className="text-gray-600">{job?.years_of_experience} years</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Open Positions
              </h2>
              <p className="text-gray-600">{job?.no_of_positions}</p>
            </div>
          </div>

          {/* Job Description */}
          <div className="min-h-64">
            <h2 className="text-xl font-semibold text-gray-700">
              Job Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {job?.description
                ? job?.description
                : "No detailed description has been provided for this role."}
            </p>
          </div>
        </div>
        {/* Applicants */}
        <div>
          <div>
            {applicants.length === 0 && (
              <h1 className="text-xl py-6 text-center">
                No applicants yet for this job.
              </h1>
            )}
          </div>

          <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
          {applicants.map((applicant) => {
            return <DetailCard applicant={applicant} key={applicant._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ applicant }) => {
  const dispatch = useDispatch();
  const [currStatus, setCurrentStatus] = useState(
    applicant?.application_status
  );

  const handleChange = (event) => {
    const { employee_id, job_id } = applicant;
    setCurrentStatus(event.target.value);
    dispatch(
      updateApplicationStatusThunk({
        employee_id,
        job_id,
        application_status: event.target.value,
      })
    );
  };

  function formatDate(date) {
    const newDate = new Date(date);
    return String(newDate).slice(4, 15);
  }

  return (
    <div className="grid grid-cols-4 items-center py-4 border-b">
      <p className="capitalize">{applicant.fullname}</p>
      <p>{formatDate(applicant.applied_at)}</p>
      <p className="">
        <a
          href={applicant.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline text-blue-500"
        >
          View Resume
        </a>
      </p>

      <Select
        labelId="job-status"
        id="job-status"
        value={currStatus}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value={"Applied"}>Applied</MenuItem>
        <MenuItem value={"Shortlisted"}>Shortlisted</MenuItem>
        <MenuItem value={"Rejected"}>Rejected</MenuItem>
        <MenuItem value={"Accepted"}>Accepted</MenuItem>
      </Select>
    </div>
  );
};

export default EmployerJobDetails;
