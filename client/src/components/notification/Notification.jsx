import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useEffect, useState } from "react";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { Link } from "react-router-dom";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isRotating, setRotating] = useState(false);

  const fetchNotification = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/notification`,
        config
      );

      if (response.status === 200) {
        setNotifications(response.data.notifications);
      } else {
        setNotifications(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotification();
  }, []);

  const handleRefreshClick = async () => {
    setRotating(true);
    try {
      await fetchNotification();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setRotating(false);
      }, 2500);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6 flex flex-row justify-between items-center flex-wrap w-full mx-auto max-w-screen-lg lg:px-12 px-4 py-6">
        <div className="w-[82%] md:w-[87%] lg:w-[90%] xl:w-[93%] bg-gray-400 flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-md">
          <span className="font-sans font-semibold text-white">
            Mes notification
          </span>
          <span className="font-sans font-normal text-white ">
            {notifications?.length}
          </span>
        </div>
        <span
          className={`bg-white p-2 rounded-full ${
            isRotating ? "animate-spin" : ""
          }`}
        >
          <CachedOutlinedIcon
            sx={{ color: "#125ba3", cursor: "pointer" }}
            onClick={handleRefreshClick}
          />
        </span>
      </div>
      {!loading && notifications.length > 0 ? (
        <div className="bg-gray-100 h-full">
          <div className="flex flex-col items-start justify-start bg-gradient-to-t">
            <div className="w-full">
              <div className="mx-auto max-w-screen-lg lg:px-12 px-4">
                {notifications.map((el, idx) => {
                  const breadcrumbs = [
                    <Typography
                      underline="hover"
                      key="1"
                      sx={{ fontSize: 15 }}
                      color="inherit"
                    >
                      <span className="font-sans">{el.site}</span>
                    </Typography>,
                    <Typography
                      underline="hover"
                      key="2"
                      sx={{ fontSize: 15 }}
                      color="inherit"
                    >
                      <span className="font-sans">{el.dossier}</span>
                    </Typography>,
                    <Typography
                      key="3"
                      sx={{ fontSize: 15 }}
                      color="text.primary"
                    >
                      <span className="font-sans">{el.equipementName}</span>
                    </Typography>,
                  ];
                  const notificationDateTime = new Date(el.notificationDate);
                  const datePart = notificationDateTime.toLocaleDateString([], {
                    dateStyle: "short",
                  });
                  const timePart = notificationDateTime.toLocaleTimeString([], {
                    hour12: false,
                    timeStyle: "short",
                  });

                  return (
                    <div
                      key={idx}
                      className="w-full flex justify-between py-2 px-2 bg-white rounded-md mt-5"
                    >
                      <Link
                        to={`/${el.site}/${el.dossier}/pdf/détails/${el.equipementId}`}
                        className="flex items-center space-x-2 md:space-x-4 lg:space-x-4 xl:space-x-4 cursor-pointer"
                      >
                        <NotificationAddIcon sx={{ color: "#125ba3" }} />
                        <div className="flex flex-col w-full space-y-1">
                          <span className="font-sans font-semibold">
                            Un nouveau rapport a été ajouté
                          </span>
                          <span className="text-sm md:text-base">
                            <Stack spacing={2}>
                              <Breadcrumbs
                                separator="›"
                                aria-label="breadcrumb"
                              >
                                {breadcrumbs}
                              </Breadcrumbs>
                            </Stack>
                          </span>
                        </div>
                      </Link>
                      <div className="flex flex-col items-center justify-center px-1 md:px-4 lg:px-4 xl:px-4 text-stone-600 text-xs md:text-sm">
                        <span className="w-full flex justify-end">
                          {timePart}
                        </span>
                        <span className="">{datePart}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="w-full h-full flex flex-col items-center pt-20">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center pt-20 opacity-20">
          <NotificationsOffRoundedIcon
            sx={{
              height: 250,
              width: 250,
              opacity: "100%",
              color: "black",
            }}
          />
          <p className="w-full font-sans font-bold text-xl text-center">
            Vous n'avez reçu aucun rapport jusqu'à présent.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notification;
