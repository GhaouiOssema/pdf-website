import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LOGO from "../../assets/logo2.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@mui/material";

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
          <div className="text-green-500 text-4xl mb-4 flex justify-center items-center">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <p className="text-xl font-sans font-medium text-green-500 text-center">
            Un email du verification a été envoyé à votre boîte mail.
          </p>
        </DialogContent>
      </>

      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false), navigate("/seconnecter");
          }}
        >
          Fermer
        </Button>
      </DialogActions>
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

  const pages = ["connexion", "inscription", "Home"];

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userRole", userRole);

      if (confirmPassword === password) {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/inscription`,
          formData
        );

        if (response.status === 201) {
          setOpen(true);
        }
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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <div>
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
            <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-gray-100">
              <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    Bonjour à nouveau !
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Content de te revoir
                  </p>
                  {error && (
                    <p className="font-sans font-medium text-red-500 mb-4">
                      {error}
                    </p>
                  )}
                </div>

                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div className="relative">
                    <span className="text-start font-sans block text-black mb-2">
                      Nom d'utilisateur
                    </span>
                    <input
                      type="text"
                      id="userName"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                      placeholder="Entrez votre nom d'utilisateur"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label
                      htmlFor="email"
                      className="block text-white font-sans font-medium lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 text-start mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                      placeholder="Entrez votre adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label
                      htmlFor="password"
                      className="block text-white  lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 text-start font-medium mb-2"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                      placeholder="Entrez votre mot de passe."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label
                      htmlFor="email"
                      className="block text-white  lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 text-start font-medium mb-2"
                    >
                      Confirmez votre mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                      placeholder="Entrez votre adresse e-mail"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-primary-700 hover:bg-primary-800 text-gray-100 p-4  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Se connecter
                    </button>
                  </div>
                  <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Vous n'avez pas de compte ?</span>
                    <Link
                      to={"/inscription"}
                      className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >
                      Inscription
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
              <div className="absolute bg-primary-700 opacity-75 inset-0 z-0"></div>
              <div className="w-full  max-w-md z-10">
                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  Reference site about Lorem Ipsum..
                </div>
                <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                  What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book it has?
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
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        {/* <footer className="text-gray-600 body-font bg-gray-100 absolute bottom-0 w-full">
          <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
            <div className="w-full flex sm:flex-row flex-col items-center justify-around">
              <a className="ml-0 md:ml-20 lg:ml20 xl:ml:40 2xl:ml-40 flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <img
                  src={LOGO}
                  alt="logo"
                  className="w-40 h-full hidden md:block"
                />
              </a>
              <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                &copy; {new Date().getFullYear()} WeCom. Tous droits réservés.
              </p>
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start mr-0 lg:mr20 xl:mr:40 2xl:mr-40">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
};

export default Register;
