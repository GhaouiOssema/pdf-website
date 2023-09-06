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
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const pages = ["connexion", "inscription", "Home"];
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userRole", userRole);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/inscription`,
        formData
      );

      if (response.status === 201) {
        setOpen(true);
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

        <section className="min-h-screen flex items-stretch text-white flex-row-reverse">
          <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center IMAG__SCAN">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="w-full px-24 z-10">
              <h1 className="text-5xl font-bold text-left tracking-wide">
                Keep it special
              </h1>
              <p className="text-3xl my-4">
                Capture your personal memory in unique way, anywhere.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
            <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat object-right items-center IMAG__SCAN">
              <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            </div>
            <div className="w-full py-6 z-20 pt-20">
              <h1 className="text-white md:text-gray-800 lg:text-gray-800 xl:text-gray-800 2xl:text-gray-800 font-extrabold text-2xl mb-1 text-center">
                inscription
              </h1>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form
                onSubmit={handleSubmit}
                className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              >
                <div className="pb-2 pt-2">
                  <label
                    htmlFor="pdf-image"
                    className="flex flex-col items-center justify-center w-full h-19 border-2 border-none rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 hover:bg-gray-100 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-2">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Sélectionner un fichier Image
                      </p>
                    </div>
                    <input
                      name="file"
                      id="pdf-image"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      hidden
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="pb-2 pt-2">
                  <label
                    htmlFor="userName"
                    className="text-start font-medium block text-white  lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 mb-2"
                  >
                    Nom d'utilisateur
                  </label>
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

                <div className="pb-2 pt-2">
                  <label
                    htmlFor="email"
                    className="block text-white  lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 text-start font-medium mb-2"
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
                <div className="pb-2 pt-2">
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
                <div className="pb-2 pt-2">
                  <label
                    htmlFor="userRole"
                    className="block text-white  lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 text-start font-medium mb-2"
                  >
                    User Role
                  </label>
                  <input
                    type="text"
                    id="userRole"
                    className="text-black border-none w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                    placeholder="Enter your user role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                  />
                </div>

                <div className="pb-2 pt-7 w-full flex justify-center">
                  <button className="font-medium  block w-1/2 px-4 py-2 text-lg rounded-lg bg-primary-700">
                    S'inscrire
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
