import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Briefcase, Award } from "lucide-react"; // Importing icons from lucide-react
import { Box, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyle } from "../Employer/EmployerDashboard";
import UpdateProfileForm from "../../components/Employee/UpdateProfileForm";
import Loader from "../../components/Loader";
import { fetchProfileThunk } from "../../redux/reducers/employee/employeeProfile";

// Component for displaying the top skills
const SkillList = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills?.map((skill, index) => (
        <p
          key={index}
          className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium shadow-sm capitalize min-w-20 flex justify-center"
        >
          {skill}
        </p>
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
  const dispatch = useDispatch();

  const { profileData, loading, error } = useSelector(
    (state) => state.employeeProfile
  );

  useEffect(() => {
    // Dispatch the thunk to fetch jobs
    if (!profileData) {
      dispatch(fetchProfileThunk());
    }
  }, [dispatch]);

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-16 bg-gray-300 h-screen">
      <h1 className="text-3xl text-center py-6">Your Profile</h1>
      <div className="flex justify-center">
        <div
          src="https://via.placeholder.com/150"
          className="w-32 h-32 rounded-full border-4 border-purple-600"
        ></div>
      </div>

      {/* <div className="flex justify-center gap-40">
        <div className="flex gap-6 flex-col">
          <InfoItem
            Icon={Briefcase}
            label="Full Name"
            value={profileData?.fullname}
          />
          <InfoItem Icon={Mail} label="Email" value={profileData?.email} />
          <InfoItem Icon={Phone} label="Mobile" value={profileData?.mobile} />
        </div>

        <div className="flex gap-4 flex-col">
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
        </div>
      </div> */}
      <div className="flex justify-center gap-20">
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
      </div>

      <div className="flex gap-2 items-center justify-center">
        <p className="font-medium text-lg text-gray-700">Top Skills : </p>
        <SkillList skills={profileData?.topSkills} />
      </div>

      <div className="flex gap-4 items-center justify-center">
        <p className="font-medium text-lg text-gray-700">Resume :</p>
        {profileData?.resumeUrl ? (
          <a
            href={profileData?.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-400 underline"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-500">No resume uploaded</p>
        )}
      </div>

      {/* Edit Button */}
      <div className="">
        <button
          onClick={handleOpen}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-sm w-96 block mx-auto "
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
            <UpdateProfileForm
              initialData={profileData}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeProfile;
