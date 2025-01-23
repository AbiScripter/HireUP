import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostJobForm from "../../components/Employer/PostJobForm";
import { getPostedJobs } from "../../services/api";
import EmployerJobCard from "../../components/Employer/JobCard";

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
              <PostJobForm updatedLocalJobs={updatedLocalJobs} />
            </Box>
          </Modal>
        </div>

        <div className="">
          <h1 className="text-4xl text-center">Your Job Postings</h1>
          <div className="p-6">
            {jobsPostedByEmployer.map((job, i) => (
              <EmployerJobCard key={i} job={job} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployerDashboard;
