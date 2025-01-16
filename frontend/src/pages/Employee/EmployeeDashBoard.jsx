import { useEffect } from "react";
import AccountMenu from "../../components/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsThunk } from "../../redux/reducers/employeeReducer";
import Loader from "../../components/Loader";
import JobCard from "../../components/EmployeeJobCard";
import { fetchFavouritesThunk } from "../../redux/reducers/employeeProfileReducer";

const EmployeeDashBoard = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.employee);
  const {
    loading: cardLoding,
    error: cardError,
    favouriteJobs,
  } = useSelector((state) => state.employeeProfile);

  console.log(favouriteJobs);

  useEffect(() => {
    // Only fetch jobs if they are not already in the Redux state
    if (jobs.length === 0) {
      dispatch(fetchJobsThunk());
    }
  }, [dispatch, jobs]);

  useEffect(() => {
    dispatch(fetchFavouritesThunk());
  }, [dispatch]);

  if (cardLoding) {
    return <Loader />;
  }

  if (cardError) {
    return <p className="text-red-500">Error updateing job: {error}</p>;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">Error loading jobs: {error}</p>;
  }

  return (
    <div>
      <AccountMenu />
      <div className="flex gap-4 flex-wrap bg-red-50">
        {jobs.map((job, i) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
