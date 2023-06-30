import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Sidebar from "./SideBar";
import LOGO from "../assets/logo2.png";

const pages = ["telecharger", "mes plans", "connexion", "inscription"];

const ResponsiveAppBar = () => {
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
    <header className="fixed w-screen z-50 bg-white">
      <dic className="hidden"></dic>
      <nav className="px-4 lg:px-6 py-2.5 bg-none dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img src={LOGO} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          </a>
          <div
            className={`flex items-center ${
              isAuthenticated && "justify-between w-[50rem] flex-row-reverse"
            }  `}
          >
            {!isAuthenticated ? (
              <>
                <div>
                  <Link
                    to={"/"}
                    onClick={() => setOpenMenu(false)} // Close the menu after clicking
                    className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                      isActiveNavItem("/") ? "line-container" : ""
                    }`}
                  >
                    Home
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
              </>
            ) : (
              <Link
                to={"/"}
                className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                  isActiveNavItem("") ? "active" : ""
                }`}
                onClick={logout}
              >
                déconnecter
              </Link>
            )}
            {isAuthenticated && (
              <div className="flex items-center justify-around boor w-[30rem]">
                <Link
                  to={"/profile/:id"}
                  className={`block py-2 pr-4 pl-3 rounded ${
                    isActiveNavItem("profile/:id")
                      ? "active"
                      : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  } lg:p-0 dark:text-white`}
                  aria-current="page"
                >
                  Profile
                </Link>
                <Link
                  to={"/telecharger"}
                  className={`block py-2 pr-4 pl-3 rounded ${
                    isActiveNavItem("telecharger")
                      ? "active"
                      : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  } lg:p-0 dark:text-white`}
                >
                  Ajouter un plan
                </Link>
                <Link
                  to={"/mesites"}
                  className={`block py-2 pr-4 pl-3 rounded ${
                    isActiveNavItem("telecharger")
                      ? "active"
                      : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  } lg:p-0 dark:text-white`}
                >
                  Mes sites
                </Link>
              </div>
            )}
            <button
              type="button"
              className="p-1.5 rounded-md text-gray-700 dark:text-gray-400 lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={handleOpenMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <Sidebar open={openMenu} handleOpenMenu={handleOpenMenu} />
    </header>
  );
};

export default ResponsiveAppBar;
