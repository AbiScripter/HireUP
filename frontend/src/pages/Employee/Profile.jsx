import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Edit3,
  FileText,
} from "lucide-react"; // Importing icons from lucide-react
import { Box, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyle } from "../Employer/Dashboard";
import UpdateProfileForm from "../../components/Employee/UpdateProfileForm";
import Loader from "../../components/Loader";
import { fetchProfileThunk } from "../../redux/reducers/employee/employeeProfile";

const EmployeeProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const {
    profileData: profile,
    loading,
    error,
  } = useSelector((state) => state.employeeProfile);

  console.log(profile);

  useEffect(() => {
    // Dispatch the thunk to fetch jobs
    if (!profile) {
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
    <>
      <div className="max-w-xl mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-700 p-6 text-center text-white">
          <h1 className="text-2xl font-bold">{profile?.fullname}</h1>
          <p className="text-sm flex justify-center items-center gap-1">
            <MapPin size={16} className="inline" />
            {profile?.location}
          </p>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6 flex flex-col gap-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              Contact Information
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Mail size={16} /> {profile?.email}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={16} /> {profile?.mobile}
            </p>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              Professional Summary
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Briefcase size={16} /> {profile?.yearsOfExperience} years of
              experience
            </p>
          </div>

          {/* Top Skills */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <Award size={22} /> Top Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile?.topSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium"
                >
                  {skill.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FileText size={20} /> Resume
            </h2>
            {profile?.resumeUrl ? (
              <a
                href={profile?.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primaryhover"
              >
                View Resume
              </a>
            ) : (
              <p>No resume uploaded</p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleOpen}
              className="flex items-center justify-center bg-primary hover:bg-primaryhover text-white py-2 rounded-md w-full gap-2"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>

            {/* Modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={ModalStyle}>
                <UpdateProfileForm
                  initialData={profile}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
