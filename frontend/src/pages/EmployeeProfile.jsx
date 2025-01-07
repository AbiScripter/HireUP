import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Briefcase, Award, Loader } from "lucide-react"; // Importing icons from lucide-react
import { Box, Modal } from "@mui/material";
import { ModalStyle } from "./EmployerDashboard";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { toast } from "react-toastify";
import AddProfileForm from "../components/AddProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeProfile } from "../redux/reducers/employeeReducer";

// Component for displaying the top skills
const SkillList = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills?.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

// Component for rendering each info item with an icon
const InfoItem = ({ Icon, label, value }) => {
  return (
    <div className="flex items-center space-x-3 text-lg text-gray-700">
      <Icon className="w-6 h-6 text-purple-600" />
      <div>
        <p className="font-medium">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

const EmployeeProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [employeeData, setEmployeeData] = useState(null);
  const dispatch = useDispatch();

  // Access jobs and loading state from Redux
  const { profileData, loading, error } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    // Dispatch the thunk to fetch jobs
    dispatch(fetchEmployeeProfile());
  }, [dispatch]);

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return <Loader />;
  }

  //if the employee not added any profile data : provide a form to add data
  if (profileData === null) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <h1 className="text-2xl">
          Your profile is empty. Please add your details.
        </h1>

        {/* AddButton */}
        <div>
          <button
            onClick={handleOpen}
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-1 rounded-sm"
          >
            Add Profile
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={ModalStyle}>
              <AddProfileForm />
            </Box>
          </Modal>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 ">
      <div className="flex justify-center mb-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-indigo-500"
        />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
        Employee Profile
      </h1>

      <div className="space-y-6">
        <InfoItem
          Icon={Briefcase}
          label="Full Name"
          value={profileData?.fullname}
        />
        <InfoItem Icon={Mail} label="Email" value={profileData?.email} />
        <InfoItem Icon={Phone} label="Mobile" value={profileData?.mobile} />
        <InfoItem
          Icon={MapPin}
          label="Location"
          value={profileData?.location}
        />
        <InfoItem
          Icon={Award}
          label="Years of Experience"
          value={profileData?.yearsOfExperience}
        />

        <div>
          <p className="font-medium text-lg text-gray-700">Top Skills:</p>
          <SkillList skills={profileData?.topSkills} />
        </div>

        <div>
          <p className="font-medium text-lg text-gray-700">Resume:</p>
          <p className="text-green-500">{profileData?.resume}</p>
        </div>
      </div>

      {/* Edit Button */}
      <div>
        <button
          onClick={handleOpen}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-1 rounded-sm"
        >
          Edit Profile
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <UpdateProfileForm />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeProfile;
