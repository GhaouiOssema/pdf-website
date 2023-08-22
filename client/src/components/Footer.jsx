import React from "react";
import LOGO from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="p-4 bg-[#f3f3ff] sm:p-6 dark:bg-gray-800 w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <img src={LOGO} className="mr-3 h-8" alt="FlowBite Logo" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    home
                  </a>
                </li>
                <li>
                  <a className="hover:underline">Tailwind CSS</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a className="hover:underline">Github</a>
                </li>
                <li>
                  <a className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022 . All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm6.525 9.525h-1.79c-.532 0-.81.21-.96.61l-.48.89c-.235.42-.603 1.048-1.41 1.048h-1.12c-.814 0-1.175-.628-1.41-1.048l-.48-.89c-.15-.4-.43-.61-.96-.61H7.476c-.814 0-1.175.628-1.41 1.048l-.48.89c-.235.42-.603 1.048-1.41 1.048H2.475C1.042 9.525 0 10.567 0 11.997v.79c0 .432 1.042 1.475 2.475 1.475h1.79c.532 0 .81-.21.96-.61l.48-.89c.235-.42.603-1.048 1.41-1.048h1.12c.814 0 1.175.628 1.41 1.048l.48.89c.15.4.43.61.96.61h1.79C22.958 13.267 24 12.225 24 10.795v-.79c0-.432-1.042-1.475-2.475-1.475zm-6.525 3.29h-2.055v2.8h-1.735v-2.8H7.476V9.72h2.055V6.92h1.735v2.8H15.19v1.095z"
              />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.997 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 11.997 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm4.97 9.17c-.208-.042-.526-.095-.953-.095-.45 0-.797.12-1.053.367-.256.25-.38.605-.38 1.063v2.305H13.17v6.727H10.75V12.81H7.54V10.47h2.21V9.137c0-2.24 1.253-3.47 3.395-3.47 1.098 0 1.87.08 2.21.15v2.34h-.002z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
