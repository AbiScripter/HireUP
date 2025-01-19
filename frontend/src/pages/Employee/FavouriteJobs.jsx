import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteJobDetailsThunk,
  fetchFavouritesThunk,
} from "../../redux/reducers/jobFavourite";
import JobCard from "../../components/EmployeeJobCard";

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
    <div>
      <h1>Favourite Jobs</h1>
      <div>
        {favouriteJobDetails.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>
    </div>
  );
};

export default FavouriteJobs;
