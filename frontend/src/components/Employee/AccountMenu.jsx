import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Link } from "react-router-dom";
import { getEmployeeBasicDetailsThunk } from "../../redux/reducers/employee/employeeNavbar";

const AccountMenu = () => {
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const { employeeData } = useSelector((state) => state.employeeNavbar);

  // fetch basic employee details like username and email
  useEffect(() => {
    if (!employeeData) {
      dispatch(getEmployeeBasicDetailsThunk());
    }
  }, [dispatch, employeeData]);

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employee_id");
    window.location.href = "/";
    // navigate("/");
  };

  // Menu event listeners
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Avatar sx={{ width: 36, height: 36, bgcolor: "#731bc3" }}>
              {employeeData?.username.slice(0, 1).toUpperCase()}
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
              "& .MuiMenuItem-gutters:hover ": {
                bgcolor: "lightgray",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* List items in account menu username,profile etc */}
        <MenuItem>
          <Avatar />
          <div className="flex-grow">
            <h2 className="font-semibold text-base text-gray-800 capitalize">
              {employeeData?.username || "Username"}
            </h2>
            <h2 className="text-sm text-gray-500">
              {employeeData?.email || "user@example.com"}
            </h2>
          </div>
        </MenuItem>

        <Divider />

        <Link to="/employee/profile">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <UserRound size={20} />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>

        <Link to="/employee/applied">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <BriefcaseBusiness size={20} />
            </ListItemIcon>
            My Jobs
          </MenuItem>
        </Link>

        <Link to="/employee/favourites">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Heart size={20} />
            </ListItemIcon>
            Saved Jobs
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout} style={{ color: "red" }}>
          <ListItemIcon>
            <LogOut size={20} color="red" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
