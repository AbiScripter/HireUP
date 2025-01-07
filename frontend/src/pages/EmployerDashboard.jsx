import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import PostJobForm from "../components/PostJobForm";
import { getEmployerData, getPostedJobs } from "../services/api";
import { toast } from "react-toastify";
import JobCard from "../components/JobCard";
import UserInfoCard from "../components/UserInfoCard";

export const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmployerDashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [jobsPostedByEmployer, setJobsPostedByEmployer] = useState([]);

  function updatedLocalJobs(formJobData) {
    setJobsPostedByEmployer((prevJobs) => [...prevJobs, formJobData]);
  }

  useEffect(() => {
    async function fetchPostedJobs() {
      try {
        const response = await getPostedJobs();

        if (!response) {
          return toast.error("JObs Not Found");
        }

        if (response.data.jobs.length === 0) {
          return;
        }

        setJobsPostedByEmployer(response.data.jobs);
        toast.success(response.data.msg);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }

    fetchPostedJobs();
  }, []);

  console.log(jobsPostedByEmployer);

  return (
    <div className="bg-gray-700 h-screen">
      <UserInfoCard ApiFunc={getEmployerData} />
      <div>
        <button
          onClick={handleOpen}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-1 rounded-sm"
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
            <PostJobForm updatedLocalJobs={updatedLocalJobs} />
          </Box>
        </Modal>
      </div>

      <div>
        {jobsPostedByEmployer.map((job, i) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
