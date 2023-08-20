import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LOGO from "../assets/logo2.png";

const pages = ["telecharger", "mes plans", "connexion", "inscription", "Home"];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token expiration
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token has expired
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      } else {
        // Token is valid
        setIsAuthenticated(true);
      }
    } else {
      // No token found
      setIsAuthenticated(false);
    }
  }, []);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/";
  };

  const isActiveNavItem = (navItem) => {
    return location.pathname === navItem;
  };

  return (
    <header className="fixed w-full z-50 bg-white">
      <dic className="hidden"></dic>
      <nav className="px-4 lg:px-6 py-2.5 bg-none dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <a
            href="https://flowbite.com"
            className="flex w-full lg:w-1/6 md:w-1/6 justify-center lg:justify-start md:justify-start items-center lg:mb-0 mb-5"
          >
            <img src={LOGO} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          </a>
          <div className="flex items-center lg:w-[26.2%] md:w-[26.2%] w-full">
            <div>
              <Link
                to={"/"}
                onClick={() => setOpenMenu(false)} // Close the menu after clicking
                className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                  isActiveNavItem("/") ? "line-container" : ""
                }`}
              >
                {pages[4]}
              </Link>
            </div>

            <div>
              <Link
                to={"/seconnecter"}
                className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                  isActiveNavItem("/seconnecter") ? "line-container-1" : ""
                }`}
              >
                {pages[2]}
              </Link>
            </div>

            <div>
              <Link
                to={"/inscription"}
                className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                  isActiveNavItem("/inscription") ? "line-container-2" : ""
                }`}
              >
                {pages[3]}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
