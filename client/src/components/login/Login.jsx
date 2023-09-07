import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo2.png";
import jwt_decode from "jwt-decode";
import { Dialog, DialogActions, DialogContent, Slide } from "@mui/material";
import { Button } from "flowbite-react";
import Footer from "../Footer";

const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, setOpen }) => {
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
            désolé , votre email n'est pas encore vérifié , veuillez vérifier
            votre courrier pour finaliser l' inscription
          </p>
        </DialogContent>
      </>

      <DialogActions>
        <Button onClick={() => setOpen(false)} className="bg-blue-700">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pages = ["connexion", "inscription", "Home"];
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/seconnecter`,
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      const decoded = jwt_decode(token);

      if (decoded.emailVerified) {
        localStorage.setItem("token", token);

        setEmail("");
        setPassword("");

        window.location.href = "/messites";
      } else {
        setOpen(true);
      }
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
      setError(err.response.data.error);
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <div>
      {open && <Popup open={open} setOpen={setOpen} />}
      <div className="h-screen flex flex-col bg-gray-100">
        <header className="fixed w-full z-50 transition-all bg-white top-0 left-0 right-0">
          <nav className="px-4 lg:px-6 py-2.5 bg-none dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
              <a
                href="#"
                className="flex w-full lg:w-1/6 md:w-1/6 justify-center lg:justify-start md:justify-start items-center lg:mb-0 mb-5"
              >
                <img
                  src={LOGO}
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
              </a>
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
                  className="cursor-pointer text-black font-medium text-sm px-4 py-2.5"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {pages[0]}
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
                  ></span>
                </Link>

                <Link
                  to={"/inscription"}
                  className="cursor-pointer text-black font-medium text-sm px-4 py-2.5 mr-2"
                >
                  {pages[1]}
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <div className="relative min-h-screen flex boor bg-gray-100">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-gray-100">
            <div className="w-full xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
              <div className="absolute bg-white inset-0 z-0"></div>
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
          <div className="absolute inset-0  flex justify-center items-center">
            <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
              <div className="max-w-md w-full space-y-8 bg-gray-100 px-10 py-3 rounded-lg">
                <div className="text-center ">
                  <h2 className="mt-6 text-2xl font-sans font-bold text-gray-900">
                    Bonjour à nouveau !
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 font-sans">
                    Content de te revoir
                  </p>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>

                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-sans font-medium mb-2 text-start"
                    >
                      Email :
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="text-black w-full px-4 py-2 border-none rounded-lg font-sans focus:outline-none focus:ring bg-white bg-opacity-90"
                      placeholder="Entrez votre adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      pattern={emailRegex}
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-sans font-medium mb-2 text-start"
                    >
                      Mot de passe :
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="text-black w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring  bg-white bg-opacity-90"
                      placeholder="Entrez votre mot de passe."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link
                        to={"/seconnecter/oublier"}
                        className="text-gray-500 hover:text-blue-500"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-[#125ba3] hover:bg-primary-800 font-sans text-gray-100 font-sans p-4  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Se connecter
                    </button>
                  </div>
                  <p className="flex flex-col items-center justify-center mt-10 font-sans text-center text-md text-gray-500">
                    <span>Vous n'avez pas de compte ?</span>
                    <Link
                      to={"/inscription"}
                      className="text-blue-500 hover:text-blue-800  font-sans no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >
                      Inscription
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

export default Login;
