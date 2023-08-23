import React, { useEffect, useState } from "react";
import MobileView from "./MobileView";
import DesktopView from "./DescktopView";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LOGO from "../../assets/logo2.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const pages = ["connexion", "inscription", "Home"];

  const isActiveNavItem = (navItem) => {
    return location.pathname === navItem;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    <div className="bg-gray-100">
      {isNavbarVisible && (
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
                  className="cursor-pointer text-black text-sm px-4 py-2.5 mr-2 line-container-2"
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
                >
                  {pages[1]}
                </Link>
              </div>
            </div>
          </nav>
        </header>
      )}
      <div className="xl:block lg:block hidden ">
        <DesktopView />
      </div>
      <div className="2xl:hidden xl:hidden lg:hidden block">
        <MobileView />
      </div>

      {isNavbarVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={scrollToTop}
            className="bg-[#F0854A] text-white py-2 px-4 rounded-full shadow-md focus:outline-none focus:bg-[#F0854A] hover:bg-[#F0854A]"
          >
            <KeyboardArrowUpIcon size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
