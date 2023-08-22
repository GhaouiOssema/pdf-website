import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LOGO from "../assets/logo2.png";

const pages = ["connexion", "inscription", "Home"];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const location = useLocation();

  const isActiveNavItem = (navItem) => {
    return location.pathname === navItem;
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
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
    <>
      {isNavbarVisible ? (
        <header className="fixed w-full z-50 transition-all bg-white">
          {/* <div className="hidden"></div> */}
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
              <div className="flex items-center lg:w-[26.2%] md:w-[26.2%] w-full">
                <div>
                  <Link
                    to={"/"}
                    onClick={() => setOpenMenu(false)} // Close the menu after clicking
                    className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                      isActiveNavItem("/") ? "line-container" : ""
                    }`}
                  >
                    {pages[2]}
                  </Link>
                </div>

                <div>
                  <Link
                    to={"/seconnecter"}
                    className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                      isActiveNavItem("/seconnecter") ? "line-container-1" : ""
                    }`}
                  >
                    {pages[0]}
                  </Link>
                </div>

                <div>
                  <Link
                    to={"/inscription"}
                    className={`cursor-pointer text-black font-medium text-sm px-5 py-2.5 mr-2 ${
                      isActiveNavItem("/inscription") ? "line-container-2" : ""
                    }`}
                  >
                    {pages[1]}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
};

export default Navbar;
