import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg ${
        isOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
      } transform transition duration-300 z-30`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <h2 className="text-xl font-semibold">Sidebar</h2>
        <button
          onClick={toggleSidebar}
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="py-4">
        <ul className="space-y-2">
          <li>
            <Link
              to={"/dashboard"}
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={"/settings"}
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={"/logout"}
              className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
