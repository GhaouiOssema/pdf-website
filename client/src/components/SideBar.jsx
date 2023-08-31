import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt1, HiUser, HiViewBoards, HiX } from "react-icons/hi";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LOGO from "../assets/logo2.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
    <div className="relative">
      <div className="bg-white h-full">
        <div className="flex bg-gray-white">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`${
              isSidebarOpen
                ? "fixed top-0 left-0 h-screen w-60 bg-white shadow-lg"
                : "hidden"
            } xl:flex w-60 md:flex-col z-20`}
          >
            <div className="space-y-4">
              <div className="bg-top bg-cover space-y-1 pt-4 p-4 left-0">
                <Link to={"/"}>
                  <img src={LOGO} alt="" className="w-full" />
                </Link>
              </div>
              <div className="mt-5 bg-top bg-cover space-y-1">
                <Link
                  to={"/telecharger"}
                  className="font-medium text-lg text-gray-900 px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                >
                  <p className="uppercase flex items-center">
                    <AddCircleOutlineIcon />
                    <span className="uppercase ml-2">Équipement</span>
                  </p>
                </Link>
              </div>
              <div className="mt-5 bg-top bg-cover space-y-1 pl-1">
                <Link
                  to={"/messites"}
                  className="font-medium text-lg text-gray-900 px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                >
                  <p className="uppercase flex items-center">
                    <HiViewBoards />
                    <span className="uppercase ml-2">Mes Sites</span>
                  </p>
                </Link>
              </div>
              <div className="mt-5 bg-top bg-cover space-y-1 pl-1">
                <Link
                  to={"/profile"}
                  className="font-medium text-lg text-gray-900 px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                >
                  <p className="uppercase flex items-center">
                    <HiUser />
                    <span className="uppercase ml-2">Mon Profile</span>
                  </p>
                </Link>
              </div>
              <div
                className="mt-5 bg-top bg-cover space-y-1 pl-1"
                onClick={logout}
              >
                <Link
                  to={"/"}
                  className="font-medium text-lg text-gray-900 px-4 py-2.5 flex justify-start items-center transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                >
                  <p className="uppercase flex items-center">
                    <LogoutIcon />
                    <span className="uppercase ml-2">Déconnecter</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
