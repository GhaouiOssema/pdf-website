import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/profile/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data.userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/";
  };

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-center items-center mx-auto px-4 flex">
              <div className="md:space-x-6 justify-between items-center ml-auto flex space-x-3 w-full">
                <div className="hidden xl:block" />
                <div
                  className="justify-center items-center flex relative xl:hidden"
                  onClick={toggleSidebar}
                >
                  {!isSidebarOpen && (
                    <HiMenuAlt1 size={24} className="cursor-pointer" />
                  )}
                </div>
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
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
                          {userData?.profileImage ? (
                            <img
                              src={
                                userData?.profileImage &&
                                `data:image/jpeg;base64,${userData.profileImage}`
                              }
                              className="object-cover h-9 w-9 rounded-fullbg-gray-300"
                              alt="user_picture"
                            />
                          ) : (
                            <Avatar>
                              {userData?.userName &&
                                userData.userName
                                  .trim()
                                  .charAt(0)
                                  .toUpperCase()}
                            </Avatar>
                          )}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <p className="font-semibold text-sm ml-2">
                      {userData?.userName}
                    </p>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
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
                        "&:before": {
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
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to={"/profile"} className="flex items-center">
                        <Avatar>
                          {userData?.userName &&
                            userData.userName.trim().charAt(0).toUpperCase()}
                        </Avatar>
                        Profile
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        to={"/"}
                        onClick={logout}
                        className="flex items-center"
                      >
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </Link>
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
