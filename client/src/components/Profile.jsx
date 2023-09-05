import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";

import jwt_decode from "jwt-decode";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, setOpen, dialogType }) => {
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [codeVerification, setCodeVerification] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmitUserName = async (e) => {
    setOpen(true);

    try {
      const requestData = {
        userName,
        userPassword,
      };

      const decoded = jwt_decode(token);
      const id = decoded.userId;

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_API_URL}/profile/user/${id}/username`,
        requestData,
        config
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Mot de passe incorrect");
    }
  };

  const handleSubmitVerificationCode = async (e) => {
    try {
      const requestData = {
        verificationCode: codeVerification,
        userPassword,
      };

      const decoded = jwt_decode(token);
      const id = decoded.userId;

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_API_URL}/profile/user/${id}/code`,
        requestData,
        config
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Mot de passe incorrect");
    }
  };

  const handleClose = () => {
    if (dialogType === "Nom d'utilisateur") {
      handleSubmitUserName();
    } else if (dialogType === "Code de vérification") {
      handleSubmitVerificationCode();
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      {dialogType !== "change" ? (
        <>
          <DialogTitle>
            {dialogType !== "change" && (
              <h1 className="text-base font-sans font-semibold tracking-wide text-center">
                Merci de saisir les informations ci dessous
              </h1>
            )}
          </DialogTitle>
          <DialogContent>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
            >
              {dialogType === "Nom d'utilisateur"
                ? "Nom"
                : "code du verification"}
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
              placeholder={
                dialogType === "Nom d'utilisateur"
                  ? "nouveaux nom d'utilisateur"
                  : "Nouvelle code de vérification"
              }
              required
              value={
                dialogType === "Nom d'utilisateur" ? userName : codeVerification
              }
              onChange={(e) =>
                dialogType === "Nom d'utilisateur"
                  ? setUserName(e.target.value)
                  : setCodeVerification(e.target.value)
              }
            />
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-md font-sans font-medium text-gray-900 dark:text-white"
            >
              Mot de passe
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
              placeholder="mot de passe"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent>
            <div className="">
              <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <p className="text-xl font-sans font-medium text-green-500 text-center">
                Un email a été envoyé à votre boîte mail.
              </p>
            </div>
          </DialogContent>
        </>
      )}

      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          {dialogType === "change" ? "Fermer" : "Annuler"}
        </Button>
        {dialogType !== "change" && (
          <Button onClick={handleClose}>Modifier</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(userData?.email);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dialogType, setDialogType] = useState("");
  const [isExpended, setIsExpended] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

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

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setDialogType("change");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/forgot-password`,
        {
          email: userData.email,
          emailType: "change",
        }
      );
      if (res.status === 200) {
        setOpen(true);
      }
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while sending the reset email. Please try again."
      );
    }
  };

  if (userData === null || userData === undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {open && <Popup open={open} setOpen={setOpen} dialogType={dialogType} />}
      <div className="bg-gray-100 h-screen py-0 md:py-[10%]">
        <div className="container mx-auto">
          <div className="md:flex flex-col justify-center items-center flex-wrap">
            <div className="w-full md:w-[75%] flex justify-center flex-wrap lg:flex-nowrap xl:flex-nowrap">
              <div className="h-full w-full flex justify-between items-center flex-wrap lg:flex-nowrap xl:flex-nowrap mb-3 rounded-b-md shadow-md border-t-4 border-blue-700">
                <div className="bg-white rounded-b-md w-full p-3">
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {userData.userName}
                  </h1>

                  <ul className="text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-blue-700 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Membre depuis</span>
                      <span className="ml-auto">
                        {formatDate(userData.userCreationAccountDate)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white h-full mb-4 lg:mb-4 xl:mb-4 ml-0 lg:ml-3 pb-[8.8px] xl:ml-3 flex justify-between items-center flex-wrap lg:flex-nowrap xl:flex-nowrap w-full rounded-b-md shadow-md border-t-4 border-blue-700">
                <div className="flex flex-col w-full p-3 rounded-b-md">
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {userData.userName}
                  </h1>
                  <div className="my-2 mt-3 flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <div className="flex items-center font-semibold text-gray-900 leading-8 ">
                      <span className="text-blue-700 mr-2">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide whitespace-nowrap">
                        Nombre des equiments
                      </span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-blue-700">
                          {userData.allPdfs.length}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="my-2 mt-3 flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <div className="flex items-center  font-semibold text-gray-900 leading-8 ">
                      <span className="text-blue-700 mr-2">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide whitespace-nowrap">
                        Nombre des sites
                      </span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-blue-700">
                          {userData.folders.length}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[75%]">
              <div className="bg-white shadow-md border-t-4 rounded-b-md border-blue-700">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-blue-700">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">À propos</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Nom d'utilisateur
                      </div>
                      <div className="px-4 py-2"> {userData.userName} </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Mot de passe
                      </div>
                      <div className="px-4 py-2">password</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-xs md:text-sm">
                        Code de vérification
                      </div>
                      <div className="px-4 py-2">
                        {userData.verification_code}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-xs md:text-sm">
                        Email
                      </div>
                      <div className="px-4 py-2 break-words">
                        {userData.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4"></div>
            </div>
            <div className="w-full md:w-[75%]">
              <div className="bg-white shadow-md border-t-4 rounded-b-md border-blue-700">
                <div
                  onClick={() => setIsExpended((prev) => !prev)}
                  className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 cursor-pointer"
                >
                  <span className="text-blue-700">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <div className="w-full flex justify-between items-center flex-wrap">
                    <span className="text-sm lg:tex-base xl:text-base tracking-wide my-1">
                      Modifier vos information personnel
                    </span>
                    <span className="cursor-pointer">
                      {isExpended ? (
                        <KeyboardArrowDownOutlinedIcon />
                      ) : (
                        <KeyboardArrowLeftOutlinedIcon />
                      )}
                    </span>
                  </div>
                </div>
                {isExpended && (
                  <div
                    className={`${
                      isExpended
                        ? "translate-x-0 opacity-100 transition-transform transition-opacity ease-in-out duration-300"
                        : "translate-x-full opacity-0"
                    } text-gray-700 transform`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 text-sm py-3 px-3">
                      <div className="grid items-center grid-cols-2 justify-between">
                        <div className="font-semibold">Nom d'utilisateur</div>
                        <div className="flex justify-end w-[85%] cursor-pointer">
                          <EditNoteOutlinedIcon
                            sx={{ fontSize: 20 }}
                            className="w-5 h-5 text-blue-700"
                            onClick={() => {
                              setOpen(true);
                              setDialogType("Nom d'utilisateur");
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid items-center grid-cols-2 py-2">
                        <div className="px-0 lg:px-4 xl:px-4 font-semibold">
                          Mot de passe
                        </div>
                        <div className="flex justify-end w-[85%] cursor-pointer">
                          <EditNoteOutlinedIcon
                            sx={{ fontSize: 20 }}
                            className="w-5 h-5 text-blue-700"
                            onClick={handleResetPassword}
                          />
                        </div>
                      </div>
                      <div className=" grid items-center grid-cols-2 py-2">
                        <div className="text-sm font-semibold">
                          Code de vérification
                        </div>
                        <div className="flex justify-end w-[85%] cursor-pointer">
                          <EditNoteOutlinedIcon
                            sx={{ fontSize: 20 }}
                            className="w-5 h-5 text-blue-700"
                            onClick={() => {
                              setOpen(true);
                              setDialogType("Code de vérification");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="my-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
