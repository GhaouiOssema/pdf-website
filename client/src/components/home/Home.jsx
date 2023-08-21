import React from "react";
import "./home.css";
import MobileView from "./MobileView";
import DesktopView from "./DescktopView";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <div className="xl:block lg:block md:block hidden xl:w-screen lg:w-screen md:w-screen">
        <DesktopView />
      </div>
      <div className="lg:hidden md:hidden sm:block xs:block">
        <MobileView />
      </div>
    </div>
  );
};

export default Home;
