import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LOGO from "../../assets/logo2.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <>
        <DialogContent>
          <div className="text-[#125ba3] text-4xl mb-4 flex justify-center items-center">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <p className="font-sans font-semibold text-[#125ba3] text-center">
            Un email du verification a été envoyé à votre boîte mail.
          </p>
        </DialogContent>
      </>
    </Dialog>
  );
};

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const popupRef = useRef(null);

  const pages = ["connexion", "inscription", "Home"];

  const [open, setOpen] = useState(false);

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

  const passWordhandleChange = (e) => {
    setPassword(e.target.value);
    validatePassword(password);
  };

  const validatePassword = (value) => {
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/.test(value);

    setIsValid(isValidPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userRole", userRole);

      if (confirmPassword === password && isValid) {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/inscription`,
          formData
        );

        if (response.status === 201) {
          setOpen(true);
        }
      } else if (!isValid) {
        setError("password not matched");
      } else {
        setError("Confirmez le mot de passe");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred.");
      }
      console.error(err);
    }
  };

  let conditions = 0;

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <div ref={popupRef}>
      {open && <Popup open={open} setOpen={setOpen} />}
      <div className="h-full flex flex-col bg-gray-100">
        <header className="fixed w-full z-50 transition-all bg-white top-0 left-0 right-0">
          <nav className="px-4 lg:px-6 py-2.5 bg-none dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
              <Link
                to={"/"}
                className="flex w-full lg:w-1/6 md:w-1/6 justify-center lg:justify-start md:justify-start items-center lg:mb-0 mb-5"
              >
                <img
                  src={LOGO}
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
              </Link>
              <div className="flex justify-center items-center lg:w-[26.2%] md:w-[26.2%] w-full">
                <Link
                  to={"/"}
                  onClick={() => setOpenMenu(false)}
                  className="cursor-pointer text-black text-sm px-4 py-2.5 mr-2"
                >
                  {pages[2]}
                </Link>
                <Link
                  to={"/seconnecter"}
                  className="cursor-pointer text-black text-sm px-4 py-2.5 mr-2"
                >
                  {pages[0]}
                </Link>
                <Link
                  to={"/inscription"}
                  className="cursor-pointer text-black font-medium text-sm px-4 py-2.5 mr-2"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {pages[1]}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "40%",
                      height: "3px",
                      background: "#F0854A",
                    }}
                  />
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative min-h-screen flex pt-[30%] md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0 bg-gray-100">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-gray-100">
            <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
              <div className="absolute bg-white inset-0 z-0"></div>
              <div className="w-full  max-w-md z-10">
                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  <p className="mt-10 text-[#125ba3] leading-[3.4rem]">
                    Créez votre compte en quelques étapes{" "}
                    <span className="text-[#F0854A]">simples!</span>
                  </p>
                </div>
              </div>
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-14 lg:p-14 sm:rounded-lg md:rounded-none  bg-gray-100">
              <div className="max-w-md w-full space-y-8 h-full flex flex-col justify-end">
                <form
                  className="mt-0 md:mt-10 lg:mt-10 xl:mt-10 w-full flex flex-col justify-center"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div className="relative">
                    <span className="text-start  text-gray-700 font-sans font-medium mb-2">
                      Nom d'utilisateur* :
                    </span>
                    <input
                      type="text"
                      id="userName"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring  bg-white bg-opacity-90"
                      placeholder="Entrez votre nom d'utilisateur"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-4 content-center">
                    <label
                      htmlFor="email"
                      className="block  text-gray-700 font-sans font-medium text-start mb-2"
                    >
                      Email* :
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring  bg-white bg-opacity-90"
                      placeholder="Entrez votre adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-4 content-center">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-sans font-medium mb-2"
                    >
                      Mot de passe* :
                    </label>
                    <input
                      type="text"
                      id="password"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring  bg-white bg-opacity-90"
                      placeholder="Entrez votre mot de passe."
                      value={password}
                      onChange={passWordhandleChange}
                      required
                    />
                    <div className="flex -mx-1 py-1 items-center">
                      {password !== "" && (
                        <>
                          {[
                            {
                              condition: password.length >= 8,
                              color: "bg-red-500",
                            },
                            {
                              condition:
                                /[a-z]/.test(password) &&
                                /[A-Z]/.test(password),
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
                              <div className="absolute top-0 right-0 mt-8 ml-2 p-2 bg-white w-80 text-gray-800 text-sm rounded-lg shadow-lg z-20 font-sans font-light">
                                Le mot de passe doit inclure au minimum 8
                                caractères, une lettre majuscule et un chiffre .
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="relative mt-4 content-center">
                    <label
                      htmlFor="email"
                      className="block  text-gray-700 font-sans font-medium mb-2"
                    >
                      Confirmez votre mot de passe* :
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring  bg-white bg-opacity-90"
                      placeholder="Retapez votre mot de passe"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div className="absolute jus inset-y-0 right-0 mt-7 flex justify-center items-center pr-2">
                      {confirmPassword != "" &&
                        (password === confirmPassword ? (
                          <DoneIcon sx={{ color: "green" }} />
                        ) : (
                          <ClearIcon sx={{ color: "red" }} />
                        ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="mt-10 w-full flex justify-center hover:bg-[#F0854A] bg-[#125ba3] text-gray-100 font-sans p-4  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      S'inscrire
                    </button>
                  </div>

                  <p className=" flex flex-col items-center justify-center mt-10 font-sans text-center text- text-gray-500">
                    <div className="text-center ">
                      {error && (
                        <div className="font-sans font-medium text-red-500">
                          {error}
                        </div>
                      )}
                    </div>
                    <span>Vous avez déjà un compte ?</span>
                    <Link
                      to={"/seconnecter"}
                      className="text-blue-500 hover:text-blue-800  font-sans no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >
                      Se connecter.
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
