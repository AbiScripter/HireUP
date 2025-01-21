import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import JobCard from "../../components/Employee/EmployeeJobCard";
import { fetchJobsThunk } from "../../redux/reducers/employee/employee";
import { fetchFavouritesThunk } from "../../redux/reducers/employee/jobFavourite";

const colors = [
  "#FECACF", // Light Red
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
  // const { appliedJobs } = useSelector((state) => state.jobDetails);

  console.log("favouriteJobs from dashboard", favouriteJobs);
  // console.log("appliedJobs from dashboard", appliedJobs);
  // const { favouriteJobs } = useSelector((state) => state.jobFavourite);
  // const { appliedJobs } = useSelector((state) => state.jobDetails);

  // console.log({ favs: favouriteJobs, applied: appliedJobs });

  //!Fetch All Jobs
  useEffect(() => {
    // Only fetch jobs if they are not already in the Redux state
    if (jobs.length === 0) {
      dispatch(fetchJobsThunk());
    }
  }, [dispatch, jobs]);

  //!Fetch Fav Job Ids
  useEffect(() => {
    dispatch(fetchFavouritesThunk());
  }, [dispatch]);

  //!Fetch Applied Job Ids
  // useEffect(() => {
  //   dispatch(getAppliedJobsThunk());
  // }, [dispatch]);

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
    <main className="h-screen px-4 bg-gray-300">
      <h1 className="text-4xl text-center py-6">Jobs</h1>
      <div className="flex gap-4 flex-wrap py-6">
        {jobs.map((job, i) => (
          <JobCard job={job} key={job._id} color={colors[i % colors.length]} />
        ))}
      </div>
    </main>
  );
};

export default EmployeeDashBoard;
