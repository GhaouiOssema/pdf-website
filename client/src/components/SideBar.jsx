import React, { useEffect, useState } from "react";
import { Badge, Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import LOGO from "../assets/logo2.png";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token expiration
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
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

  const logout = async () => {
    localStorage.removeItem("token");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/";
  };

  return (
    <div className="">
      <Sidebar style={{ width: "220px" }} className="h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#">
              <Link to={"/messites"}>
                <img src={LOGO} alt="" />
              </Link>
            </Sidebar.Item>
            <Sidebar.ItemGroup className="uppercase" style={{ marginTop: 50 }}>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                <Link to={"/telecharger"}>
                  <p className="uppercase">equipement +</p>
                </Link>
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                <Link to={"/messites"}>
                  <p className="uppercase">mes Sites</p>
                </Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiUser}>
                <Link to={"/profile"}>
                  <p>Mon Profile</p>
                </Link>
              </Sidebar.Item>
              <Sidebar.Item icon={LogoutIcon} onClick={logout}>
                <Link to={"/"}>
                  <p className="text-sm">déconnecter</p>
                </Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideBar;
