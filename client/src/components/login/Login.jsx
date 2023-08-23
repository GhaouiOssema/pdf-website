import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo2.png";
import Footer from "../Footer";

const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const pages = ["connexion", "inscription", "Home"];

  const isActiveNavItem = (navItem) => {
    return location.pathname === navItem;
  };

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
    <div className="">
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
      <div className="flex justify-center items-center mt-[8rem] mb-[1rem] h-full">
        <div
          className={`mb-5 ${
            screenSize.width > 700 ? "w-1/3" : "w-full"
          } p-6 bg-white rounded shadow-lg`}
        >
          <form onSubmit={handleSubmit} className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                  screenSize.width > 700 ? "" : "text-sm"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern={emailRegex}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                  screenSize.width > 700 ? "" : "text-sm"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <Link to="/seconnecter/oublier">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
