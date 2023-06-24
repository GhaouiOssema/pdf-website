import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Sidebar from "./SideBar";

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

  const isActiveNavItem = (path) => {
    return location.pathname === `/${path}`;
  };

  return (
    <header className="fixed w-screen">
      <nav className=" px-4 lg:px-6 py-2.5 bg-white dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to={"/"}
                  className={`cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ${
                    isActiveNavItem(pages[2]) ? "text-gray-50" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to={"/seconnecter"}
                  className={`cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ${
                    isActiveNavItem(pages[2]) ? "text-gray-50" : ""
                  }`}
                >
                  {pages[2]}
                </Link>
                <Link
                  to={"/inscription"}
                  className={`cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${
                    isActiveNavItem(pages[3]) ? "bg-primary-800" : ""
                  }`}
                >
                  {pages[3]}
                </Link>
              </>
            ) : (
              <Link
                to={"/"}
                className={`cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${
                  isActiveNavItem(pages[3]) ? "bg-primary-800" : ""
                }`}
                onClick={logout}
              >
                déconnecter
              </Link>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={handleOpenMenu}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            {isAuthenticated ? (
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to={"/profile/:id"}
                    className={`block py-2 pr-4 pl-3 rounded ${
                      isActiveNavItem("profile/:id")
                        ? "text-primary-700"
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    } lg:p-0 dark:text-white`}
                    aria-current="page"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/telecharger"}
                    className={`block py-2 pr-4 pl-3 rounded ${
                      isActiveNavItem("telecharger")
                        ? "text-primary-700"
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    } lg:p-0 dark:text-white`}
                  >
                    Ajouter un plan
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/mesites"}
                    className={`block py-2 pr-4 pl-3 rounded ${
                      isActiveNavItem("mesites/:id")
                        ? "text-primary-700"
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    } lg:p-0 dark:text-white`}
                  >
                    Mes sites
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/support"}
                    className={`block py-2 pr-4 pl-3 rounded ${
                      isActiveNavItem("support")
                        ? "text-primary-700"
                        : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    } lg:p-0 dark:text-white`}
                  >
                    Obtenir de l'aide
                  </Link>
                </li>
              </ul>
            ) : isAuthenticated && openMenu ? (
              <Sidebar isOpen={openMenu} toggleSidebar={handleOpenMenu} />
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Navbar = () => {
  return <ResponsiveAppBar />;
};

export default Navbar;
