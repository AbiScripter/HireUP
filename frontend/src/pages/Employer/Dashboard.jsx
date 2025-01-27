import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import PostJobForm from "../../components/Employer/PostJobForm";
import EmployerJobCard from "../../components/Employer/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostedJobsThunk } from "../../redux/reducers/employer/employerJob";

export const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EmployerDashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [jobsPostedByEmployer, setJobsPostedByEmployer] = useState([]);
  const dispatch = useDispatch();
  const { postedJobs } = useSelector((state) => state.employerJob);

  //!Fetch Posted Jobs
  useEffect(() => {
    // Only fetch jobs if they are not already in the Redux state
    dispatch(getPostedJobsThunk());
  }, []);

  console.log(postedJobs);

  return (
    <>
      <main>
        {/* Open Post Job Form */}
        <div className="flex justify-center py-4 px-4">
          <button
            onClick={handleOpen}
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 w-[99%] rounded-sm fixed bottom-2 text-xl"
          >
            Post Job
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={ModalStyle}>
              <PostJobForm handleClose={handleClose} />
            </Box>
          </Modal>
        </div>

        <div>
          <h1 className="text-4xl text-center">Your Job Postings</h1>
          {postedJobs.length === 0 ? (
            <p className="text-xl text-center py-16">No Jobs Posted</p>
          ) : (
            <div className="p-6">
              {postedJobs.map((job, i) => (
                <EmployerJobCard key={i} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default EmployerDashboard;
