import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobApplicantsThunk,
  getJobDetailsThunk,
  updateJobStatusThunk,
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
      <div className="flex flex-col gap-8 bg-gray p-4 w-full">
        <div className="flex justify-between">
          {/* <h1 className="text-3xl font-semibold">
          {job.company_name.slice(0, 1).toUpperCase()}
        </h1> */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold capitalize">
              {job?.company_name}
            </h2>
            <p className="capitalize">{job?.title}</p>
            <p className="capitalize text-gray-400 text-sm">
              {job?.location} - {job?.work_mode}
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#A7F3D0" }}
          >
            <p className="text-xs">Salary</p>
            <p className="text-lg">{job?.salary}/Year</p>
          </div>
          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#93C5FD" }}
          >
            <p className="text-xs">Job Type</p>
            <p className="text-lg">{job?.employment_type}</p>
          </div>

          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#FECAC0" }}
          >
            <p className="text-xs">Number Of Positions</p>
            <p className="text-lg"> {job?.no_of_positions}</p>
          </div>

          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#A5B4FC" }}
          >
            <p className="text-xs">Years Of Experience</p>
            <p className="text-lg">{job?.years_of_experience}</p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Job Description</h1>
          <p className="text-gray-400 text-sm">{job?.description}</p>
        </div>

        {/* Applicants */}
        <div>
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
  const [currStatus, setCurrentStatus] = useState(applicant?.status);

  const handleChange = (event) => {
    const { employee_id, job_id } = applicant;
    setCurrentStatus(event.target.value);
    dispatch(
      updateJobStatusThunk({
        employee_id,
        job_id,
        status: event.target.value,
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
