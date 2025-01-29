import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobApplicantsThunk,
  getJobDetailsThunk,
  updateApplicationStatusThunk,
} from "../../redux/reducers/employer/employerJob";
import { Box, Divider, LinearProgress, MenuItem, Select } from "@mui/material";
import {
  MapPin,
  Globe2,
  Briefcase,
  Users,
  IndianRupee,
  GraduationCap,
  ScrollText,
} from "lucide-react";

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
    <div className="max-w-4xl mx-auto my-10">
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-xl border border-gray-300 rounded-xl">
        {/* Header with Job Title and Status */}
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-white p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* <Building2 className="w-8 h-8" /> */}
              <h1 className="text-3xl font-bold capitalize">{job?.title}</h1>
            </div>
            <p className="text-xl opacity-90 capitalize">{job?.company_name}</p>
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

        {/* Applicants */}
        <div className="p-8">
          <h1 className="text-center text-xl mb-2">Applicants</h1>
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
    <>
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-y-4 md:grid-cols-4 items-center py-6 bg-white rounded-lg shadow-sm p-4 mb-4 border">
        <p className="capitalize ">{applicant.fullname}</p>
        <p className="hidden xs:block ">{formatDate(applicant.applied_at)}</p>
        <p className="text-right md:text-left">
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
          size="small"
          value={currStatus}
          // label="Status"
          onChange={handleChange}
          className="col-span-full md:col-span-1"
        >
          <MenuItem value={"Applied"}>Applied</MenuItem>
          <MenuItem value={"Shortlisted"}>Shortlisted</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
          <MenuItem value={"Accepted"}>Accepted</MenuItem>
        </Select>
      </div>
    </>
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

export default EmployerJobDetails;
