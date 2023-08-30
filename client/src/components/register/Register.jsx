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

  return (
    <div className="h-full flex flex-col bg-gray-100">
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
                    width: "40%", // Adjust this value to control the width of the line
                    height: "3px", // Adjust this value for the height of the line
                    background: "#F0854A", // Adjust the color as needed
                  }}
                />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="mt-10 flex justify-center items-center h-full w-full">
        <form
          className="bg-white rounded shadow- w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <label className="flex justify-between text-gray-700 font-bold mb-2">
              Votre Image
              {selectedFile && (
                <div
                  className="text-black cursor-pointer"
                  onClick={handleImageClear}
                >
                  <CancelOutlinedIcon />
                </div>
              )}
            </label>
            <div className="flex items-center justify-center w-full">
              {selectedFile ? (
                <div className="relative mb-4">
                  <label htmlFor="pdf-image" className="cursor-pointer">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected file"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "300px",
                        maxHeight: "300px",
                      }}
                    />
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="pdf-image"
                  className="flex flex-col items-center justify-center w-full h-19 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:hover:border-gray-500"
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
              )}
            </div>
          </div>{" "}
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
