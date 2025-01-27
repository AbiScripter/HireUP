import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import JobCard from "../../components/Employee/JobCard";
import { fetchFavouritesThunk } from "../../redux/reducers/employee/jobFavourite";
import { fetchPaginatedJobs } from "../../redux/reducers/employee/employee";

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
    currentPage,
    totalPages,
    // error: jobsFetchingError,
  } = useSelector((state) => state.employee);
  const { favouriteJobs } = useSelector((state) => state.jobFavourite);
  console.log("favouriteJobs from dashboard", favouriteJobs);

  // const { jobs, currentPage, totalPages, loading } = useSelector(
  //   (state) => state.jobs
  // );
  console.log(currentPage, totalPages, jobs);
  // Fetch jobs for the current page
  useEffect(() => {
    dispatch(fetchPaginatedJobs(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchPaginatedJobs(page));
    }
  };

  //!Fetch All Jobs
  // useEffect(() => {
  //   // Only fetch jobs if they are not already in the Redux state
  //   if (jobs.length === 0) {
  //     dispatch(fetchJobsThunk());
  //   }
  // }, [dispatch, jobs]);

  //!Fetch Fav Job Ids
  useEffect(() => {
    dispatch(fetchFavouritesThunk());
  }, [dispatch]);

  if (jobsLoading) {
    return <Loader />;
  }

  return (
    <main className="h-screen px-4">
      {/* <h1 className="text-4xl text-center py-6">Jobs</h1> */}
      <div className="flex gap-4 flex-wrap py-6">
        {jobs.map((job, i) => (
          <JobCard job={job} key={job._id} color={colors[i % colors.length]} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-1 text-white bg-gray-600 rounded-md hover:bg-gray-700 ${
            currentPage === 1 && "cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 mx-1 bg-gray-100 text-gray-800 rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-1 text-white bg-gray-600 rounded-md hover:bg-gray-700 ${
            currentPage === totalPages && "cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default EmployeeDashBoard;
