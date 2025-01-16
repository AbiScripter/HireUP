import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { LogOut, Heart, BriefcaseBusiness, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { getEmployeeData } from "../services/api";

const AccountMenu = React.memo(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function fetchEmployerData() {
      try {
        setLoading(true);
        const fetchedEmployerData = await getEmployeeData();
        // console.log(fetchedEmployerData);
        // console.log(fetchedEmployerData.data.user_data);
        setUserData(fetchedEmployerData.data.user_data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployerData();
  }, []);

  // !Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {userData?.username.slice(0, 1).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar />
          <div className="flex-grow">
            <h2 className="font-semibold text-base text-gray-800">
              {userData?.username || "Username"}
            </h2>
            <h2 className="text-sm text-gray-500">
              {userData?.email || "user@example.com"}
            </h2>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <UserRound size={20} />
          </ListItemIcon>
          <Link to="/employee/profile">Profile</Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BriefcaseBusiness size={20} />
          </ListItemIcon>
          My Jobs
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Heart size={20} />
          </ListItemIcon>
          Saved Jobs
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={20} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
});

export default AccountMenu;
