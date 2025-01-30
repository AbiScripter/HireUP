import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteJobDetailsThunk,
  fetchFavouritesThunk,
} from "../../redux/reducers/employee/jobFavourite";
import JobCard from "../../components/Employee/JobCard";
import Loader from "../../components/Loader";

const FavouriteJobs = () => {
  const dispatch = useDispatch();
  const { favouriteJobs, favouriteJobDetails, loading } = useSelector(
    (state) => state.jobFavourite
  );

  //fetch favourite job ids
  useEffect(() => {
    if (favouriteJobs.length === 0) {
      dispatch(fetchFavouritesThunk());
    }
  }, [dispatch]);

  //fetch all favourite job's data
  useEffect(() => {
    dispatch(fetchFavouriteJobDetailsThunk(favouriteJobs));
  }, [dispatch, favouriteJobs.length]);

  if (loading) return <Loader />;

  return (
    <main className="h-screen px-4 md:w-3/5 xl:w-2/5 mx-auto">
      <h1 className="text-4xl text-center py-6">Favourite Jobs</h1>
      {favouriteJobDetails.length === 0 ? (
        <h1 className="text-xl text-center mt-10">No favorite jobs yet.</h1>
      ) : (
        <div className="flex gap-4 flex-wrap py-6">
          {favouriteJobDetails.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      )}
    </main>
  );
};

export default FavouriteJobs;
