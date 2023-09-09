import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@mui/material";
import { Button } from "flowbite-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, setOpen, messageError }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <>
        <DialogContent>
          <div className="text-red-500 text-4xl mb-4 flex justify-center items-center">
            <i class="fa-solid fa-triangle-exclamation"></i>{" "}
          </div>
          <p className="text-xl font-sans font-medium text-red-500 text-center">
            {messageError}
          </p>
        </DialogContent>
      </>
    </Dialog>
  );
};

const ResetPasswordForm = () => {
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const expiration = searchParams.get("expiration");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [linkExpired, setLinkExpired] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState("");
  const popupRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const expirationTime = parseInt(expiration);
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      setLinkExpired(true);
    }
  }, [expiration]);

  const passWordhandleChange = (e) => {
    setPassword(e.target.value);
    validatePassword(password);
  };

  const validatePassword = (value) => {
    const hasNumber = /\d/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);

    setIsValid(hasNumber && hasUppercase && hasLowercase);
  };

  let conditions = 0;

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const expiration = Date.now() + 600000;

      if (confirmPassword !== password) {
        setMessageError(
          "Les mots de passe ne se correspondent pas,Veuillez réessayer."
        );
        setOpen(true);
      } else if (confirmPassword === password && !isValid) {
        setMessageError("le mot de passe ne vérifie pas aux conditions!");

        setOpen(true);
      } else {
        setLoading(true);

        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/reset-password`,
          {
            email,
            password,
            expiration,
          }
        );

        if (res.status === 200) {
          setIsResetSuccess(true);
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };

  if (linkExpired) {
    return (
      <div className="pt-20 h-screen">
        <div className="text-red-500 text-4xl mb-4 flex justify-center items-center">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <p className="text-xl font-semibold text-red-500 mb-4 text-center">
          Le lien a expiré
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-center h-screen bg-white"
      ref={popupRef}
    >
      {open && (
        <Popup open={open} setOpen={setOpen} messageError={messageError} />
      )}
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="relative grid place-items-center mx-2 my-20 sm:my-auto ">
        <div className="bg-gray-100 w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 rounded-lg shadow-md lg:shadow-lg">
          {isResetSuccess && loading === false ? (
            <div>
              <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <p className="text-sm md:text-md lg:text-lg xl:text-xl font-sans font-semibold text-green-500 mb-4 text-center">
                Votre mot de passe a été réinitialisé avec succès.
              </p>

              <Link to="/seconnecter" className="font-sans">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#125ba3] rounded-lg font-sans font-medium text-white text-sm md:text-md lg:text-lg xl:text-xl focus:outline-none hover:shadow-none"
                >
                  se connecter
                </button>
              </Link>
            </div>
          ) : loading === true ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div>
              <form className="space-y-5" onSubmit={handleResetPassword}>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Entrez votre nouveau mot de passe"
                    value={password}
                    onChange={passWordhandleChange}
                    required
                  />
                  <div className="flex -mx-1 py-1 items-center">
                    {password !== "" &&
                      [
                        {
                          condition: /[a-z]/.test(password),
                          color: "bg-red-500",
                        },
                        {
                          condition: /[A-Z]/.test(password),
                          color: "bg-red-500",
                        },
                        {
                          condition: /\d/.test(password),
                          color: "bg-red-500",
                        },
                      ].map((item, i) => {
                        if (item.condition) {
                          conditions += 1;
                          item.color = "bg-green-500";
                        }
                        return (
                          <div className="w-full px-1" key={i}>
                            <div
                              className={`h-2 rounded-xl transition-colors ${item.color}`}
                            ></div>
                          </div>
                        );
                      })}
                    {password !== "" && (
                      <div className="relative inline-block">
                        <div
                          className="cursor-pointer"
                          onMouseEnter={handleTooltipOpen}
                          onMouseLeave={handleTooltipClose}
                          onClick={handleTooltipOpen}
                        >
                          <InfoOutlinedIcon
                            className={`text-${
                              conditions === 3 ? "green" : "red"
                            }-500`}
                          />
                        </div>
                        {tooltipOpen && (
                          <div className="absolute top-0 right-0 mt-8 ml-2 p-2 bg-gray-100 w-80 text-gray-800 text-sm rounded-lg shadow-lg z-20 font-sans font-light">
                            Le mot de passe doit inclure au minimum 2 chiffres,
                            une lettre majuscule et une lettre minuscule.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirmez le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="absolute jus inset-y-0  right-0 mt-7 flex justify-center items-center cursor-pointer pr-2">
                    {confirmPassword != "" &&
                      (password === confirmPassword ? (
                        <DoneIcon sx={{ color: "green" }} />
                      ) : (
                        <ClearIcon sx={{ color: "red" }} />
                      ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-10 bg-[#125ba3] rounded-lg font-sans font-medium text-white focus:outline-none hover:shadow-none"
                >
                  réinitialiser le mot de passe
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
