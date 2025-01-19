import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobsDetailsThunk } from "../../redux/reducers/jobDetails";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const employee_id = localStorage.getItem("employee_id");
  const { appliedJobsDetails, loading, error } = useSelector(
    (state) => state.jobDetails
  );

  console.log("applied details", appliedJobsDetails);

  useEffect(() => {
    dispatch(fetchAppliedJobsDetailsThunk(employee_id));
  }, [dispatch]);

  function formatDate(date) {
    const newDate = new Date(date);
    return String(newDate).slice(4, 15);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center">Applied Jobs</h1>
      <div className="mt-4">
        {appliedJobsDetails.map((job, i) => (
          <div key={job._id} className="flex flex-col py-4 border-b">
            <div className="capitalize text-xl flex gap-2 font-semibold">
              <h2>{job.job_title}</h2>
              at<h2>{job.company_name}</h2>
            </div>

            <div className="flex items-center justify-between">
              <p>{formatDate(job.applied_at)}</p>
              <p className="font-semibold">Status: {job.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
