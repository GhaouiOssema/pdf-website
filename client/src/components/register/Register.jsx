import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LOGO from "../../assets/logo2.png";
import Footer from "../Footer";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const pages = ["connexion", "inscription", "Home"];

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

      navigate("/seconnecter");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred.");
      }
      console.error(err);
    }
  };
  const handleImageClear = () => {
    setSelectedFile(null);
  };

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

  const isActiveNavItem = (navItem) => {
    return location.pathname === navItem;
  };

  return (
    <div className="w-full">
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
                className="cursor-pointer text-black text-sm px-4 py-2.5 mr-2"
              >
                {pages[0]}
              </Link>
              <Link
                to={"/inscription"}
                className="cursor-pointer text-black font-medium text-sm px-4 py-2.5 mr-2 line-container-2"
              >
                {pages[1]}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex justify-center items-center mt-[8rem] mb-[1rem] h-full w-full">
        <form
          className={`${
            screenSize.width > 700
              ? "w-1/3 p-6 bg-white rounded shadow-lg"
              : "bg-white rounded shadow-lg w-full p-3"
          }`}
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {/* Form fields */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="userRole"
              className="block text-gray-700 font-bold mb-2"
            >
              User Role
            </label>
            <input
              type="text"
              id="userRole"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your user role"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
