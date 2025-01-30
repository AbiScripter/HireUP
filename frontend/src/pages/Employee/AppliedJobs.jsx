import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobsDetailsThunk } from "../../redux/reducers/employee/jobDetails";

const statusColors = {
  Applied: "#7ec8e3",
  Shortlisted: "#ffd56b",
  Rejected: "#f85a5a",
  Accepted: "#81c784",
};

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const employee_id = localStorage.getItem("employee_id");
  const { appliedJobsDetails, loading } = useSelector(
    (state) => state.jobDetails
  );

  //fetch applied job details
  useEffect(() => {
    dispatch(fetchAppliedJobsDetailsThunk(employee_id));
  }, [dispatch]);

  //function to format the date
  function formatDate(date) {
    const newDate = new Date(date);
    return String(newDate).slice(4, 15);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl text-center py-6">Applied Jobs</h1>
      {appliedJobsDetails.length === 0 ? (
        <h1 className="text-xl text-center mt-10">
          You haven't applied to any jobs yet.
        </h1>
      ) : (
        <div className="py-8">
          {/* Applied Jobs */}
          {appliedJobsDetails.map((job, i) => (
            <div
              key={job._id}
              className="flex flex-col py-4 border-b border-b-gray-400"
            >
              <div className="capitalize text-xl flex gap-2 font-semibold">
                <h2>{job.job_title}</h2>
                at<h2>{job.company_name}</h2>
              </div>

              {/* job status */}
              <div className="flex items-center justify-between">
                <p>{formatDate(job.applied_at)}</p>
                <p className="font-semibold">
                  {job?.job_status === "Inactive" ? (
                    <span className="text-red-500">
                      Job Deleted By the Employer
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: statusColors[job.application_status],
                      }}
                      className="px-4 py-1 text-white"
                    >
                      {job?.application_status}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
