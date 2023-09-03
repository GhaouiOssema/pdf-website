import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt1, HiUser, HiViewBoards, HiX } from "react-icons/hi";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LOGO from "../assets/logo2.png";

const SideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarRef,
  toggleSidebar,
}) => {
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/";
  };

  return (
    <div className="">
      <div className="hidden md:flex">
        <div ref={sidebarRef} className="w-[12rem]">
          <div className="fixed w-[12rem] bg-white h-screen space-y-2">
            <div className="bg-top bg-cover space-y-1 pt-4 p-4 left-0">
              <Link to={"/"}>
                <img src={LOGO} alt="" className="w-40" />
              </Link>
            </div>
            <div className="mt-5 bg-top bg-cover space-y-1">
              <Link
                to={"/telecharger"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <AddCircleOutlineIcon />
                  <span className="ml-2">Équipement</span>
                </p>
              </Link>
            </div>
            <div className="mt-5 bg-top bg-cover space-y-1 pl-1">
              <Link
                to={"/messites"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <HiViewBoards />
                  <span className="ml-2">Mes Sites</span>
                </p>
              </Link>
            </div>
            <div className="mt-5 bg-top bg-cover space-y-1 pl-1">
              <Link
                to={"profile"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <HiUser />
                  <span className="ml-2">Mon Profile</span>
                </p>
              </Link>
            </div>
            <div
              className="bg-top bg-cover space-y-1 pl-1 fixed bottom-5 left-0 z-50"
              onClick={logout}
            >
              <Link
                to={"/"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <LogoutIcon />
                  <span className="ml-2">Déconnecter</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden ${
          isSidebarOpen
            ? "fixed top-0 left-0 z-20 w-64 h-screen bg-white"
            : "hidden"
        }`}
      >
        <div ref={sidebarRef} className="w-64 md:hidden">
          <div className="space-y-2">
            <div className="bg-top bg-cover space-y-1 pt-4 p-4 left-0">
              <Link to={"/"}>
                <img src={LOGO} alt="" className="w-full" />
              </Link>
            </div>
            <div className="mt-5 bg-top bg-cover space-y-1">
              <Link
                to={"/telecharger"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <AddCircleOutlineIcon />
                  <span className="ml-2">Équipement</span>
                </p>
              </Link>
            </div>
            <div className="mt-5 bg-top bg-cover space-y-1 pl-1">
              <Link
                to={"/messites"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <HiViewBoards />
                  <span className="ml-2">Mes Sites</span>
                </p>
              </Link>
            </div>
            <div className="mt-5 bg-top bg-cover space-y-1 pl-1">
              <Link
                to={"/profile"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <HiUser />
                  <span className="ml-2">Mon Profile</span>
                </p>
              </Link>
            </div>
            <div
              className="mt-5 bg-top bg-cover space-y-1 pl-1 fixed bottom-20 left-0 z-50"
              onClick={logout}
            >
              <Link
                to={"/"}
                className="text-lg text-gray-700 hover:text-black font-sans font-light hover:font-medium px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
              >
                <p className="flex items-center">
                  <LogoutIcon />
                  <span className="ml-2">Déconnecter</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
