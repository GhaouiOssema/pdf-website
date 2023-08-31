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

      // Clear form fields
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

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
                    width: "40%", // Adjust this value to control the width of the line
                    height: "3px", // Adjust this value for the height of the line
                    background: "#F0854A", // Adjust the color as needed
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
      <section class="min-h-screen flex items-stretch text-white ">
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
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat object-right items-center IMAG__SCAN">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="text-gray-100 font-bold text-2xl mb-1 text-center">
              Bonjour à nouveau !
            </h1>
            <p className="text-sm font-normal text-gray-50 mb-7 text-center">
              Content de te revoir
            </p>
            <form
              onSubmit={handleSubmit}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Entrez votre adresse e-mail"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  pattern={emailRegex}
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Entrez votre mot de passe."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center text-gray-400 hover:underline hover:text-gray-100">
                <Link to={"/seconnecter/oublier"}>Forgot your password?</Link>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                  sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
