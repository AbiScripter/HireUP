import { useEffect } from "react";
import AccountMenu from "../../components/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import JobCard from "../../components/EmployeeJobCard";
import { fetchJobsThunk } from "../../redux/reducers/employee";
import { fetchFavouritesThunk } from "../../redux/reducers/jobFavourite";

const colors = [
  "#FECACA", // Light Red
  "#D1FAE5", // Light Green
  "#BFDBFE", // Light Blue
  "#E9D5FF", // Light Purple
  "#FDE68A", // Light Yellow
  "#B2F5EA", // Light Cyan
  "#FBCFE8", // Light Pink
  "#D1FAE5", // Light Teal
  "#FFEDD5", // Light Peach
  "#D7D2FF", // Light Indigo
];

const EmployeeDashBoard = () => {
  const dispatch = useDispatch();
  const {
    jobs,
    loading: jobsLoading,
    // error: jobsFetchingError,
  } = useSelector((state) => state.employee);
  const { favouriteJobs } = useSelector((state) => state.jobFavourite);

  console.log(favouriteJobs);

  //!Fetch All Jobs
  useEffect(() => {
    // Only fetch jobs if they are not already in the Redux state
    if (jobs.length === 0) {
      dispatch(fetchJobsThunk());
    }
  }, [dispatch, jobs]);

  //!Fetch Fav Jobs Ids
  useEffect(() => {
    dispatch(fetchFavouritesThunk());
  }, [dispatch]);

  if (jobsLoading) {
    return <Loader />;
  }

  // if (jobsFetchingError) {
  //   return (
  //     <p className="text-red-500">
  //       Error loading jobs: {jobsFetchingError.message}
  //     </p>
  //   );
  // }

  return (
    <div>
      <AccountMenu />
      <div className="flex gap-4 flex-wrap bg-red-50">
        {jobs.map((job, i) => (
          <JobCard job={job} key={job._id} color={colors[i % colors.length]} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
