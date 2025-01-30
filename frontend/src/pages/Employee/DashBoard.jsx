import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

import JobCard from "../../components/Employee/JobCard";
import { fetchFavouritesThunk } from "../../redux/reducers/employee/jobFavourite";
import {
  fetchPaginatedJobs,
  setFilters,
} from "../../redux/reducers/employee/employee";
import JobFilters from "../../components/Employee/JobFilters";
import { TextField } from "@mui/material";
import JobFiltersDrawer from "../../components/Employee/JobFiltersDrawer";

const EmployeeDashBoard = () => {
  const dispatch = useDispatch();

  const {
    jobs,
    loading: jobsLoading,
    currentPage,
    totalPages,
    filters,
  } = useSelector((state) => state.employee);
  const searchRef = useRef();
  // const cityRef = useRef();

  //Fetch jobs for the current page
  useEffect(() => {
    dispatch(fetchPaginatedJobs({ page: currentPage, filters }));
  }, [dispatch]);

  //Fetch Fav Job Ids
  useEffect(() => {
    dispatch(fetchFavouritesThunk());
  }, [dispatch]);

  //handle job search
  const handleSearch = () => {
    const updatedFilters = { ...filters };
    updatedFilters["search_term"] = searchRef.current.value;
    dispatch(setFilters(updatedFilters));
    dispatch(fetchPaginatedJobs({ page: 1, filters: updatedFilters }));
  };

  // handle pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchPaginatedJobs({ page, filters }));
    }
  };

  if (jobsLoading) {
    return <Loader />;
  }

  return (
    <div className="grid lg:w-5/6 grid-cols-4 xl:grid-cols-6 xl:w-4/5 2xl:w-3/5 mx-auto">
      {/* Filters for devices more than 768px */}
      <div className="hidden md:flex col-span-1 xl:col-span-2 border bg-gray-200  justify-center">
        <JobFilters />
      </div>

      {/* Filters for deviced less than 768px */}
      <div className="md:hidden">
        <JobFiltersDrawer />
      </div>

      {/* main content */}
      <main className="col-span-4 md:col-span-3 xl:col-span-4 p-4">
        {/* Job Search Field */}
        <div className="relative w-full ">
          <TextField
            id="Search"
            variant="outlined"
            placeholder="Search Jobs by title & company"
            inputRef={searchRef}
            fullWidth
            className="bg-white"
            InputProps={{
              endAdornment: (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded"
                  onClick={handleSearch}
                  type="button"
                >
                  Search
                </button>
              ),
            }}
          />
        </div>

        {/* Jobs Section */}
        <div className="">
          {jobs.length === 0 ? (
            <div>
              No results found{" "}
              {filters.search_term && `for "${filters.search_term}"`}
              {/* {Object.keys(filters).length > 1 && " with the applied filters."} */}
            </div>
          ) : (
            <>
              <div className="flex gap-4 flex-wrap py-6">
                {jobs.map((job, i) => (
                  <JobCard job={job} key={job._id} />
                ))}
              </div>

              {/* Pagination */}
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashBoard;
