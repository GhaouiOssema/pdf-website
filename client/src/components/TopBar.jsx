import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/profile/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data.userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-center items-center mx-auto px-4 flex">
              <div className="md:space-x-6 justify-between items-center ml-auto flex space-x-3 w-full">
                <div className="hidden md:block lg:block" />
                <div
                  className="justify-center items-center flex relative lg:hidden md:hidden"
                  onClick={toggleSidebar}
                >
                  {!isSidebarOpen && <HiMenuAlt1 size={24} />}
                </div>
                <Link to={"/profile"}>
                  <div className="justify-center items-center flex relative">
                    <img
                      src={
                        userData?.profileImage
                          ? `data:image/jpeg;base64,${userData.profileImage}`
                          : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                      }
                      className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300"
                      alt=""
                    />
                    <p className="font-semibold text-sm">
                      {userData?.userName}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
