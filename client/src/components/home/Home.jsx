import React from "react";
import "./home.css";
import MobileView from "./MobileView";
import DesktopView from "./DescktopView";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-gray-100">
      <div className="xl:block lg:block md:block hidden ">
        <DesktopView />
      </div>
      <div className="lg:hidden md:hidden sm:block xs:block">
        <MobileView />
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={scrollToTop}
          className="bg-[#F0854A] text-white py-2 px-4 rounded-full shadow-md focus:outline-none focus:bg-[#F0854A] hover:bg-[#F0854A]"
        >
          <KeyboardArrowUpIcon size={24} />
        </button>
      </div>
    </div>
  );
};

export default Home;
