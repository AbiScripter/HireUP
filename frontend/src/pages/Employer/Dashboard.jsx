import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import PostJobForm from "../../components/Employer/PostJobForm";
import EmployerJobCard from "../../components/Employer/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostedJobsThunk } from "../../redux/reducers/employer/employerJob";
import { deleteJobThunk } from "../../redux/reducers/employer/employerJob";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Loader from "../../components/Loader";

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
  const [postJobModalopen, setPostJobModalOpen] = useState(false);
  const [DeleteJobDialogopen, setDeleteJobDialogOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  const handlePostJobModalOpen = () => setPostJobModalOpen(true);
  const handlePostJobModalClose = () => setPostJobModalOpen(false);
  const dispatch = useDispatch();
  const { postedJobs, loading } = useSelector((state) => state.employerJob);

  //!Fetch Posted Jobs
  useEffect(() => {
    // Only fetch jobs if they are not already in the Redux state
    dispatch(getPostedJobsThunk());
  }, []);

  const handleDeleteJob = () => {
    dispatch(deleteJobThunk(jobIdToDelete));
  };

  const handleDeleteJobDialogOpen = (job_id) => {
    setJobIdToDelete(job_id);
    setDeleteJobDialogOpen(true);
  };

  const handleDeleteJobDialogClose = () => {
    setDeleteJobDialogOpen(false);
  };

  if (loading) return <Loader />;
  return (
    <div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={DeleteJobDialogopen} onClose={handleDeleteJobDialogClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this job?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete this job all the data related to this job and its
            applicants will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleDeleteJobDialogClose}
            className="bg-primary text-white px-3 py-1 rounded-sm mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteJob}
            autoFocus
            className="bg-red-500 text-white px-3 py-1 rounded-sm"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      <main>
        {/* Modal to Post Job*/}
        <div className="flex justify-center py-4 px-4">
          <button
            onClick={handlePostJobModalOpen}
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 w-[99%] rounded-sm fixed bottom-2 text-xl"
          >
            Post Job
          </button>
          <Modal
            open={postJobModalopen}
            onClose={handlePostJobModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={ModalStyle}>
              <PostJobForm handleClose={handlePostJobModalClose} />
            </Box>
          </Modal>
        </div>

        {/* Posted Jobs section */}
        <div>
          <h1 className="text-4xl text-center">Your Job Postings</h1>
          {postedJobs.length === 0 ? (
            <p className="text-xl text-center py-16">No Jobs Posted</p>
          ) : (
            <div className="p-6">
              {postedJobs.map((job, i) => (
                <EmployerJobCard
                  key={i}
                  job={job}
                  onDialogOpen={handleDeleteJobDialogOpen}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
