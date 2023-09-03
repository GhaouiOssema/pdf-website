import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo2.png";

const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pages = ["connexion", "inscription", "Home"];

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
      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");
      alert("Login successful!");

      window.location.href = "/messites";
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <div className="h-screen flex flex-col">
      <header className="fixed w-full z-50 transition-all bg-white top-0 left-0 right-0">
        <nav className="px-4 lg:px-6 py-2.5 bg-none dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
            <a
              href="#"
              className="flex w-full lg:w-1/6 md:w-1/6 justify-center lg:justify-start md:justify-start items-center lg:mb-0 mb-5"
            >
              <img src={LOGO} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
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
      <section className="min-h-screen flex items-stretch text-white ">
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
          <div className="w-full py-6 z-20">
            <h1 className="text-white md:text-gray-800 lg:text-gray-800 xl:text-gray-800 2xl:text-gray-800 font-extrabold text-2xl mb-1 text-center">
              Bonjour à nouveau !
            </h1>
            <p className="text-sm font-medium text-white md:text-gray-600 lg:text-gray-600 xl:text-gray-600 2xl:text-gray-600 mb-7 text-center">
              Content de te revoir
            </p>
            <form
              onSubmit={handleSubmit}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-2">
                <label
                  htmlFor="password"
                  className="block text-white md:text-gray-700 lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 font-medium mb-2 text-start"
                >
                  Email :
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="text-black w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring"
                  placeholder="Entrez votre adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  pattern={emailRegex}
                />
              </div>

              <div className="pb-2 pt-2">
                <label
                  htmlFor="password"
                  className="block text-white  lg:text-gray-700 xl:text-gray-700 2xl:text-gray-700 font-medium mb-2 text-start"
                >
                  Mot de passe :
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="text-black w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring"
                  placeholder="Entrez votre mot de passe."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pb-2 pt-7">
                <button className="font-medium  block w-full px-4 py-2 text-lg rounded-lg bg-primary-700">
                  Se connecter
                </button>
              </div>
              <div className="text-center text-white md:text-gray-600 lg:text-gray-600 xl:text-gray-600 2xl:text-gray-600 hover:underline font-medium hover:text-gray-800">
                <Link to={"/seconnecter/oublier"}>Mot de passe oublié?</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
