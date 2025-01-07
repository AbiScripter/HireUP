import { useEffect } from "react";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import { getEmployeeData } from "../services/api";
import AccountMenu from "../components/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { fetchJobsThunk } from "../redux/reducers/employeeReducer";

const EmployeeDashBoard = () => {
  const dispatch = useDispatch();

  // Access jobs and loading state from Redux
  const { jobs, loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    // Dispatch the thunk to fetch jobs
    dispatch(fetchJobsThunk());
  }, [dispatch]);

  // Show toast notifications for errors or success
  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (jobs.length > 0) {
      toast.success("Jobs fetched successfully!");
    }
  }, [error, jobs]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <AccountMenu ApiFunc={getEmployeeData} />
      <div className="flex gap-4 flex-wrap bg-red-50">
        {jobs.map((job, i) => (
          <JobCard job={job} key={i} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
