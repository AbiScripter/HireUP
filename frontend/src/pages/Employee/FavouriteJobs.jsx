import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteJobDetailsThunk,
  fetchFavouritesThunk,
} from "../../redux/reducers/employee/jobFavourite";
import JobCard from "../../components/Employee/EmployeeJobCard";

const FavouriteJobs = () => {
  const dispatch = useDispatch();
  const { favouriteJobs, favouriteJobDetails, loading, error } = useSelector(
    (state) => state.jobFavourite
  );

  console.log("favjobs details", favouriteJobDetails);
  console.log("favjobsids", favouriteJobs);

  useEffect(() => {
    if (favouriteJobs.length === 0) {
      dispatch(fetchFavouritesThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavouriteJobDetailsThunk(favouriteJobs));
  }, [dispatch, favouriteJobs.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="h-screen bg-gray-300 px-4">
      <h1 className="text-4xl text-center py-6">Favourite Jobs</h1>
      <div className="flex gap-4 flex-wrap py-6">
        {favouriteJobDetails.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>
    </main>
  );
};

export default FavouriteJobs;
