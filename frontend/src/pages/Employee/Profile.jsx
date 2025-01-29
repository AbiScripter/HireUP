import React, { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Edit3,
  Link as LinkIcon,
  GraduationCap,
  Building2,
  Trophy,
  AlertCircle,
} from "lucide-react";
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
    <div className="max-w-4xl mx-auto my-10 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary text-2xl font-bold shadow-lg">
              {profile?.fullname?.charAt(0) || "?"}
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl font-bold mb-2">{profile?.fullname}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                {profile?.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profile?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <InfoCard
          icon={Phone}
          title="Contact Number"
          value={profile?.mobile}
          emptyMessage="Add your contact number to help recruiters reach you"
        />

        {/* Current Position */}
        <InfoCard
          icon={Building2}
          title="Current Position"
          value={profile?.currentPosition}
          emptyMessage="Add your current job position"
        />

        {/* Education */}
        <InfoCard
          icon={GraduationCap}
          title="Education"
          value={profile?.education}
          emptyMessage="Add your educational background"
        />

        {/* Experience */}
        <InfoCard
          icon={Briefcase}
          title="Experience"
          value={`${profile?.experience}`}
          emptyMessage="Add your years of experience"
        />
      </div>

      {/* Skills Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Top Skills</h2>
        </div>

        {profile?.topSkills?.length > 0 ? (
          <div className="flex flex-wrap gap-3 ml-12">
            {profile.topSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium uppercase"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <div className="">
            <EmptyState message="Add your top skills to highlight your expertise" />
          </div>
        )}
      </div>

      {/* Resume Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Resume</h2>
          </div>

          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              View Resume
            </a>
          )}
        </div>

        {!profile?.resumeUrl && (
          <div className="mt-4">
            <EmptyState message="Upload your resume to apply for jobs" />
          </div>
        )}
      </div>

      {/* Edit Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Edit3 className="w-4 h-4" />
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
          <UpdateProfileForm initialData={profile} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-3 rounded-lg">
    <AlertCircle className="w-4 h-4" />
    <p className="text-sm">{message}</p>
  </div>
);

const InfoCard = ({ icon: Icon, title, value, emptyMessage }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h3 className="font-medium text-gray-700">{title}</h3>
    </div>
    {value ? (
      <p className="text-gray-600 ml-10">{value}</p>
    ) : (
      <div className="">
        <EmptyState message={emptyMessage} />
      </div>
    )}
  </div>
);

export default EmployeeProfile;
