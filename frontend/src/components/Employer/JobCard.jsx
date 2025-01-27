import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

// import DialogTitle from '@mui/material/DialogTitle';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { deleteJobThunk } from "../../redux/reducers/employer/employerJob";
import { useState } from "react";
const EmployerJobCard = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewDetails = () => {
    navigate(`/employer/job/${job._id}`);
  };

  const handleDelete = () => {
    // if (confirm("Are you sure you want to delete this job?")) {
    dispatch(deleteJobThunk(job._id));
    // }
  };

  return (
    // <div className="w-96 flex gap-5 flex-col p-2 bg-white border rounded-lg  capitalize ">
    //   <div className="rounded-md p-3 flex flex-col relative bg-gray-200">
    //     <div className="absolute top-2 right-2">
    //       <Trash2 size={20} onClick={handleDeleteJob} />
    //     </div>
    //     <h4 className="text-sm">{job.company_name}</h4>
    //     <div className="flex gap-3 justify-between items-start min-h-28">
    //       <div>
    //         <h1 className="font-bold text-2xl capitalize ">{job.title}</h1>
    //         <span className="text-gray-400 text-sm">{job.location}</span>
    //       </div>

    //       <h2 className="capitalize rounded-full bg-red-100 w-10 h-10 flex justify-center items-center font-semibold text-lg">
    //         <span>{job.company_name.slice(0, 1)}</span>
    //       </h2>
    //       {/* Add company logo afterwards */}
    //       {/* <img src="/"/> */}
    //     </div>
    //   </div>

    //   <button
    //     className="bg-black text-white px-2 py-1 border font-semibold hover:text-black hover:bg-white  rounded-lg text-sm w-full"
    //     onClick={handleDetailsClick}
    //     type="button"
    //   >
    //     View Details/Applicants
    //   </button>
    // </div>
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this job?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleDelete} autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 mb-4 flex justify-between items-center capitalize">
        {/* Job Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
          <p className="text-gray-600 font-semibold">{job.company_name}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primaryhover transition"
          >
            View Details
          </button>
          <button
            onClick={handleClickOpen}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerJobCard;
