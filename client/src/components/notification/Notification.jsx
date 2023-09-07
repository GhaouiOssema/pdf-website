import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useEffect, useState } from "react";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotification = async () => {
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

    setLoading(true);
    fetchNotification();
  }, []);
  console.log(notifications);

  return (
    <div className="bg-gray-100">
      {/* {loading ? (
        <div className="w-full h-full flex flex-col items-center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      ) : notifications && notifications.length > 0 && !loading ? (
        <div className="bg-gray-100 min-h-screen">
          <div className="flex flex-col items-start justify-center min-h-screen bg-gradient-to-t p-6">
            <div className="w-full">
              <div className="grid grid-cols-1 h-full">
                {notifications &&
                  notifications
                    ?.sort(
                      (a, b) =>
                        new Date(b.notificationDate) -
                        new Date(a.notificationDate)
                    )
                    ?.map((el, idx) => {
                      const breadcrumbs = [
                        <Typography underline="hover" key="1" color="inherit">
                          {el.site}
                        </Typography>,
                        <Typography underline="hover" key="2" color="inherit">
                          {el.dossier}
                        </Typography>,
                        <Typography key="3" color="text.primary">
                          {el.equipementName}
                        </Typography>,
                      ];
                      const notificationDateTime = new Date(
                        el.notificationDate
                      );
                      const datePart = notificationDateTime.toLocaleDateString(
                        [],
                        {
                          dateStyle: "short",
                        }
                      );
                      const timePart = notificationDateTime.toLocaleTimeString(
                        [],
                        {
                          timeStyle: "short",
                        }
                      );
                      return (
                        <div
                          key={idx}
                          className="flex justify-between py-2 px-4 bg-white rounded-md mt-5"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col space-y-1">
                              <span className="font-bold">
                                Un nouveaux raport a été ajouté
                              </span>
                              <span className="text-sm">
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
                          </div>
                          <div className="flex flex-col items-center justify-center px-4 text-stone-600 text-xs md:text-sm">
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
      ) : !notifications && !loading ? (
        <p className="text-center mt-4">Il n'existe aucun dossier.</p>
        ) : null} */}
      <div className="p-0 m-0 min-h-[90vh] flex justify-center items-center md:min-h-[100vh] lg:min-h-0 lg:h-[100vh] xl:h-[100vh] opacity-20">
        <div className="flex flex-col justify-center items-center">
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
      </div>
    </div>
  );
};

export default Notification;
